import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import usePhotos, { } from './hooks/usePhotos'

function App() {
  const {photos} = usePhotos();
  return (
    <div className="App">
      <PhotoGallery photos={photos} />
    </div>
  );
}

export default App;
