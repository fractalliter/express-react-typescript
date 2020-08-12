import React from 'react';
import '../common/button.css';
import './index.css';

interface ILikeButton {
    onClick: () => void;
}

const Index: React.FC<ILikeButton> = (props) => {
    return <button className="like-button" onClick={props.onClick} />;
};

export default Index;
