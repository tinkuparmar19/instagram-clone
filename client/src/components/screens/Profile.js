import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'

const Profile = () => {
    const [pics, setPics] = useState([])
    const { state, dispatch } = useContext(userContext)
    const [image, setImage] = useState('')

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

    useEffect(() => {
        if(image){
            const data = new FormData()
            data.append('file', image)
            data.append('upload_preset', 'insta-clone')
            data.append('cloud_name', 'panther123')
            fetch('https://api.cloudinary.com/v1_1/panther123/image/upload', {
                method: 'post',
                body: data
            }).then(res => res.json())
            .then(data=>{
        
           
               fetch('/updatepic',{
                   method:"put",
                   headers:{
                       "Content-Type":"application/json",
                       "Authorization":"Bearer "+localStorage.getItem("jwt")
                   },
                   body:JSON.stringify({
                       pic:data.url
                   })
               }).then(res=>res.json())
               .then(result=>{
                   console.log(result)
                   localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                   dispatch({type:"UPDATEPIC",payload:result.pic})
                   //window.location.reload()
               })
           
            })
            .catch(err=>{
                console.log(err)
            })
           }
        },[image])
        const updatePhoto = (file)=>{
            setImage(file)
        }

    return (
        <div className='profile'>
            <div className='profileLand'>
                <div className="profilePic">
                    <img src={state ? state.pic : 'loading'}/>
                </div>
                <div className='userstate'>
                    <h3>{state ? state.name : 'loading'}</h3>
                    <h5>{state ? state.email : 'loading'}</h5>
                    <div className='followState'>
                        <p>{pics.length} posts</p>
                        <p>{state ? state.followers.length : '0'} followers</p>
                        <p>{state ? state.following.length : '0'} following</p>
                    </div>
                </div>
            </div>
            <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #64b5f6 blue darken-1">
                    <span>Update pic</span>
                    <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
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