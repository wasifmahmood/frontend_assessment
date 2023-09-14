import React from 'react';
import like from '../images/like.svg';
import unlike from '../images/unlike.svg';
import './like.css';


const Like = ({data,setData }) => {

    const toggleLike = () => {
        if (data.isLike) {
            setData({
                ...data,
                like: data.like - 1,
                isLike: false
            });
        } else {
            setData({
                ...data,
                like: data.like + 1,
                isLike: true
            });
        }
    };

    return (
        <div>
            <div className='btn' onClick={toggleLike}>
                {data.isLike ? <img src={like} alt="Like" /> : <img src={unlike} alt="Unlike" />}
            </div>
            <span className='count'>{data.like}</span>
        </div>
    );
};

export default Like;
