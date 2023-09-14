import React, { useState } from 'react'
import './comment.css';
import Like from './like';
import Reply from './Reply';
import { COLORS } from '../contants/color'
import user1 from '../images/user1.png'
import user2 from '../images/user2.png'
import user3 from '../images/user3.png'
import user4 from '../images/user4.png'
import send from '../images/send.svg'



const Comment = (commentId) => {
    const [commentList, setCommentList] = useState([{
        id: 1,
        user_id: 1,
        img: user1,
        name: 'Maria',
        comment: 'I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?',
        like: 1,
        isLike: true,
    }, {
        id: 2,
        img: user2,
        user_id: 2,
        name: 'Alex Benjamin',
        comment: 'Home sweet home! I\'m glad you are back. It\'s been two year and miss the football matches we have together. A lot has been changed since you left. Let\'s meet at the ground tomorrow evening?',
        like: 0,
        isLike: false,
    }, {
        id: 3,
        img: user3,
        user_id: 3,
        name: 'Tania',
        comment: 'Hey bud, welcome back to home. It\'s so long to see you back again. Would love to hear the travelling stories of yours. Your or my place?',
        like: 0,
        isLike: false,
    },]);

    const [myData, setMyData] = useState({
        id: 100,
        img: user4,
        name: 'John Doe',
    })


    const [replyInputs, setReplyInputs] = useState({});
    const [newCommentText, setNewCommentText] = useState('');

    const toggleReplyInput = (commentId) => {
        setReplyInputs((prevInputs) => ({
            ...prevInputs,
            [commentId]: !prevInputs[commentId],
        }));
    };

    // Function to add a reply to a comment
    const addReply = ({ commentId, text }) => {
        // Find the comment in the list based on its ID
        const updatedCommentList = commentList.map((comment) => {
            if (comment.id === commentId) {
                // Add the reply to the comment's replies array
                return {
                    ...comment,
                    replies: [...(comment.replies || []), 
                    { text, name: myData.name, img: myData.img, user_id: myData.user_id, like: 0, isLike: false }],
                };
            }
            return comment;
        });

        // Update the commentList state with the new reply
        setCommentList(updatedCommentList);
        // Close the reply input after adding the reply
        toggleReplyInput(commentId);
    };

    const removeReply = (commentId, replyIndex) => {
        const updatedCommentList = commentList.map((comment) => {
            if (comment.id === commentId && comment.replies) {
                // Remove the reply at the specified index
                comment.replies.splice(replyIndex, 1);
            }
            return comment;
        });
        // Update the commentList state with the updated comment
        setCommentList(updatedCommentList);
    };
    // const [replyText, setReplyText] = useState('');
    // const replyTextChange = (e) => {
    //     const text = e.target.value;
    //     setReplyText(text);
    // };

    const addNewComment = () => {
        if (newCommentText.trim() === '') {
            return;
        }
        const newComment = {
            id: commentList.length + 1,
            img: myData.img,
            name: myData.name,
            user_id: myData.user_id,
            comment: newCommentText,
            like: 0,
            isLike: false,
        };

        setCommentList([...commentList, newComment]);
        setNewCommentText('');
    };


    return (
        <div className='comment'>
            <div className='heading'>Comments</div>
            {commentList.map((comment) => (
                <div className='user'
                    style={{ backgroundColor: COLORS.BadgeBackground }}
                    key={comment.id}
                >
                    <div className='d-flex'>
                        <div className='userimage'>
                            <img src={comment.img} alt={comment.name} />
                        </div>
                        <div className='username'>
                            <text id='textName'>{comment.name}</text>
                            <text>{comment.comment}</text>
                        </div>
                    </div>
                    <div className='userlike'>
                        <button className='btn'>
                            <Like
                                data={comment}
                                setData={(data) => {
                                    const index = commentList.findIndex((item) => item.id === data.id);
                                    commentList[index] = data;
                                    setCommentList([...commentList]);
                                }}
                            />
                        </button>
                        <svg
                            width='20'
                            height='20'
                            fill='currentColor'
                            className='bi bi-dot'
                            viewBox='0 0 16 16'
                        >
                            <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' />
                        </svg>
                        {
                            comment.user_id === myData.user_id ?
                                <button
                                    className='btn'
                                    style={{ color: COLORS.Red }}
                                    onClick={() => {
                                        const updatedCommentList = commentList.filter((item) => item.id !== comment.id);
                                        setCommentList(updatedCommentList);
                                    }}
                                >
                                    Remove
                                </button>
                                :
                                <button
                                    className='btn'
                                    style={{ color: COLORS.Blue }}
                                    onClick={() => toggleReplyInput(comment.id)}
                                >
                                    Reply
                                </button>
                        }

                    </div>
                    {replyInputs[comment.id] && (
                        <Reply
                            commentId={comment.id}
                            setReplyInputs={setReplyInputs}
                            addReply={addReply}
                        />
                    )}
                    {/* Display replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className='replies'>
                            {comment.replies.map((reply, index) => (
                                <div key={index} className='reply'>
                                    <div className='d-flex'>
                                        <div className='userimg'>
                                            <img src={reply.img} alt={reply.name} />
                                        </div>
                                        <div className='reply'>
                                            <text id='textreply'>{reply.name}</text>
                                            <text>{reply.text}</text>
                                        </div>
                                    </div>
                                    <div className='replylike'>
                                        <button className='btn'>
                                            <Like
                                                data={reply}
                                                setData={(data) => {
                                                    const tempIndex = commentList.findIndex((item) => item.id === comment.id);
                                                    console.log("Data :: ", data, tempIndex);
                                                    commentList[tempIndex].replies[index] = data;
                                                    setCommentList([...commentList]);
                                                }}
                                            />
                                        </button>
                                        <svg
                                            width='20'
                                            height='20'
                                            fill='currentColor'
                                            className='bi bi-dot'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' />
                                        </svg>
                                        <button
                                            className='btn'
                                            style={{ color: COLORS.Red }}
                                            onClick={() => removeReply(comment.id, index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <div className='addcomment' style={{ backgroundColor: COLORS.BadgeBackground }}>
                <div className=' d-flex'>
                    <input
                        type='text'
                        placeholder='write your comment'
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <button className='btn' style={{ marginLeft: '-40px' }}
                        onClick={addNewComment}
                    >
                        <img src={send} alt='Send' />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Comment