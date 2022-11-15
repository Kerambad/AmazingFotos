import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import usePhotos, { } from './hooks/usePhotos'

function App() {
  const {photos, addNewPhoto, removePhotoById} = usePhotos();
  return (
    <div>
      <PhotoGallery photos={photos} addNewPhoto={addNewPhoto} removePhoto={removePhotoById}/>
    </div>
  );
}

export default App;
