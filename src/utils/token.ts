import axios from "axios";
export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
})

export function saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken)
    localStorage.setItem('refresh', refreshToken)
}


axiosRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
}

axiosRequest.interceptors.response.use(
    (response) => response,

    async (error) => {
       const original = error.config

       if(original?.url?.startsWith('/auth/')) {
        return Promise.reject(error)
       }

       if (error.response?.status === 401 && original && !original._retry) {
        const refreshToken = localStorage.getItem('refresh')

        if (!refreshToken) {
            removeToken()
            window.location.href = '/login'
            return Promise.reject(error)
        }
        original._retry = true
        try {
            const {data} = await axios.post(
                `${import.meta.env.VITE_API}/auth/refresh`,
                {refreshToken}
            )

            saveTokens(data.accessToken, data.refreshToken)

            original.headers.Authorization = `Bearer ${data.accessToken}`
            
            return axiosRequest(original)
        } catch (refreshError) {
            removeToken()
            window.location.href = '/login'
            return Promise.reject(refreshError)
        }
       }
       return Promise.reject(error)
    }
)

 