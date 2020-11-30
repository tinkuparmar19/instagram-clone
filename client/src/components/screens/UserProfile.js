import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../../App'

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null)
    const { state, dispatch } = useContext(userContext)
    const {userid} = useParams()

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
                        <p>{userProfile.posts.length}</p>
                        <p>1 followers</p>
                        <p>1 following</p>
                    </div>
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