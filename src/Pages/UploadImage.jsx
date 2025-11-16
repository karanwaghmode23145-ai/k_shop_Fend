import { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("https://k-shop-bend.vercel.app/api/upload", formData);
    setUrl(res.data.url);
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={uploadImage}>Upload</button>

      {url && (
        <img src={url} width="200" alt="uploaded" />
      )}
    </div>
  );
}

export default UploadImage;
