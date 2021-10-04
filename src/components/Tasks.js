import Task from "./Task"
const Tasks = ({tasks, onDelete, onToggle, onUpdate, deleted, fetchTasks}) => {
    return (
        <>
            {tasks.map(
                (task, index) => (
                    <Task key={index} deleted={deleted} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle} text_color='green' day_color='steelblue' task={task} />
                )
            )}
        </>
    )
}

export default Tasks
