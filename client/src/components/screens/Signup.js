import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState(undefined)

    var passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validatePassword = passregex.test(password)
    const validateEmail = emailregex.test(email)

    useEffect(() => {
        if(url) {
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'insta-clone')
        data.append('cloud_name', 'panther123')
        fetch('https://api.cloudinary.com/v1_1/panther123/image/upload', {
            method: 'post',
            body: data
        }).then(res => res.json())
        .then(data => {
            setUrl(data.url)
        }).catch(e => {
            console.log(e)
        })
    }

    const uploadFields = () => {
        if(validateEmail && validatePassword) {
            fetch('/signup', {
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    pic:url
                })
            }).then(res=>res.json())
                .then(data => {
                    if(data.error) {
                        M.toast({html: data.error})
                    } else {
                        M.toast({html: data.message})
                        history.push('/login')
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                M.toast({html: 'Enter valid email address or password(password should between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter)'})
            }
    }

    const postData = () => {
        if(image) {
            uploadPic()
        } else {
            uploadFields()
        }
    }
    return (
        <div className='mycard'>
            <div className='card auth-card'>
                <h2 className='brand-logo'>Instagram</h2>
                <input 
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload pic</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className='btn waves-effect waves-light' onClick={() => postData()}>
                    Signup
                </button>
                <h5 className='loginSign'>
                    Already have an account ? <Link to='/login'>Login</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup