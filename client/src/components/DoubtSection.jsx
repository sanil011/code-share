import Doubt from './Doubt'
import { useRef } from 'react'
import { css } from '@emotion/css'
import ScrollToBottom from "react-scroll-to-bottom"
const ROOT_CSS = css({
    height: "calc(100vh - 128px)",
    overflowY:"scroll"
});
function DoubtSection({ status, setDoubt, doubt, askDoubt, allDoubts }) {
    const dummy = useRef();
    return (
        <div style={{ height: "calc(100vh - 16px)" }} className='flex flex-col justify-between bg-gray-200  absolute top-4 right-0  z-10 w-[27%]'>
            <div>
                <div className="flex w-full items-center justify-between p-2">
                    <h3 className='text-xl font-semibold '>Doubt Box</h3>
                    <button
                        onClick={() => status(false)}
                        className=" px-3 py-1 bg-white rounded-md text-2xl" >
                        X
                    </button>
                </div>
                <div >
                    <ScrollToBottom className={ROOT_CSS}>

                        {allDoubts.map((db) => {
                            return <Doubt username={db?.name} doubttext={db?.msg} />
                        })}
                    </ScrollToBottom>

                </div>
            </div>
            <form onSubmit={(e) => (askDoubt(e), dummy.current.scrollIntoView())} className="flex items-center p-2  w-full justify-between">
                <input type="text" className='w-[80%] border-black border rounded-md bg-white text-black outline-none p-1' value={doubt} onChange={(e) => setDoubt(e.target.value)} />
                <button type='submit' className='bg-white border-black border py-1 px-2 rounded-md' onClick={(e) => askDoubt(e)}>send</button>
            </form>
        </div>
    )
}

export default DoubtSection