import React from 'react'
import Avatar from "react-avatar"

function Doubt(props) {
    return (
        <div className='flex flex-col p-2 bg-white m-2 rounded'>
            <div className='flex items-center'>
                <Avatar name={props.username} size={25} round="50px" />
                <span className='ml-2'> {props.username} </span>
            </div>
            <span className='text-base mt-1'>{props.doubttext}</span>
        </div>
    )
}

export default Doubt