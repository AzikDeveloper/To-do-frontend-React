import Button from "./Button"
import { BiLogOut } from "react-icons/bi"
const Header = ({title, onAddClick, showAddTask, onLogOut}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
                color={showAddTask ? 'steelblue' : 'green'}
                text={showAddTask ? 'close' : 'Add'}
                onClick={onAddClick} 
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'Main'
}

export default Header