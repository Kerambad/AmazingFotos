import React from 'react'
import { Photo } from '../model/Photo'
import PhotoCard from './PhotoCard'
type PhotoGalleryProps = {
    photos: Photo[]
}

export default function PhotoGallery(props: PhotoGalleryProps) {
    function mapAllPhotos() {
        return (
            props.photos.map((photo) => {
                return (
                    <PhotoCard photo={photo} key={photo.photoId} />
                )
            }))
    }
    return (
        <>
            <div>PhotoGallery</div>
            {mapAllPhotos()}
        </>
    )
}
