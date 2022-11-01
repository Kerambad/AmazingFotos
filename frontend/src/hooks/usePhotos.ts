import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Photo } from '../model/Photo'

export default function usePhotos() {
  const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetchAllPhotos();
      }, [])
    
      const fetchAllPhotos = () => {
        axios.get("/api/photos")
          .then((response) => response.data)
          .then((data) => setPhotos(data))
          .catch((error) => console.log(error))
      }

      // const addNewVideo = (newPhoto: Photo) => {
      //   axios.post("/api/photos", newPhoto)
      //   .then((response) => response.data)
      //   .then(() => fetchAllPhotos())
      //   .catch((error) => error);
      // }

      //  const removeVideoById = (videoId:string) => { 
      //   axios.delete("/api/photos/" + videoId)
      //   .then(() => fetchAllPhotos())
      //   .catch((error) => console.log(error))
      //   }

      return{photos}
}