import React, { useState } from 'react';

export const BookmarkContext = React.createContext();

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    console.log('context', bookmarks);

    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
            {children}
        </BookmarkContext.Provider>
    )
}
