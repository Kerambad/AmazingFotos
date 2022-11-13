import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import usePhotos, { } from './hooks/usePhotos'

function App() {
  const {photos, addNewPhoto} = usePhotos();
  return (
    <div className="App">
      <PhotoGallery photos={photos} addNewPhoto={addNewPhoto}/>
    </div>
  );
}

export default App;
