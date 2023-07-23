
import ReactLoading from 'react-loading';
import { useGlobalContext } from '../context/globalContext';
const Loading = () => {
    const { loading } = useGlobalContext();
    console.log(loading,"sanil");
  return (
      <div className='w-full h-[100vh]  z-10 top-0 left-0'>
          <div className='w-[100px] p-6 absolute top-[50%] left-[50%]'>
              {loading ? <ReactLoading type={"spin"} color={"#4aed88"} height={30} width={50} /> :<></>}
          </div>
      </div>
  )
}

export default Loading