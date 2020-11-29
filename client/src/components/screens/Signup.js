import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    var passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validatePassword = passregex.test(password)
    const validateEmail = emailregex.test(email)
    const postData = () => {
        if(validateEmail && validatePassword) {
        fetch('/signup', {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
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
    return (
        <div className='mycard'>
            <div className='card auth-card'>
                <h2>Instagram</h2>
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
                <button className='btn waves-effect waves-light' onClick={() => postData()}>
                    Signup
                </button>
                <h5>
                    <Link to='/login'>Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup