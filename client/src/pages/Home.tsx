import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import Logo from "../image/logo.svg";
import Bg from "../image/cartoon.jpg"
import Bg1 from "../image/cartoon1.svg"

export default function Home() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [room, setRoom] = useState('');
    const joinRoom = () => {
        if (username !== "" && room !== "") {
            setShow(true)
            
            navigate(`/editor/${room}`, {
                state: {
                    username,
                }
            });
        }
    }

    const handleClickNew = () => {
        let no = uuidv4();
        toast.success(` new room is created`)
        setRoom(no);
    }
    return (
        <div className='w-full min-h-screen relative'>
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>

            <div className='flex items-center justify-center mt-2'>
                <img src={Logo} className='w-12 h-12'/>
                <h1 className='text-3xl font-semibold ml-2'>Code-Share</h1>
            </div>
            <div className='absolute top-20 left-4 -z-10'>
                <img src={Bg} width={300} height={300} />
            </div>
            <div className='flex flex-col justify-center items-center' style={{ height: 'calc(100vh - 76px)' }}>
                <div className='flex flex-col justify-between py-10 items-center w-[40%] h-[45%] rounded-lg  mx-auto gap-4  bg-[#1C1C1C]'>
                    <h3 className='text-2xl font-semibold text-center text-white'>Paste Invitation Room Id</h3>
                    <div className='flex flex-col  gap-4'>
                        <input type='text' className=' border outline-none border-[#B67844] min-w-[22em] h-12 rounded-lg pl-2 bg-[#2C303A] text-white' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        <input type='text' className=' border outline-none border-[#B67844] min-w-[22em] h-12 rounded-lg pl-2 bg-[#2C303A] text-white' value={room} placeholder='Room Id' onChange={(e) => setRoom(e.target.value)} />
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <p className='text-white pr-6'>If you don't have any invite create a room  <span onClick={handleClickNew} className='text-pink-500 ml-2 cursor-pointer'>new room</span></p>
                        <button className='py-2 px-4 rounded-md border-none text-white bg-pink-500' onClick={joinRoom}>Join a room</button>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-10 right-4 -z-10'>
                <img src={Bg1} width={350} height={300} />
            </div>
        </div>
    )
}
