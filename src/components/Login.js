import { useState } from "react"
import axiosInstance from '../components/axios_setup'

const Login = ({goToMain, goToRegister}) => {
    const initialFormData = Object.freeze({
        'username': '',
        'password': ''
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
        axiosInstance.post('api/token/',{
            username: formData.username,
            password: formData.password
        }).then((res)=>{
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 
            'JWT ' + localStorage.getItem('access_token')
            console.log(res.data.access)
            goToMain()

        }).catch((error)=>{
            console.log('on err', error)
        })
    }
    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <br></br>
            <div className='form-control'>
                <label>Username</label>
                <input
                    name='username'
                    required=''
                    type='text' 
                    placeholder='enter username' 
                    onChange={handleChange}
                />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input
                    name='password'
                    required=''
                    type='password' 
                    placeholder='enter password'
                    onChange={handleChange}
                />
            </div>
            
            <input className='btn btn-block' type='submit' value='Log in' />
            <div className='register-redirect'>
                <p className='register-redirect-btn' onClick={goToRegister} >register</p>
            </div>
        </form>
    )
}

export default Login
