import React, { useState } from 'react'

function RangeSelect({onRadiusChange}) {
    const [radius,setRadius]=useState(15000);
  return (
    <div className='mt-5 px-2'>
        <h2 className='font-bold text-sm'>Select Radius (In Meter)</h2>
        <input type='range'
        className='w-full h-2 bg-gray-200
        rounded-lg appearance-none
        cursor-pointer '
        min="500"
        max="30000"
        step="500"
        onChange={(e)=>{setRadius(e.target.value);onRadiusChange(e.target.value)}}
        defaultValue={radius}
        />
        <label className='text-gray-500
        text-[15px]'>{radius} in Meter</label>
    </div>
  )
}

export default RangeSelect