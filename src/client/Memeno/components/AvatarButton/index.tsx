import React from 'react';
import '../common/button.css';
import './index.css';

interface IAvatarButton {
    img: string;
}

const Index: React.FC<IAvatarButton> = (props) => {
    return (
        <button
            className="avatar-button"
            style={{ backgroundImage: `url(${props.img})` }}
        />
    );
};

export default Index;
