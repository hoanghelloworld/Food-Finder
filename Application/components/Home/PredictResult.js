import React, { useEffect, useState } from 'react';

const PredictResult = ({ label, confidence }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (label && confidence) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
  }, [label, confidence]);

  return (
    <>
      {visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50 text-center">
          <p className="text-lg font-semibold">Món ăn bạn đang tìm là: {label}</p>
          <p className="text-lg">Độ tự tin: {confidence.toFixed(2)}</p>
        </div>
      )}
    </>
  );
};

export default PredictResult;
