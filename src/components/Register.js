import { useState } from "react"
import axiosInstance from '../components/axios_setup'

const Register = ({goToLogin}) => {

    const initialFormData = Object.freeze({
        'username': '',
        'password1': '',
        'password2': '',
    })

    const [formData, updateFormData] = useState(initialFormData)

    const handleChange = (e)=> {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        console.log('form-data: ', formData)
        axiosInstance.post('register/',{
            username: formData.username,
            password1: formData.password1,
            password2: formData.password2,
        }).then((res)=>{
            console.log('res: ',res)
            console.log('res-data:', res.data)
            if (res.data.status = 'ok'){
                goToLogin()
            }
        })
    }

    return (
            <form className='register-form' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <br></br>
                <div className='form-control'>
                    <label>Username</label>
                    <input
                        name='username'
                        type='text' 
                        placeholder='enter username'
                        onChange={handleChange}
                    />
                </div>

                <div className='form-control'>
                    <label>Enter password</label>
                    <input
                        name='password1'
                        type='password' 
                        placeholder='enter password1'
                        onChange={handleChange}
                    />
                </div>

                <div className='form-control'>
                    <label>Confirm password</label>
                    <input
                        name='password2'
                        type='password' 
                        placeholder='enter password2'
                        onChange={handleChange}
                    />
                </div>

                <input className='btn btn-block' type='submit' value='Register' />
                <div className='login-redirect' onClick={goToLogin}>
                    <p className='login-redirect-btn' onClick={goToLogin} >log in</p>
                </div>
            </form>
    )
}

export default Register
