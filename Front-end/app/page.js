"use client"
import { useContext, useEffect, useState } from 'react';
import { calculateDistance } from '@/utils/calculateDist';
import BusinessList from '@/components/Home/BusinessList';
import OSMMapView from '@/components/Home/OSMMapView';
import SkeltonLoading from '@/components/SkeltonLoading';
import { UserLocationContext } from '@/context/UserLocationContext';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RangeSelect from '@/components/Home/RangeSelect';
import SelectRating from '@/components/Home/SelectRating';

export default function Home() {
  const { data: session } = useSession();
  const [radius, setRadius] = useState(10000); // Bán kính tìm kiếm
  const [category, setCategory] = useState('Goi cuon');
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [minRating, setMinRating] = useState(0);



  // Push Login....
  useEffect(() => {
    if (!session?.user) {
      router.push('/Login');
    }
  }, [session]);


  // _______ VỊ TRÍ HIỆN TẠI ________
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const roundedLatitude = Math.round(latitude * 10000000) / 10000000;
        const roundedLongitude = Math.round(longitude * 10000000) / 10000000;
        console.log(`Vị trí hiện tại:${roundedLatitude}, ${roundedLongitude}`);
        setUserLocation({ lat: roundedLatitude, lng: roundedLongitude });
      },
      (error) => {
        console.error("Error getting current location", error);
      }
    );
  }, [setUserLocation]);
  // _________________________________


  // ________ LỌC QUÁN ĂN __________

  useEffect(() => {
    fetchData();
  }, [category, radius, minRating, userLocation]);

  const fetchData = () => {
    if (category) {
      setLoading(true);

      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const filteredData = data.locations.filter(location => {
            const distance = calculateDistance(
              location.lat,
              location.lng,
              userLocation.lat,
              userLocation.lng
            );
            return location.label === category && distance <= radius / 1000 && location.totalScore >= minRating;
          });

          setBusinessList(filteredData);
          console.log(businessList)
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading JSON:', error);
          setLoading(false);
        });
    }
  };
  // ________________________________


  return (
    <div className='grid grid-cols-1 md:grid-cols-4 '>
      <div className='p-3'>
        <SelectRating onRatingChange={(value) => setMinRating(value)} />
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
      </div>
      {/* BẢN ĐỒ */}
      <div className='col-span-3'>
        <OSMMapView businessList={businessList} />
        <div className='md:absolute mx-2 w-[90%] md:w-[74%] bottom-36 relative md:bottom-3'>
          {!loading ? <BusinessList businessList={businessList} />
            :
            <div className='flex gap-3'>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <SkeltonLoading key={index} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}