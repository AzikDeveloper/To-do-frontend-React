import Button from "./Button"
import { BiTrash } from "react-icons/bi"
const Header = ({onAddClick, showAddTask, setShowTrash, showTrash, deleteTasks}) => {
    return (
        <header className='header disable-select'>
            <h1 className='trash-brand-section'><p>Task Tracker</p>
                <div className='trash-btn' onClick={setShowTrash}>
                    <BiTrash size='35' color={showTrash ? 'green' : 'steelBlue'}/>
                    <label style={{color: (showTrash ? 'green' : 'steelBlue')}}>trash box</label>
                </div>
            </h1>
            {/* <div>
                <h1 className='title'>Task Tracker</h1>
            </div> */}
            {showTrash ? 
                <div className='add-task-btn' onClick={deleteTasks}> 
                    <Button title='add a new task' color='red' text='Remove all'/>
                </div>
                : 
                <div className='add-task-btn'> <Button 
                    color={showAddTask ? 'steelblue' : 'green'}
                    text={showAddTask ? 'close' : 'Add'}
                    onClick={onAddClick} />
                </div>
            }
           
        </header>
    )
}

Header.defaultProps = {
    title: 'Main'
}

export default Header