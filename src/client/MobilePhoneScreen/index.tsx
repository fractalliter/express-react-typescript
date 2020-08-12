import React, { useLayoutEffect, useState } from 'react';
import './index.css';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

const Index: React.FC = (props) => {
    const SideAttitude = 16 / 9;

    const [windowWidth, windowHeight] = useWindowSize();
    const maxPhoneHeight = windowHeight;
    const maxPhoneWidth = windowHeight / SideAttitude;

    console.log(`width: ${windowWidth}, height: ${windowHeight}`);

    return (
        <div
            className="MobilePhoneScreen"
            style={{ maxHeight: maxPhoneHeight, maxWidth: maxPhoneWidth }}
        >
            {props.children}
        </div>
    );
};

export default Index;
