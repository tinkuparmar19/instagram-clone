import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userContext } from '../App'
import Profile from './screens/Profile'

const Navbar = () => {
    const { state, dispatch } = useContext(userContext)
    const history = useHistory()
    const renderList = () => {
        if(state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li><Link to="/followingposts">Following Posts</Link></li>,
                <li>
                    <button className='btn waves-effect waves-light' 
                        onClick={() => {
                            localStorage.clear()
                            dispatch({type: 'CLEAR'})
                            history.push('/login')
                        }}
                    >
                        LogOut
                    </button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={state ? '/' : '/login'} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
            </div>
        </nav>
    )
}

export default Navbar