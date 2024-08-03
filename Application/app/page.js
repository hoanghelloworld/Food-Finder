
"use client"
import { useContext, useEffect, useState } from 'react';
import { calculateDistance } from '@/utils/calculateDist';
import OSMMapView from '@/components/Home/OSMMapView';
import SkeltonLoading from '@/components/SkeltonLoading';
import { UserLocationContext } from '@/context/UserLocationContext';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RangeSelect from '@/components/Home/RangeSelect';
import SelectRating from '@/components/Home/SelectRating';
import CategoryList from '@/components/Home/CategoryList'; // TODO: Import the CategoryList component
import BusinessList from '@/components/Home/BusinessList';
import HeaderNavBar from '@/components/HeaderNavBar';
import { useLabel } from '@/context/LabelContext';

export default function Home() {
  const { data: session } = useSession();
  const [radius, setRadius] = useState(10000); // Bán kính tìm kiếm
  const { label, setLabel } = useLabel();
  const [category, setCategory] = useState('Goi cuon');
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [minRating, setMinRating] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState('');


  // Push Login....
  useEffect(() => {
    if (!session?.user) {
      router.push('/Login');
    }
  }, [session]);

  useEffect(() => {
    if (label) {
      setCategory(label);
    }
  }, [label]);


  // _______ VỊ TRÍ HIỆN TẠI ________
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const roundedLatitude = Math.round(latitude * 10000000) / 10000000;
        const roundedLongitude = Math.round(longitude * 10000000) / 10000000;
        console.log(`Vị trí hiện tại:${roundedLatitude}, ${roundedLongitude}`);
        setUserLocation({ lat: 21.0381127, lng: 105.7827074 });
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
  const handleSearchResult = (label) => {
    setSelectedLabel(label);
    setCategory(label); // Thay đổi category dựa trên kết quả tìm kiếm
  };

  return (
  <div>
  <HeaderNavBar onSearchResult={handleSearchResult} />
    <div className='grid grid-cols-1 md:grid-cols-11 h-screen'>
      <div className='p-3 col-span-1 md:col-span-1 w-full bg-gray-100'>
        <div className='flex flex-col space-y-4 mt-5'>
          <SelectRating onRatingChange={(value) => setMinRating(value)} />
          <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-4 overflow-y-scroll h-full'>
        {!loading ? <BusinessList
        businessList={businessList}
        /> : (
          <div className='flex flex-col gap-3'>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <SkeltonLoading key={index} />
            ))}
          </div>
        )}
      </div>
      <div className='col-span-1 md:col-span-6'>
        <OSMMapView businessList={businessList} />
      </div>
    </div>
  </div>
  );
}