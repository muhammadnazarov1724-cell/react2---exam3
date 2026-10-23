import axios from "axios";
import { useUserStore } from '../store/useUserStore'
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
    useUserStore.getState().setUser(null)
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

 
export const getUser = () => {
    return useUserStore.getState().user
}


    export async function handleLogout() {
    const refreshToken = localStorage.getItem('refresh')

    try {
        if (refreshToken) {
            await axiosRequest.post('/auth/logout', {refreshToken})
        }
    } catch {
        console.error('Не удалось завершить сессию на сервере')
    }
    finally {
        removeToken()
        window.location.replace('/login')
    }
   }
