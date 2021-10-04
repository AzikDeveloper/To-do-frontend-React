import { BiUserCircle, BiLogOut } from "react-icons/bi"

const Profile = ({userData, onLogOut, onClick}) => {
    return (
        <div className='profile disable-select'>
            <div className='username' onClick={onClick}>
                <BiUserCircle size='30' />
                <p>{userData['username']}</p>
            </div>

            <div className='log-out' onClick={onLogOut}>
                <p>log out</p>
                <BiLogOut size='30' />

            </div>

        </div>
    )
}

export default Profile
