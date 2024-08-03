import React, { useState ,useEffect} from 'react';
import Data from '../../Shared/Data';
import Image from 'next/image';

function CategoryList({ onCategoryChange,selectedLabel }) {
    const [categoryList, setCategoryList] = useState(Data.CategoryListData);
    const [selectedCategory, setSelectedCategory] = useState(null); // Khởi tạo với null

    useEffect(() => {
        // Nếu có selectedLabel, tìm và chọn category tương ứng
        if (selectedLabel) {
            const index = categoryList.findIndex(item => item.value === selectedLabel);
            if (index !== -1) {
                setSelectedCategory(index);
                onCategoryChange(categoryList[index].value); // Gọi callback để cập nhật category
            }
        }
    }, [selectedLabel]);

    const handleClick = (index, value) => {
        if (selectedCategory === index) {
            // Nếu mục đã được chọn, bỏ chọn nó
            setSelectedCategory(null);
            onCategoryChange(null); // Hoặc giá trị nào đó bạn muốn gửi khi bỏ chọn
        } else {
            // Nếu mục chưa được chọn, chọn nó
            setSelectedCategory(index);
            onCategoryChange(value);
        }
    };

    return (
        <div>
            <h2 className='font-bold px-2'>
                The Famous Food
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {categoryList.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col
                        justify-center items-center bg-gray-100
                        p-2 m-2 rounded-lg grayscale 
                        hover:grayscale-0 cursor-pointer
                        text-[13px]
                        border-purple-400
                        ${selectedCategory === index
                            ? 'grayscale-0 border-[1px]'
                            : null}`}
                        onClick={() => handleClick(index, item.value)}
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                        />
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
