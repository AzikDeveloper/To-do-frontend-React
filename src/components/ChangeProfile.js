import { useState } from "react"
import Button from "./Button"

const ChangeProfile = ({ChangeP, goBack}) => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (!username) {
            alert('Please enter username')
            return
        }
        if (!password1) {
            alert('Please enter password1')
            return
        }
        if (!password2) {
            alert('Please enter password2')
            return
        }
        ChangeP({username, password1, password2})
    }
    return (
            <form className='change-profile-form' onSubmit={onSubmit}>
                <div className='change-profile-bar'>
                    <h2>Change Account</h2>
                    <Button text='Back' color='steelBlue' onClick={goBack}/> 
                </div>
                
                <br></br>
                <div className='form-control'>
                    <label>New username</label>
                    <input 
                        type='text' 
                        placeholder='enter username' 
                        value={username} onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Enter new password</label>
                    <input
                        type='password' 
                        placeholder='enter password'
                        value={password1} onChange={(e)=>setPassword1(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Confirm new password</label>
                    <input
                        type='password' 
                        placeholder='confirm password'
                        value={password2} onChange={(e)=>setPassword2(e.target.value)}
                    />
                </div>

                <input className='btn btn-block' type='submit' value='Save' />
            </form>
    )
}

export default ChangeProfile
