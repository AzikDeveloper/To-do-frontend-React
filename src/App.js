import Profile from "./components/Profile";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import ChangeProfile from "./components/ChangeProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import axiosInstance from "./components/axios_setup";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [showChangeProfile, setShowChangeProfile] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [showMain, setShowMain] = useState(false)
  const [showTrash, setShowTrash] = useState(false)
  const [tasks, setTasks] = useState([])
  const [userData, setUserData] = useState({username: '--'})

  useEffect(()=> {
      fetchTasks(showTrash)
    }, [])


  //CHANGE PROFILE
  const changeProfile = (form) => {
    axiosInstance.post('change-profile/', form)
    .then(
      (res)=>{
        if(res.data.ok){
          goBackToMain()
          setUserData({username: res.username})
        } else {
          alert(res.data.detail)
        }
      }
    )
  }

  const goBackToMain = ()=> {
    setShowChangeProfile(false)
    setShowProfile(true)
    setShowMain(true)
    setShowLogin(false)
    fetchTasks(showTrash)
  }

  const onProfileClick = ()=> {
    setShowProfile(false)
    setShowAddTask(false)
    setShowMain(false)
    setShowChangeProfile(true)
  }

  //Log out
  const logOut = ()=> {
    axiosInstance.post('logout/',{
      refresh_token: localStorage.getItem('refresh_token'),
    })
    .then(
      (res)=>{
        if(res.data.ok){
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          axiosInstance.defaults.headers['Authorization'] = null
          setShowLogin(true)
          setShowMain(false)
        } else {
          console.log(res.data.detail)
        }
      }
    )
  }

  //Fetch tasks
  const fetchTasks = (deleted) => {

    axiosInstance.post('tasks-list/',{
      deleted: deleted
    }).then((res)=>{
      console.log(res.data)
      if (res.data.ok){
        setShowLogin(false)
        setShowMain(true)
        setUserData({username: res.data.username})
        setTasks(res.data.data.reverse())
      } else {
        setShowLogin(true)
        setShowMain(false)
      }

    }).catch((error)=>{
        console.log('on err', error)
    })
  }
  // DELETE ALL TASKS
  const deleteTasks = () => {
    axiosInstance.post('delete-tasks/')
    .then(
      (res)=>{
        if(res.data.ok){
          setTasks([])
        } else {
          alert(res.data.detail)
        }
      }
    )
  }
  //Add Task
  const addTask = (task) => {

    axiosInstance.post('task-create/',task)
    .then((res)=>{
      console.log(res.data)
      if (res.data.ok){
        setTasks([...tasks, res.data.data])
      } else {
        alert(res.data.reason)
      }
    })
  }
  //Edit task
  const updateTask = (task_form, info) => {
    axiosInstance.post('update-task/', task_form)
    .then((res)=>{
      if(res.data.ok){
        if (info=='restore' || info=='delete'){
          setTasks(tasks.filter(
            (task)=> task.id !== res.data.data.id
          ))
        } else {
          setTasks(
            tasks.map(
              (task)=>
              task.id === res.data.data.id ? {...task, text: res.data.data.text, day: res.data.data.day, reminder: res.data.data.reminder } : task
            )
          )
        }
      } else {
        console.log(res.data.detail)
      }
    })
  }
  // Delete Task
  const deleteTask = (id) => {
    axiosInstance.post('task-delete/',{
      id: id
    })
    .then(
      (res)=>{
        if(res.data.ok){
          console.log(res.data)
          setTasks(tasks.filter(
            (task) => task.id !== id
          ))
        } else {
          alert(res.data.detail)
        }
      }
    )
  }
  //Toggle Reminder
  const toggleReminder = (id) => {
    axiosInstance.post('update_reminder/',{
      id: id
    })
    .then(
      (res)=>{
        if(res.data.ok){
          setTasks(
            tasks.map(
              (task)=> 
                task.id === id ? {...task, reminder: res.data.reminder} : task
          ))
        } else {
          alert(res.data.detail)
        }
      }
    )
  }
  
  return (
    <div className="container">
      {showChangeProfile ? <ChangeProfile ChangeP={changeProfile} goBack={goBackToMain} /> : ''}
      {showLogin ? <Login goToMain={goBackToMain} goToRegister={()=>{setShowLogin(false); setShowRegister(true);}} /> : ''}
      {showMain ? 
        <div className='main'>
          {showProfile ? <Profile userData={userData} onLogOut={logOut} onClick={onProfileClick}/> : ''}
        
        <Header
          deleteTasks={deleteTasks}
          onAddClick={()=>{setShowAddTask(!showAddTask); setShowChangeProfile(false); setShowProfile(true)}} 
          showAddTask={showAddTask}
          setShowTrash={()=>{setShowTrash(!showTrash); fetchTasks(!showTrash); setShowChangeProfile(false); setShowAddTask(false); setShowProfile(true)}}
          showTrash={showTrash}
          onLogOut={logOut}
        /> 
        {showAddTask ?  <AddTask onAdd={addTask} /> : ''}

        {showTrash ? <p>Trashbox:</p> : ''}
        {tasks.length > 0 ? <Tasks deleted={showTrash} tasks={tasks} onUpdate={updateTask} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No tasks to show'}
      </div>
      
      : ''}

    
      {showRegister ? <Register goToLogin={()=>{setShowLogin(true); setShowRegister(false);}} /> : ''}
  
    </div>
  );
}

export default App;
