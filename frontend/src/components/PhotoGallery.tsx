import React, { useEffect, useState } from 'react'
import { Photo } from '../model/Photo'
import PhotoCard from './PhotoCard'
type PhotoGalleryProps = {
    photos: Photo[]
    addNewPhoto: (newPhoto: Photo) => void
}


export default function PhotoGallery(props: PhotoGalleryProps) {
    const [formValue, setFormValue] = useState(new File([], ""))
    const [preview, setPreview] = useState("")
    const [photoIsReady, setPhotoIsReady] = useState(false)

    function mapAllPhotos() {
        return (
            props.photos.map((photo) => {
                return (
                    <PhotoCard photo={photo} key={photo.photoId} />
                )
            }))
    }
    function onChangePhotoInput(action: React.ChangeEvent<HTMLInputElement>) {
        if (action.target.files === null) return
        setFormValue(action.target.files[0])
        convertToImage(action.target.files[0])
    }

    useEffect(() => {
        if (preview.length > 100) {
            setPhotoIsReady(true)
        }
        else {
            setPhotoIsReady(false)
        }
    }, [preview])

    function handlePhotoSubmit(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault()
        if (photoIsReady) {
            props.addNewPhoto({
                name: "test",
                source: preview,
                tags: []
            })
        }
    }
    console.log(photoIsReady);
    
    function convertToImage(photo:File) {
        const reader = new FileReader();
        reader.readAsDataURL(photo)
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
                setPreview(reader.result)
            }
        };
    }
    return (
        <>
            <div>PhotoGallery</div>
            <form onSubmit={handlePhotoSubmit}>
                <input type={"file"} onChange={onChangePhotoInput} />
                <button type='submit'>Submit</button>
            <p>{photoIsReady? "Ready to Upload" : "Not Ready"}</p>
            </form>
            {/* <img src={preview} alt="hallo" /> */}
            {mapAllPhotos()}
        </>
    )
}
