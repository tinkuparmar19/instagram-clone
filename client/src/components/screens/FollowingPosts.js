import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'
import {Link} from 'react-router-dom'


const FollowingPosts = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(userContext)

    useEffect(() => {
        fetch('/getsubpost', {
            headers: { 
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts)
        })
    }, [])

    const likePost = (id) => {
        fetch('/like',{
            method: 'put', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(e => {
            console.log(e)
        })
    }

    const unlikePost = (id) => {
        fetch('/unlike',{
            method: 'put', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(e => {
            console.log(e)
        })
    }

    const commentOnPost = (text, postId) => {
        fetch('/comment',{
            method: 'put', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(e => {
            console.log(e)
        })
    }

    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('jwt') 
            }
        }).then(res => res.json())
        .then(result => {
            const newData = data.filter(item => {
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <div className='home'>
            {
                    data.map((item) => {
                        return (
                        <div key={item._id} className='homeposts'>
                            <h4><Link to={item.postedBy._id !== state._id ? '/profile/'+item.postedBy._id : '/profile'}>{item.postedBy.name}</Link></h4>
                            {
                                item.postedBy._id === state._id && 
                                <i className='material-icons' 
                                    style={{float: "right"}}
                                    onClick={() => deletePost(item._id)}
                                >
                                    delete
                                </i>
                            }
                            <div className='homeImage'>
                                <img src={item.photo} />
                            </div>
                            <div>
                                { 
                                    item.likes.includes(state._id) ?
                                        <i className="material-icons"
                                            onClick={()=>{unlikePost(item._id)}}
                                        >thumb_down
                                        </i>
                                    : 
                                        <i className="material-icons"
                                            onClick={()=>{likePost(item._id)}}
                                        >thumb_up
                                        </i>
                                }
                                <span className='like-count'>{item.likes.length}</span>
                                <p>{item.title}</p>
                                <p>{item.body}</p>
                                {
                                    item.comments.map((comment) => {
                                        return (
                                            <p key={comment._id}>
                                                <span style={{fontWeight: '500'}}>{comment.postedBy.name} </span>
                                                {comment.text}
                                            </p>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    commentOnPost(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='comment'/>
                                </form>
                            </div>    
                        </div>
                        )
                })
            }
        </div>

    )
}

export default FollowingPosts