import React, { useEffect } from 'react';
import { MdPhotoCamera, MdClose, MdReplay, MdCloudUpload } from 'react-icons/md';

// Hàm nhận đầu vào để tắt, bật cam, nhập xuất file ảnh
const CameraModal = ({
  cameraOpen, //Bool
  handleCloseCamera, //Bool
  handleCapture,
  webcamRef,
  fileInputRef,
  imageSrc,
  setImageSrc
}) => {
  useEffect(() => {
    let stream;
    if (cameraOpen) {
      const video = document.getElementById("camera");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(newStream => {
          stream = newStream;
          video.srcObject = stream;
          video.play();
        });
      }
    }

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [cameraOpen]);

  const handleCamera = async () => {
    const video = webcamRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageSrc = canvas.toDataURL("image/png");
    setImageSrc(imageSrc);
  };

  return (
    cameraOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Captured" className="w-full h-auto" />
          ) : (
            <video id="camera" ref={webcamRef} className="w-full h-auto"></video>
          )}
          <div>
            <input type="file" accept="image/*" capture="camera" onChange={handleCapture} ref={fileInputRef} style={{ display: 'none' }} />
            <button onClick={() => fileInputRef.current.click()} className="mt-2 bg-yellow-500 text-white p-2 min-w-30 mr-2 rounded-md">
              <MdCloudUpload />
            </button>
            {!imageSrc && (
              <button onClick={handleCamera} className="mt-2 bg-green-500 text-white p-2 min-w-30 mr-2 rounded-md">
                <MdPhotoCamera />
              </button>
            )}
            <button onClick={handleCloseCamera} className="mt-2 bg-red-500 text-white p-2 min-w-30 rounded-md">
              <MdClose />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CameraModal;

