import React, { useContext, useRef } from 'react';
import BusinessItem from './BusinessItem';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';

function BusinessList({ businessList }) {
  const elementRef = useRef(null);
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
      {businessList.map((item, index) => (
        <div key={index} onClick={() => setSelectedBusiness(item)}>
          <BusinessItem business={item} />
        </div>
      ))}
    </div>
  );
}

export default BusinessList;