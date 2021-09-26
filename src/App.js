import Profile from "./components/Profile";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import ChangeProfile from "./components/ChangeProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react"
import Cookies from 'universal-cookie';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [showChangeProfile, setShowChangeProfile] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [showMain, setShowMain] = useState(false)
  const [tasks, setTasks] = useState([])
  const [userData, setUserData] = useState({username: '--'})
  var cookies = new Cookies()

  useEffect(()=> {
      fetchTasks()
    }, [])


  //SET API TOKEN TO COOKIES
  const setApiToken = (token) => {
    cookies.set('todo-login-token', token, { path: '/' });
  }
  // GET API TOKEN FROM COOKIES
  const getApiToken = () => {
    const token = cookies.get('todo-login-token')
    if (token == null){
      return 'null'
    } else {
      return token
    }
  }
  //DELETE API TOKEN FROM COOKIES
  const deleteApiToken = () => {
    cookies.remove('todo-login-token')
  }

  //REGISTER
  const register = (form) => {
    const url = 'https://azikdev-todo.herokuapp.com/register/'

    const options = {
      method: 'POST',
      headers : {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(form)
    }

    const middleWare = (response) => {
      if (response.ok){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      if (response.status == 'ok'){
        setShowLogin(true)
        setShowRegister(false)
      } else
      if (response.status == 'not ok'){
        console.log('failed: ', response.reason)
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      alert('Http request error!')
      console.log(error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }

  //CHANGE PROFILE
  const changeProfile = (form) => {
    const url = 'https://azikdev-todo.herokuapp.com/change-profile/'

    const options = {
      method: 'POST',
        headers : {
          'Content-type': 'application/json',
          'api-token': getApiToken()
        },
        body: JSON.stringify(form)
    }

    const middleWare = (response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        goBackToMain()
        setUserData({username: response.username})
      } else
      if (response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      alert('failed to change profile')
      console.log('failed: ', error)
    }
    
    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }

  const goBackToMain = ()=> {
    setShowChangeProfile(false)
    setShowProfile(true)
  }

  const onProfileClick = ()=> {
    setShowProfile(false)
    setShowAddTask(false)
    setShowChangeProfile(true)
  }
  
  //LOG IN
  const logIn = (form) => {
    const url = 'https://azikdev-todo.herokuapp.com/login/'

    const options = {
      method: 'POST',
      headers : {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(form)
    }

    const middleWare = (response) => {
      if (response.ok){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok'){
        setApiToken(response.token)
        setShowLogin(false)
        setUserData({username: response.username})
        setShowMain(true)
        fetchTasks()
      } else if(response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }

  //Log out
  const logOut = ()=> {
    const url = 'https://azikdev-todo.herokuapp.com/logout/'

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'api-token': getApiToken()
      }
    }

    const middleWare = (response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        deleteApiToken()
        setShowLogin(true)
        setShowMain(false)
      } else 
      if (response.status == 'not ok') {
        alert(response.reason)
      }
    }
    
    const exceptionHandler = (error) => {
      console.log('failed: ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }

  //Fetch tasks
  const fetchTasks = () => {
    const url = 'https://azikdev-todo.herokuapp.com/tasks-list/'

    const options =  {
      headers: {
        'api-token': getApiToken()
      }
    }

    const middleWare = (response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok'){
        setShowLogin(false)
        setShowMain(true)
        setUserData({username: response.username})
        setTasks(response.data.reverse())
      } else 
      if (response.status == 'not ok') {
        setShowLogin(true)
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed: ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }
  //Add Task
  const addTask = (task) => {
    const url = 'https://azikdev-todo.herokuapp.com/task-create/'

    const options = {
      method: 'POST',
      headers : {
        'Content-type': 'application/json',
        'api-token': getApiToken()
      },
      body: JSON.stringify(task)
    }

    const middleWare = (response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }
    
    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        setTasks([...tasks, response.data])
      } else 
      if (response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed: ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }
  //Edit task
  const updateTask = (task_form) => {
    const url = 'https://azikdev-todo.herokuapp.com/update-task'

    const options = {
      method: 'POST',
      headers : {
        'Content-type': 'application/json',
        'api-token': getApiToken()
      },
      body: JSON.stringify(task_form)
    }

    const middleWare = (response) => {
      if (response.ok){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        setTasks(
          tasks.map(
            (task)=> 
              task.id === response.data.id ? {...task, text: response.data.text, day: response.data.day, reminder: response.data.reminder} : task
        ))
      } else
      if(response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }
  // Delete Task
  const deleteTask = (id) => {
    const url = `https://azikdev-todo.herokuapp.com/task-delete/${id}`
    const options = {
      method: 'DELETE',
      headers : {
        'api-token': getApiToken()
      }
    }

    const middleWare = (response) => {
      if (response.ok){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        setTasks(tasks.filter(
          (task) => task.id !== id
        ))
      } else
      if(response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)    
  }
  //Toggle Reminder
  const toggleReminder = (id) => {
    const url = 'https://azikdev-todo.herokuapp.com/update_reminder/'

    const options =  {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'api-token': getApiToken()
      },
      body: JSON.stringify({task_id: id})
    }

    const middleWare = (response) => {
      if (response.ok){
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    }

    const responseHandler = (response) => {
      console.log(response)
      if (response.status == 'ok') {
        setTasks(
          tasks.map(
            (task)=> 
              task.id === id ? {...task, reminder: response.reminder} : task
        ))
      } else
      if(response.status == 'not ok') {
        alert(response.reason)
      }
    }

    const exceptionHandler = (error) => {
      console.log('failed ', error)
    }

    fetch(url,options).then(middleWare).then(responseHandler).catch(exceptionHandler)
  }
  
  return (
    <div className="container">
      {showChangeProfile ? <ChangeProfile ChangeP={changeProfile} goBack={goBackToMain} /> : ''}
      {showLogin ? <Login  logIn={logIn} Reg={()=>{setShowRegister(!showRegister); setShowLogin(!showLogin) }}/> : ''}
      {showMain ? 
        <div className='main'>
          {showProfile ? <Profile userData={userData} onLogOut={logOut} onClick={onProfileClick}/> : ''}
        
        <Header
          onAddClick={()=>{setShowAddTask(!showAddTask); setShowChangeProfile(false); setShowProfile(true)}} 
          showAddTask={showAddTask}
          onLogOut={logOut}
          title='Task Tracker'
        /> 
        {showAddTask ?  <AddTask onAdd={addTask} /> : ''}
        {/* <SmoothCollapse expanded={showAddTask}>
          <AddTask onAdd={addTask} />
        </SmoothCollapse> */}

        {tasks.length > 0 ? <Tasks tasks={tasks} onUpdate={updateTask} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No tasks to show'}
      </div>
      
      : ''}

    
      {showRegister ? <Register Reg={register} goLogin={()=>{setShowLogin(!showLogin); setShowRegister(!showRegister);}} /> : ''}
  
    </div>
  );
}

export default App;
