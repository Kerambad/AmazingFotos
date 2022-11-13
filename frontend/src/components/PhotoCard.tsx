import React from 'react'
import { Photo } from '../model/Photo'
type PhotoCardProps = {
    photo: Photo
}

export default function PhotoCard(props: PhotoCardProps) {
    function displayAllTags() {
        return (<p>
            {props.photo.tags.map((tag) => {
                return tag + " ";
            })}
        </p>)
    }
    return (
        <>
            {displayAllTags()}
            <div className="card" style={{width: "20em"}}>
                <div className="card-header">
                    <p>Tags: {displayAllTags()}</p>
                </div>
                    <img src={props.photo.source} alt={"Photo: " + props.photo.name} className="card-img-top img-fluid" style={{height:"15em", objectFit: "contain"}}/>

            </div>
        </>
    )
}
