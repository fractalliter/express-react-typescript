import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MobilePhoneScreen from './MobilePhoneScreen';
import Memeno from './Memeno';

ReactDOM.render(
    <React.StrictMode>
        <MobilePhoneScreen>
            <Memeno />
        </MobilePhoneScreen>
    </React.StrictMode>,
    document.getElementById('root')
);
