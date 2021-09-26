import { useState } from "react"

const Login = ({logIn, Reg}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (!username) {
            alert('Please enter username')
            return
        }
        if (!password) {
            alert('Please enter password')
            return
        }
        logIn({username, password})
    }
    return (
        <form className='login-form' onSubmit={onSubmit}>
            <h2>Log in</h2>
            <br></br>
            <div className='form-control'>
                <label>Username</label>
                <input
                    required=''
                    type='text' 
                    placeholder='enter username' 
                    value={username} onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input
                    required=''
                    type='password' 
                    placeholder='enter password'
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            
            <input className='btn btn-block' type='submit' value='Log in' />
            <div className='register-redirect'>
                <p className='register-redirect-btn' onClick={Reg} >register</p>
            </div>
        </form>
    )
}

export default Login
