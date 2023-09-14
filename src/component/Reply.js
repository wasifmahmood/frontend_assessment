import React, { useState } from 'react';
import './reply.css';
//import { COLORS } from '../constants/color';
import send from '../images/send.svg';

const Reply = ({ commentId, setReplyInputs, addReply }) => {
    const [replyText, setReplyText] = useState('');

    const replyTextChange = (e) => {
        const text = e.target.value;
        setReplyText(text);
    };

    const sendReply = () => {
        addReply({ commentId, text: replyText });
        // setReplyText('');
        setReplyInputs((prevInputs) => ({ ...prevInputs, [commentId]: false }));
        // console.log('Reply sent', replyText);

    };

    return (
        <div>
            <div className='addcomment'>
                <div className='d-flex'>
                    <input
                        type='text'
                        value={replyText}
                        onChange={replyTextChange}
                        placeholder='Write your comment'
                    />
                    <button className='btn' style={{ marginLeft: '-40px' }}
                        onClick={sendReply}>
                        <img src={send} alt='Send' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reply;
