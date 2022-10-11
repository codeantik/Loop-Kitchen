import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from './contexts/MapContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
// import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MapProvider>
        <BookmarkProvider>
          {/* <CookiesProvider> */}
            <App />
          {/* </CookiesProvider> */}
        </BookmarkProvider>
      </MapProvider>
    </BrowserRouter>
  </React.StrictMode>
);

