import './styles.css';
import { Input, Button } from 'antd';
import { BsBookmarkCheck, BsFillBookmarkCheckFill, BsTrash } from 'react-icons/bs';
import { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { BookmarkContext } from '../../contexts/BookmarkContext';
import { extraPagesStyles } from '../../App';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/index';

const Home = ({ loggedIn }) => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { maps, setMaps } = useContext(MapContext);
    const { bookmarks, setBookmarks } = useContext(BookmarkContext);
    const [searchedText, setSearchedText] = useState('')
    const [autoCompleteRecords, setAutoCompleteRecords] = useState([]);
    // const [isBookmarked, setIsBookmarked] = useState(false);

    // console.log(maps, maps.map(item => encodeURI(`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${item}"}`)));

    // console.log('maps', maps);
    // console.log('bookmarks', bookmarks);

    // useEffect(() => { updateCookies() }, [setCookie])

    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])

    const fetchAutoCompleteRecords = async () => {
        try {
            const res = await axios(`https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?view=Grid%20view`, {
                headers: {
                    Authorization: 'Bearer keyfXgn8PL6pB3x32',
                }
            })

            setAutoCompleteRecords(res.data.records)
            console.log('auto complete', res);
        } catch(err) {
            toast.error('Couldnt fetch autocomplete records!');
        }
    }

    const handleSearch = (searchTerm) => {
        setSearchedText(searchTerm);
    }

    useEffect(() => {
        fetchAutoCompleteRecords();
    }, [])


    console.log('cookies', cookies);
    
    const updateCookies = () => {
        // removeCookie('maps');
        // removeCookie('bookmarks')
        setCookie('user', { maps, bookmarks }, { path: '/' })
        // setCookie('maps', maps);
        // setCookie('bookmarks', bookmarks);
        console.log('updatedCookies', cookies);
    }

    const convertToUpper = (str) => {
        const ans = str.charAt(0).toUpperCase() + str.slice(1);
        // console.log(ans);
        return ans;
    }

    const handleAdd = () => {
        setMaps((prevMaps) => [...prevMaps, convertToUpper(searchedText.trim())])
        // console.log(encodeURI(`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${convertToUpper(searchedText.trim())}"}`));
        setSearchedText('')
        updateCookies();
        // console.log('cookies', cookies);
    }

    const handleBookmark = (index) => {

        setMaps(prevMaps => prevMaps.filter((_, idx) => idx !== index));

        setBookmarks(prevBookmarks => [...prevBookmarks, maps[index]]);

        updateCookies();
    }

    const handleRemove = (index) => {
        const auxMaps = [...maps].filter((_, idx) => idx !== index);
        const auxBookmarks = [...bookmarks].filter((_, idx) => idx !== index);
        // console.log(aux);
        setBookmarks(auxBookmarks);
        setMaps(auxMaps);
        updateCookies();
    }

    // if(!loggedIn) return <SignIn />

    return (
        <div className='home-container'>
            <div className='search-bar'>
                <input
                    value={searchedText}
                    onChange={(e) => setSearchedText(e.target.value)}
                    placeholder='Search for a restaurant' 
                    />
                <button onClick={handleAdd}>Add</button>
                <div className="dropdown">
                {autoCompleteRecords.filter((item) => {
                    const searchTerm = searchedText.toLowerCase();
                    const recordName = item.fields.Name.toLowerCase();

                        return (
                            searchTerm &&
                            recordName.startsWith(searchTerm) &&
                            recordName !== searchTerm
                        );
                    })
                    // .slice(0, 10)
                    .map((item) => (
                        <div
                            onClick={() => handleSearch(item.fields.Name)}
                            className="dropdown-row"
                            key={item.fields.Name}
                        >
                            {item.fields.Name}
                        </div>
                    ))}
            </div>
            </div>

            {/* autocomple */}

            {/* <div className="dropdown">
                {autoCompleteRecords.filter((item) => {
                    const searchTerm = searchedText.toLowerCase();
                    const recordName = item.fields.Name.toLowerCase();

                        return (
                            searchTerm &&
                            recordName.startsWith(searchTerm) &&
                            recordName !== searchTerm
                        );
                    })
                    // .slice(0, 10)
                    .map((item) => (
                        <div
                            onClick={() => handleSearch(item.fields.Name)}
                            className="dropdown-row"
                            key={item.fields.Name}
                        >
                            {item.fields.Name}
                        </div>
                    ))}
            </div> */}

            <div  style={extraPagesStyles}>{maps.length === 0 && <h1>No Data</h1>}</div>
            <div className="search-results">
                {maps && maps.length > 0 && maps.map((item, i) => (
                    <div className='card-container' key={i}>
                        <div className="card">
                            <h1 style={{ textAlign: "center"}}>{item}</h1>
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={encodeURI(`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${item}"}`)} 
                                frameBorder='0' 
                                style={{ border: '0px'}} 
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        <div className="card-btns">
                            <div title='bookmark' onClick={() => handleBookmark(i)}>
                                <BsBookmarkCheck />
                            </div>
                            <div title='remove' onClick={() => handleRemove(i)}>
                                <BsTrash />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;