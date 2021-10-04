import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})


axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    async function(error){
        const originalRequest = error.config
        if (typeof error.response === 'undefined') {
            alert(' a server/network error occured')
            console.log('err1')
            return Promise.reject(error)
        }
        if(
            error.response.status === 401 && 
            originalRequest.url === baseURL + 'api/token/refresh/'
        ) { 
            console.log('err2')
            return Promise.reject(error)
        }

        if(
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 && 
            error.response.statusText === 'Unauthorized'
        ){
            const refreshToken = localStorage.getItem('refresh_token')
            console.log('refreshToken: ', refreshToken)
            if(refreshToken == undefined){
                const tokenParts = JSON.parse(Buffer.from(refreshToken.split('.')[1],'base64'))

                const now = Math.ceil(Date.now()/1000)
                console.log(tokenParts.exp)

                if(tokenParts.exp > now){
                    return axiosInstance
                    .post('api/token/refresh/', { refresh: refreshToken})
                    .then((response)=>{
                        localStorage.setItem('access_token', response.data.access)
                        localStorage.setItem('refresh_token', response.data.refreshToken)
                        
                        axiosInstance.defaults.headers['Authorization'] = 
                            'JWT ' + response.data.access
                        originalRequest.headers['Authorization'] = 
                            'JWT ' + response.data.access
                        
                        return axiosInstance(originalRequest)
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                } else {
                    console.log('Refresh token is expired ', tokenParts.exp, now)
                    // go to login
                }
            } else {
                console.log('Refresh token not available. ')
                // go to login
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance