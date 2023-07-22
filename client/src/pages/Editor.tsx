import Compiler from '../components/compiler'
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import ThemeDropdown from '../components/ThemeDropdown';
import OutputDetails from '../components/OutputDetails';
import Menu from "../image/menu.svg";
import { defineTheme } from "../lib/defineTheme"
import { DataContext } from '../context/globalContext'
import { Socket } from '../components/socket';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import User from "../components/User";
import Logo from "../image/logo.svg";
import toast from 'react-hot-toast';

export default function Home() {
    const [output, setOutput] = useState<any>("sanil svdcvhdsvchj");
    const [theme, setTheme] = useState<any>("cobalt");
    const [outputDetails, setOutputDetails] = useState<any>();
    const [processing, setProcessing] = useState(false);
    const { code, setCode } = useContext(DataContext);
    const [clients, setClients] = useState<any>([]);
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    const socketRef = useRef<any>();
    let username = location?.state?.username
    const { room = "" } = useParams();


    const classnames = (...args: any) => {
        return args.join(" ");
    };

    type ListenProps = {
        clients: any;
        username: any;
        socketId: any;
    };

    type LeaveProps = {
        socketId: any;
        username: any
    }

    useEffect(() => {
        const init = async () => {
            socketRef.current = await Socket();
            socketRef.current.emit("join_room", { room: room, username: username });
            toast.success(`Successfully entered a room`);

            // Listening for joined event
            socketRef.current.on("new_joined", ({ clients, username, socketId }: ListenProps) => {
                setClients(clients);
                if (username !== location?.state?.username) {
                    toast.success(`${username} joined the room.`)
                }
            })

            // Disconnecting the user listener
            socketRef.current.on("someone_disconnect", ({ socketId, username }: LeaveProps) => {
                toast.success(`${username} left the room.`);
                setClients((prev: any) => {
                    return prev.filter((item: any) => {
                        return item.socketId !== socketId;
                    })
                })
            })
        };

        init();

        return () => {
            socketRef.current.disconnect();
            socketRef.current.off("new_joined");
            socketRef.current.off("leave_room");
        }
    }, [])

    if (!location.state) {
        navigate("/");
    }

    const options = {
        method: 'POST',
        url: `${process.env.REACT_APP_RAPID_API_URL}`,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
                'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`,
        },
        data: {
            language: 'javascript',
            stdin: '',
            files: [
                {
                    name: 'index.js',
                    content: `${code}`
                }
            ]
        }
    };

    const handlefetch = async () => {
        setProcessing(true);
        let option: any = options;
        try {
            const response = await axios.request(option);
            toast.success(`Compiled Successfully`);
            setOutput(response.data.stdout);
            setOutputDetails({ time: response.data?.executionTime, status: response.data?.status })
            setProcessing(false);
        } catch (error) {
            console.error(error);
        }
        // setOutput(code);
    }

    function handleThemeChange(th: any) {
        const theme = th;
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }


    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);


    // Socket
    useEffect(() => {
        sendMessage();
    }, [code])


    const sendMessage = async () => {
        await socketRef.current?.emit("send_message", { room: room, code1: code });
    }

    function leaveRoom() {
        navigate('/');
        toast.success('You leaved the Room');
    }

    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(room);
            toast.success('Room id has been copied to clipboard!')
        } catch (err: any) {
            toast.error(err);
        }
    }


    return (
        <main className=" bg-white min-h-screen">
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>

            <div className='flex space-x-1 h-full'>
                {/* Sidebar */}
                <div style={{ height: "calc(100vh - 16px)" }} className={`${menu ? 'hidden' : 'md:flex hidden '}   w-[15%]    pl-2 pt-4 transition duration-200 bg-gray-200  flex-col justify-between pb-2`}>
                    <div>
                        <div className='flex lg:flex-row flex-col items-center mb-4'>
                            <img src={Logo} className='w-8 h-8' />
                            <h1 className='text-2xl font-semibold ml-2'>Code-Share</h1>
                        </div>
                        <div className='mb-4'>
                            <p className='text-xl font-semibold mb-4'>Admin</p>
                            {clients.length != 0 && <User key={clients[0]?.socketId} username={clients[0]?.username} />}
                        </div>

                        <div>
                            <p className='text-xl font-semibold'>Member</p>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                {
                                    clients.map((item: any, index: any) => ((index !== 0) && <User key={item.socketId} username={item.username} />))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <button
                            onClick={handleCopy}
                            className={
                                "mt-4 min-w-[10em] border-2 border-black z-10 text-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                            }
                        >
                            Copy RoomId
                        </button>
                        <button
                            onClick={leaveRoom}
                            className={
                                "mt-4 min-w-[10em] border-2 border-black z-10 text-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                            }
                        >
                            Leave Room
                        </button>
                    </div>
                </div>

                {/* Main Content */}

                <div className={`${menu ? 'w-[98%]' : 'md:w-[85%] w-[98%] '}`}>
                    {/* Theme dropdown */}
                    <div className='my-2 flex items-center cursor-pointer' >
                        <div className='bg-gray-300 h-8 mr-4' onClick={() => setMenu(!menu)}>
                            <img src={Menu} className='w-8' />
                        </div>
                        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                    </div>


                    {/* Compiler and output */}
                    <div className='flex justify-between mt-auto' style={{height:"calc(100vh - 78px)"}}>
                        <div className='w-[68%] h-full'>
                            <Compiler
                                code={code}
                                language={"javascript"}
                                theme={theme.value}
                                setCode={setCode}
                                socketRef={socketRef}
                            />
                        </div>

                        <div className=' flex  w-[30%] flex-col mr-1 md:mr-4'>
                            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                                Output
                            </h1>
                            <div className="h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
                                <pre className="px-2 py-1 font-normal text-xs text-green-500">
                                    {output}
                                </pre>
                            </div>
                            <button
                                onClick={handlefetch}
                                disabled={!code}
                                className={classnames(
                                    "mt-4 border-2 border-black z-10 text-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                    !code ? "opacity-50" : ""
                                )}
                            >
                                {processing ? "Processing..." : "Compile and Execute"}
                            </button>

                            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
