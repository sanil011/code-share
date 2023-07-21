import React from 'react'
import Avatar from "react-avatar"

type type = {
    key: any;
    username: any;
}
const Client : React.FC<type> = ({ key, username })  => {
    return (
        <div className='flex flex-col'>
            <Avatar name={username} size={"50"} round="50px" />
            <span className='ml-1'> {username} </span>
        </div>
    )
}

export default Client