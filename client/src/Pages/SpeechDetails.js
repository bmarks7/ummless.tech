import React from 'react'
import { useParams } from 'react-router-dom'

export default function SpeechDetails() {
    const {id} = useParams()
    let newId = id.replace(':', '');

    // Props include speechid
    return (
        <div>
            <h1>{newId}</h1>
        </div>
    )
}
