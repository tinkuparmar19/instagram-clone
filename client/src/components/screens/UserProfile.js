import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../../App'

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null)
    const { state, dispatch } = useContext(userContext)
    const {userid} = useParams()
    const [showfollow, setshowfollow] = useState(state ? !state.following.includes(userid) : true)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setUserProfile(result)
        })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('jwt')
            },
            body: JSON.stringify({followId: userid})
        })
        .then(res => res.json())
        .then(data => {
            dispatch({ 
                type: 'UPDATE',
                payload: {following: data.following, followers: data.followers}
            })
            localStorage.setItem('user', JSON.stringify(data))
            setUserProfile(prevState => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, data._id]
                    }
                }
            })
            setshowfollow(false)
        })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('jwt')
            },
            body: JSON.stringify({followId: userid})
        })
        .then(res => res.json())
        .then(data => {
            dispatch({ 
                type: 'UPDATE',
                payload: {following: data.following, followers: data.followers}
            })
            localStorage.setItem('user', JSON.stringify(data))
            setUserProfile(prevState => {
                const newfollower = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: newfollower
                    }
                }
            })
            setshowfollow(true)
        })
    }
    return (
        <>
        {userProfile ?
        <div className='profile'>
            <div className='profileLand'>
                <div className="profilePic">
                    <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'/>
                </div>
                <div>
                    <h3>{userProfile.user.name}</h3>
                    <h5>{userProfile.user.email}</h5>
                    <div className='followState'>
                        <p>{userProfile.posts.length} posts</p>
                        <p>{userProfile.user.followers.length} followers</p>
                        <p>{userProfile.user.following.length} following</p>
                    </div>
                    {showfollow?
                        <button style={{
                            margin:"10px"
                        }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={()=>followUser()}
                        >
                            Follow
                        </button>
                        : 
                        <button
                        style={{
                            margin:"10px"
                        }}
                        className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={()=>unfollowUser()}
                        >
                            UnFollow
                        </button>
                    }
                </div>
            </div>
            <div className='gallery'>
                {
                    userProfile.posts.map(item => {
                        return (
                            <img key={item._id} src={item.photo} />
                        )
                    })
                }
            </div>
        </div>
        : <h3>loading...</h3>
            }
        </>
    )
}

export default UserProfile