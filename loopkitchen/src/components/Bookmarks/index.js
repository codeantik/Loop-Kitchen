import './styles.css';
import { useContext, useEffect } from 'react';
import { Input, Button } from 'antd';
import { BsBookmarkCheck, BsTrash } from 'react-icons/bs';
import { BookmarkContext } from '../../contexts/BookmarkContext';
import { extraPagesStyles } from '../../App';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/index';


const Home = ({ loggedIn }) => {

    const { bookmarks } = useContext(BookmarkContext);
    const navigate = useNavigate();

    console.log(bookmarks);
    console.log(encodeURI(`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":${bookmarks[0]}}`))

    useEffect(() => {
        if(!loggedIn) navigate('/login');
    }, [loggedIn])


    // if(!loggedIn) return <SignIn />

    return (
        <div className='home-container'>
            {/* <h1>Bookmarks</h1> */}
            <div style={{...extraPagesStyles}}>{bookmarks.length === 0 && <h1 >No Bookmarks</h1>}</div>
            <div className="search-results">
                {bookmarks && bookmarks.length > 0 && bookmarks.map((query, i) => (
                    <div className='card-container' key={i}>
                        <div className="card">
                            <h1 style={{ textAlign: "center"}}>{query}</h1>
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={encodeURI(`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${query}"}`)} 
                                frameBorder='0' 
                                style={{ border: '0px'}} 
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        {/* <div className="card-btns">
                            <div title='bookmark'><BsBookmarkCheck /></div>
                            <div title='remove'><BsTrash /></div>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;