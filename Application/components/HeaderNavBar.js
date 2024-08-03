import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useRef, useContext } from "react";
import { MdPhotoCamera, MdClose, MdReplay, MdCloudUpload } from 'react-icons/md';
import { UserLocationContext } from '@/context/UserLocationContext';
import SearchBar from './Home/SearchBar';
import CameraModal from './Home/CameraModal';
import { dataURLtoBlob, uploadImage } from './Home/utils';
import { useLabel } from "@/context/LabelContext";

const HeaderNavBar = ({ onSearchResult }) => {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const { userLocation } = useContext(UserLocationContext);

  const [imageSrc, setImageSrc] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const { label, setLabel } = useLabel();
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    if (profileClick) {
      setTimeout(() => {
        setProfileClick(false);
      }, 6000);
    }
  }, [profileClick]);

  const handleCameraClick = () => {
    setCameraOpen(true);
    setImageSrc(null);
  };

  const handleCloseCamera = () => {
    const video = document.getElementById("camera");
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
    setCameraOpen(false);
  };

  // XỬ LÝ ẢNH UPLOAD_______________________________
  const handleCapture = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result;
        console.log(`KDL base64: ${typeof imageDataUrl}`);
        setImageSrc(imageDataUrl);
        const blob = dataURLtoBlob(imageDataUrl);
        await uploadImage(blob);
      };
      reader.readAsDataURL(file);
    }
      setCameraOpen(false);
  };

  // Base64 thành BLOB
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  //-------
  const uploadImage = async (blob) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const formdata = new FormData();
    formdata.append("file", blob, "upload-image.png");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/upload/", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((result) => {
      try {
        const jsonResult = JSON.parse(JSON.parse(result));
        console.log(jsonResult);
        if (jsonResult && jsonResult.data && jsonResult.data.link) {
          console.log(jsonResult.data.link);
          setFileLink(jsonResult.data.link);
          getModelPrediction(jsonResult.data.link);
        } else {
          console.log('Link not found in result');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch((error) => console.error('Fetch error:', error));
  };

  //------Model API
  const getModelPrediction = async (fileLink) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    console.log(fileLink);
    console.log(typeof(fileLink));

    const formdata = new FormData();
    formdata.append("image_url", fileLink);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/classify/url", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((result) => {
      console.log(result);
      try {
        const jsonResult = JSON.parse(result);
        setLabel(jsonResult.class);
        setConfidence(jsonResult.confidence);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch((error) => console.error('Fetch error:', error));
  };

  useEffect(() => {
    if (fileLink) {
      getModelPrediction(fileLink)
    }
  }, [fileLink])

  return session?.user && (
    <div className="flex items-center justify-between p-2 shadow-md">
      <div className="flex gap-7 items-center">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2 className="cursor-pointer hover:text-blue-500">Food Finder</h2>
      </div>
      <div className="flex w-full">
        <SearchBar onSearchResult={onSearchResult} />
        <MdPhotoCamera className="w-10 h-10 cursor-pointer ml-3" onClick={handleCameraClick} />
      </div>
      <CameraModal
        cameraOpen={cameraOpen}
        handleCloseCamera={handleCloseCamera}
        handleCapture={handleCapture}
        webcamRef={webcamRef}
        fileInputRef={fileInputRef}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />
      <div>
        {session?.user ? (
          <>
            <Image
              src={session.user.image}
              alt="user"
              width={40}
              height={40}
              onClick={() => setProfileClick(!profileClick)}
              className="rounded-full cursor-pointer hover:border-2 border-blue-500"
            />
            {profileClick ? (
              <div className="absolute bg-white p-3 shadow-md border mt-2 z-30 right-4">
                <h2 className="cursor-pointer hover:text-blue-500 hover:font-bold" onClick={() => signOut()}>
                  Logout
                </h2>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderNavBar;
