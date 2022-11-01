import React from 'react'
import { Photo } from '../model/Photo'
type PhotoCardProps = {
    photo: Photo
}

export default function PhotoCard(props: PhotoCardProps) {
    function displayAllTags() {
        return(<p>
            {props.photo.tags.map((tag) => {
                return tag + " ";})}
        </p>)
    }
  return (
    <>
        {displayAllTags()}
        <img src={props.photo.source} alt={"Photo: "+ props.photo.name} />
    </>
  )
}
