import React from 'react'
import * as io from "socket.io-client";

export const Socket = async() => {
    return (io.connect('http://localhost:3001'))
}

