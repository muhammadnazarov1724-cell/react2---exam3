
import { NavLink } from 'react-router-dom'
import { axiosRequest, saveTokens } from '../../utils/token';
import { useState } from 'react';


export default function Login() {

    async function LogIN(info: {email: string; password: string}) {
        setErrorMessage('')
        try {
            const {data} = await axiosRequest.post('/auth/login', info)
    
            saveTokens(data.accessToken, data.refreshToken)
    
            window.location.href = '/menu'
        } catch (error) {
            console.log(error);
            setErrorMessage('Не удалось войти. Проверь email и пароль.')
        }
    }
    
    function handleSubmit(e:any) {
        e.preventDefault()
        let info = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        LogIN(info)
    }

    let [errorMessage, setErrorMessage] = useState('')

  return (
    <div
      className="flex min-h-[calc(100vh-129px)] items-center justify-center px-5 py-8 font-[Arial,sans-serif]"
      style={{
        backgroundColor: '#f7f8f9',
        backgroundImage: 'radial-gradient(ellipse at 90% 15%, #f9edd9, transparent 30%), radial-gradient(ellipse at 18% 65%, #e4f1ed, transparent 30%), radial-gradient(ellipse at 0% 90%, #f5dddd, transparent 25%)',
      }}
    >
      <form onSubmit={(e)=> handleSubmit(e)} className="w-full max-w-[440px] rounded-[17px] border border-[#eceef1] bg-white p-6 sm:p-8">
        <NavLink to="/" aria-label="На главную" className="mx-auto flex h-10 w-10 items-center justify-center">
          <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
            <g fill="none" stroke="#717b97" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 10v22m-9 1h18M17 15h22M28 10l-3 4m3-4 3 4M20 15l-5 12h10l-5-12Zm16 0-5 12h10l-5-12Z" />
              <path d="M15 27c1 5 9 5 10 0m6 0c1 5 9 5 10 0" />
            </g>
            <text x="28" y="41" textAnchor="middle" fill="#293052" fontSize="11" fontWeight="700">Adl 5:8</text>
            <path d="M17 44h22" stroke="#83b796" strokeWidth="1.5" />
          </svg>
        </NavLink>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[24px] font-semibold text-[#252d38]">Войти</h1>
          <NavLink to="/register" className="text-[14px] text-[#477eff] hover:underline">Нет аккаунта?</NavLink>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-[14px] text-[#708090]">Имя пользователя</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Введите email пользователя"
            className="h-[44px] w-full rounded-[11px] border border-[#d1d9e2] bg-white px-4 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff]"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-[14px] text-[#708090]">Пароль</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              placeholder="Введите пароль"
              className="h-[44px] w-full rounded-[11px] border border-[#d1d9e2] bg-white pl-4 pr-14 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff]"
            />

          </div>
        </div>

        <div className="mt-4 text-right">
          <button type="button" className="text-[14px] text-[#374151] hover:underline">Забыли пароль?</button>
        </div>

        {errorMessage && (
       <div
       role="alert"
       className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
       >
       <p className="flex-1">{errorMessage}</p>

    <button
        type="button"
        aria-label="Закрыть сообщение"
        onClick={() => setErrorMessage('')}
        className="cursor-pointer text-xl"
    >
        ×
    </button>
     </div>
)}

        <button type="submit" className="mt-6 mb-2 h-[44px] w-full cursor-pointer rounded-[10px] border border-[#3c70e8] bg-linear-to-b from-[#6796ff] to-[#3973f4] text-[16px] font-semibold text-white [text-shadow:0_1px_2px_#173d97] shadow-[0_6px_0_#2450b8,0_10px_18px_#2450b835,inset_0_2px_0_#ffffff50] transition-[transform,box-shadow,filter] duration-150 ease-out hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_0_#2450b8,0_14px_22px_#2450b840,inset_0_2px_0_#ffffff60] active:translate-y-[5px] active:brightness-95 active:shadow-[0_1px_0_#2450b8,0_3px_6px_#2450b830,inset_0_2px_4px_#173d9730] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#477eff] motion-reduce:transform-none motion-reduce:transition-none">
          Войти
        </button>
      </form>
    </div>
  )
}
