import React, { useState } from 'react'
import { Photo } from '../model/Photo'
import PhotoCard from './PhotoCard'
type PhotoGalleryProps = {
    photos: Photo[]
    addNewPhoto: (newPhoto: Photo) => void
}


export default function PhotoGallery(props: PhotoGalleryProps) {
    const [formValue, setFormValue] = useState(new File([], ""))
    const [preview, setPreview] = useState("")

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
        console.log(formValue);

    }
    function handlePhotoSubmit(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault()
        let newPhoto: string = ""
        const reader = new FileReader();
        reader.readAsDataURL(formValue)
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
                newPhoto = reader.result
            }
        };
        props.addNewPhoto({
            name: "test",
            source: newPhoto,
            tags: []
        })
    }
    console.log(preview);

    return (
        <>
            <div>PhotoGallery</div>
            <form onSubmit={handlePhotoSubmit}>
                <input type={"file"} onChange={onChangePhotoInput} />
                <button type='submit'>Submit</button>
            </form>
            <img src={preview} alt="hallo" />
            {/* {mapAllPhotos()} */}
        </>
    )
}
