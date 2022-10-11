import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './components/SignIn/index';
import { Layout, Image } from 'antd';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Bookmarks from './components/Bookmarks';
import SideMenu from './components/SideMenu';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from './contexts/MapContext';
import { BookmarkContext } from './contexts/BookmarkContext';
import { useCookies } from 'react-cookie';
import { BiUserCircle } from  'react-icons/bi'

const { Sider, Content, Footer } = Layout;

export const extraPagesStyles = { 
  fontSize: '40px',
  fontWeight: '400',
  height: '100%', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
}

const App = () => {

  const user = localStorage.getItem('loggedIn');
  const [cookies] = useCookies(['user'])
  const { setMaps } = useContext(MapContext);
  const { setBookmarks } = useContext(BookmarkContext);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    if(cookies.user) {
      setMaps(cookies.user.maps);
      setBookmarks(cookies.user.bookmarks);
      setLoggedIn(localStorage.getItem('loggedIn'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(null)
    // window.location.reload();
  }


  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Routes> */}
        {/* <Route path='/login' element={<Signin setLoggedIn={setLoggedIn}/>} /> */}
        <Layout>
          <Sider style={{ height: '100vh', backgroundColor: 'white'}}>
            <Image src='./loopKitchen.jpg' preview={false} />
            <SideMenu />
          </Sider>
          <nav>
            <button onClick={handleLogout} className='logout-btn' title='Log out'>
              {loggedIn && <BiUserCircle />}
            </button>
          </nav>
          <Layout>
            <Content>
                <Routes>
                  <Route exact path='/' element={<Home loggedIn={loggedIn}/>}/>
                  <Route path='/login' element={<Signin setLoggedIn={setLoggedIn}/>} />
                  <Route path='/bookmarks' element={<Bookmarks loggedIn={loggedIn}/>} />
                  <Route path='/details' element={<div style={extraPagesStyles}>This is the details page</div>} />
                  <Route path='/analytics' element={<div style={extraPagesStyles}>This is the analytics page</div>} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: 'center', height: '10vh', fontWeight: '500'}}>
              Loop Kitchen Dashboard &#169; 2022
            </Footer>
          </Layout>
        </Layout>
      {/* </Routes> */}
      
    </div>
  );
}

export default App;
