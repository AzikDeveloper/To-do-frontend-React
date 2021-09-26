import { useState } from "react"

const Register = ({Reg, goLogin}) => {
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
        Reg({username, password1, password2})
    }
    return (
            <form className='register-form' onSubmit={onSubmit}>
                <h2>Register</h2>
                <br></br>
                <div className='form-control'>
                    <label>Username</label>
                    <input 
                        type='text' 
                        placeholder='enter username' 
                        value={username} onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Enter password</label>
                    <input
                        type='password' 
                        placeholder='enter password1'
                        value={password1} onChange={(e)=>setPassword1(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Confirm password</label>
                    <input
                        type='password' 
                        placeholder='enter password2'
                        value={password2} onChange={(e)=>setPassword2(e.target.value)}
                    />
                </div>

                <input className='btn btn-block' type='submit' value='Register' />
                <div className='login-redirect' onClick={goLogin}>
                    <p className='login-redirect-btn' >log in</p>
                </div>
            </form>
    )
}

export default Register
