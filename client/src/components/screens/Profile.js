import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'

const Profile = () => {
    const [pics, setPics] = useState([])
    const { state, dispatch } = useContext(userContext)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setPics(result.mypost)
        })
    }, [])
    return (
        <div className='profile'>
            <div className='profileLand'>
                <div className="profilePic">
                    <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'/>
                </div>
                <div>
                    <h3>{state ? state.name : 'loading'}</h3>
                    <h5>email</h5>
                    <div className='followState'>
                        <p>1 pics</p>
                        <p>1 followers</p>
                        <p>1 following</p>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {
                    pics.map(item => {
                        return (
                            <img key={item.title} src={item.photo} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile