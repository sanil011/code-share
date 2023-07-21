"use client";
import React, { useState, useEffect, useMemo, useContext } from 'react'
import Editor from "@monaco-editor/react";



const Compiler = ({  language, code, theme, setCode, socketRef }) => {
  
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  let sa =debounce((value) => setCode(value), 300);

  const handleEditorChange = (value) => {
    sa(value);
  }


  // Socket 
  useEffect(() => {
    if (socketRef.current) {    
      socketRef.current.on("recieve_message", (data) => {
        console.log("message recieved", data)
        setCode(data.code1);
        console.log(socketRef.current)
      });
    }
  }, [socketRef.current])


  return (
    <div className='overflow-y-auto h-full'>
      <Editor
        height="100%"
        width="100%"
        language={language || "javascript"}
        value={code}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default Compiler