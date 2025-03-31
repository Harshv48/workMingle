import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  // data.append("upload_preset", "FiverClone");
  data.append(
    "upload_preset",
    "system_uploader_1e2ddab171f769b9_cae182d3c30962e40d9a1ae5177ac0f600"
  );
  data.append("cloud_name", "dij93sjhp");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dij93sjhp/image/upload",
      data
    );
    // system_uploader_1e2ddab171f769b9_cae182d3c30962e40d9a1ae5177ac0f600
    // const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
    // https://upload-request.cloudinary.com/dij93sjhp/5e6e8cccf2c11a836827dff0f1bbc451
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
