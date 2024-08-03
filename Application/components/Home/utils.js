export const dataURLtoBlob = (dataurl) => {
  if (!dataurl || typeof dataurl !== 'string') {
    throw new TypeError('Invalid data URL');
  }

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

export const uploadImage = async (blob) => {
  const formData = new FormData();
  formData.append('image', blob);

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      },
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      return data.data.link;
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
