import axios from 'axios';

class CloudinaryService {
  _url = 'https://api.cloudinary.com/v1_1/dmd6ckoob/upload';

  uploadImg = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'ml_default');
    const res = await axios.post(this._url, fd, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / (total || 0));
        console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
      }
    });

    return res.data;
  };
}

export const clodinaryService = new CloudinaryService();
