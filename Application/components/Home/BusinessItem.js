import { UserLocationContext } from '@/context/UserLocationContext';
import Image from 'next/image';
import { calculateDistance } from '@/utils/calculateDist';
import React, { useContext, useEffect, useState } from 'react';
    
function BusinessItem({ business, showDir = false }) {
    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const [distance, setDistance] = useState();

    // Tính khoảng cách 2 vị trí
    useEffect(() => {
        if (userLocation && business.lat && business.lng) {
            const dist = calculateDistance(
                business.lat,
                business.lng,
                userLocation.lat,
                userLocation.lng
            );
            setDistance(dist);
        }
    }, [business.lat, business.lng, userLocation]);

    // Mở cửa sổ chỉ đường của Google Maps
    const onDirectionClick = () => {
        console.log("Clicked")
        console.log(business)
        window.open(business.url);
    };

    // Kiểm tra quán có ảnh không
    const imageUrl = business.image && business.image !== '0' ? business.image : 'placeholder.png';

    return (
        <div className='w-[195px] flex-shrink-0 p-2 rounded-lg shadow-md mb-1 bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer'>
            <Image
                // Link ảnh
                src={imageUrl}
                // Tên
                onClick={onDirectionClick}
                alt={business.title}
                // Kích thước ảnh - giữ nguyên
                width={180}
                height={80}
                className='rounded-lg object-cover h-[90px]'
            />
            {/* Tên quán */}
            <h2 className='text-[13px] font-bold mt-1 line-clamp-1'>{business.title}</h2>
            {/* Địa chỉ quán */}
            <h2 className='text-[10px] text-gray-400 line-clamp-2'>{business.address}</h2>
            <div className='flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <h2 className='text-[10px] font-bold'>{business.totalScore}</h2>
            </div>
            {showDir ? (
                <div className='border-t-[1px] p-1 mt-1'>
                    <h2 className='text-[#0075ff] flex justify-between items-center'>Dist: {dist} km
                        <span className='border-[1px] p-1 rounded-full border-blue-500 hover:text-white hover:bg-blue-500' onClick={onDirectionClick}>Get Direction</span>
                    </h2>
                </div>
            ) : null}
        </div>
    );
}

export default BusinessItem;