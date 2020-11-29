import React, { useEffect, createContext, useContext, useReducer} from 'react'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducers/userReducer'


export const userContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(userContext)
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({type: 'USER', payload: user})
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/create'>
        <CreatePost />
      </Route>
    </>
  )
}

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value = {{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
