import { useEffect } from 'react'
import { FaTimes, FaTrashRestoreAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { useState } from 'react'

const Task = ({task, text_color, day_color, onDelete, onToggle, onUpdate, deleted}) => {
    const [editTaskClicked, setEditTaskClicked] = useState(false)
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [formattedDay, setFormattedDay] = useState('')

    useEffect(()=> {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = task.day.split('T')[0]
        const time = task.day.split('T')[1]
        const d = date.split('-')[2]
        const m = date.split('-')[1]
        const y = date.split('-')[0]

        const h = time.split(':')[0]
        const i = time.split(':')[1]

        setFormattedDay(`${d}-${monthNames[parseInt(m)-1]} ${y}, ${h}:${i}`)
    }, [task.day])
    const editTask = () => {
        setEditTaskClicked(!editTaskClicked)
        setText(task.text)
        setDay(task.day)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please enter title')
            return
        }
        if (!day) {
            alert('Please enter day')
            return
        }
        onUpdate({id: task.id, text, day})
        setEditTaskClicked(!editTaskClicked)
        setText('')
        setDay('')
    }

    const viewTask =  
        <div className='view-task'>
            <h3 style={{color: text_color}} className='disable-select'>
                {task.text}
                <div className='edit-delete'>
                    {deleted ? 
                        <FaTrashRestoreAlt onClick={()=>onUpdate({id: task.id, text: task.text, day: task.day, deleted:false}, 'restore')} style={{marginRight: 15}} color='steelBlue' /> : 
                        <MdEdit style={{marginRight: 15}} onClick={editTask} />
                    }
                    <FaTimes color='red' onClick={deleted ? ()=>onDelete(task.id) : ()=>onUpdate({id: task.id, text: task.text, day: task.day, deleted:true}, 'delete')} />
                </div>
            </h3>
            <p className='disable-select' style={{color: day_color}}>{formattedDay}</p>
        </div>
    const changeTask =  
        <form className='change-task-form' onSubmit={onSubmit}>
            <div className='change-task'>
                <h3 style={{color: text_color}} className='task-row-1'>
                    <input className='edit-task-title' type='text' value={text} onChange={(e)=>setText(e.target.value)}/>
                    <div className='edit-delete-save'>
                        <MdEdit style={{marginRight: 15}} onClick={editTask} />
                        <FaTimes color='red' onClick={()=>{onDelete(task.id); setEditTaskClicked(false) }} />
                    </div>
                </h3>
                <input
                    className='edit-task-date'
                    type="datetime-local" 
                    name="deadline" 
                    value={day}
                    onChange={(e)=>setDay(e.target.value)}
                    required=""
                />
                <button className='save-btn' name='save' type='submit'>save</button>

            </div>
        </form>
    return (
        task.deleted ?  
            <div className='task deleted-task-reminder'>
                {editTaskClicked ? changeTask : viewTask}
            </div> 
                : 
            <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={deleted ? ()=>{} : ()=>onToggle(task.id)} >
                {editTaskClicked ? changeTask : viewTask}
            </div>
    )
}

export default Task
