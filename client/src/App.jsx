import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
function App() {
  return (
    <>
      <div >
        <Toaster position='top-center' toastOptions={{
          success: {
            theme : {
              primary: '#4aed88',
            }
          }
        }} ></Toaster>
      </div>
        {/* <Loading/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:room' element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
