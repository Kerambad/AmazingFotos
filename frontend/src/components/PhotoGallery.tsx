import React, { useState } from 'react'
import { Photo } from '../model/Photo'
import PhotoCard from './PhotoCard'
import "./PhotoGallery.css"

type PhotoGalleryProps = {
    photos: Photo[]
    addNewPhoto: (newPhoto: Photo) => void
    removePhoto: (photoId: string) => void
}


export default function PhotoGallery(props: PhotoGalleryProps) {
    const [tagFormValue, setTagFormValue] = useState("")
    const [preview, setPreview] = useState("")
    const [allTags, setAllTags] = useState<string[]>([])
    const [inputFile, setInputFile] = useState("")

    function mapAllPhotos() {
        return (
            props.photos.map((photo) => {
                return (
                    <PhotoCard photo={photo} key={photo.photoId} removePhoto={props.removePhoto} />
                )
            }))
    }
    function onChangePhotoInput(action: React.ChangeEvent<HTMLInputElement>) {
        if (action.target.files === null) return
        setInputFile(action.target.value)
        convertToImage(action.target.files[0])
        console.log(action);

    }

    function handlePhotoSubmit(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault()
        if (checkIsPhotoValid()) {
            props.addNewPhoto({
                name: "test",
                source: preview,
                tags: allTags
            })
        }
        setInputFile("")
        deleteAllTags()
    }

    function checkIsPhotoValid() {
        if (preview.length > 100) {
            return true
        }
        else {
            console.error("Please select valid Photo")
            return false
        }
    }

    function convertToImage(photo: File) {
        const reader = new FileReader();
        reader.readAsDataURL(photo)
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
                setPreview(reader.result)
            }
        };
    }
    function handleTagFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setAllTags((old) => old.concat([tagFormValue]))
        setTagFormValue("")
    }

    function onChangeTagInput(event: React.ChangeEvent<HTMLInputElement>) {
        setTagFormValue(event.target.value)
    }
    function mapAllTags() {
        return (
            allTags.map((tag) => {
                return (
                    <p className='tag'>{tag}</p>
                )
            }
            )
        )
    }
    function deleteAllTags() {
        setAllTags([])
    }


    return (
        <>
            <span className='all-forms'>
                <form className="form-tile" onSubmit={handlePhotoSubmit}>
                    <input
                        className="form-control input-field"
                        type="file"
                        id="formFile"
                        onChange={onChangePhotoInput}
                        value={inputFile}
                    />
                    <button type='submit' className='btn btn-primary submit-button'>Add to Gallery</button>
                </form>
                <form className='form-tile' onSubmit={handleTagFormSubmit}>
                    <input
                        type="text"
                        placeholder='Add Tag'
                        className='form-control input-field'
                        value={tagFormValue}
                        onChange={onChangeTagInput}
                    />
                    <button className='btn btn-outline-light submit-button' type='submit'>Add Tag</button>
                </form>
                <span className='tag-tile'>
                    <span className='tags'>
                        <p className='desc'>Added Tags:</p> {mapAllTags()}
                    </span>
                    <p className='option-button'>
                        <button type="button" className="btn btn-outline-light" onClick={deleteAllTags}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                            </svg>
                        </button>
                    </p>
                </span>
            </span>
            <span className='gallery'>
                {mapAllPhotos()}
            </span>
        </>
    )
}
