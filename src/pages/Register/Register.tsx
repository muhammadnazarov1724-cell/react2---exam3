import { NavLink } from 'react-router-dom'
import { axiosRequest, saveTokens } from '../../utils/token'
import { useState } from 'react'

export default function Register() {

    const [errorMessage, setErrorMessage] = useState('')

    function handleSubmit(e: any) {
        setErrorMessage('')
        e.preventDefault()

        const info = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        SignUP(info)
    }

    async function SignUP(info: {
        name: string
        email: string
        password: string
    }) {

        try {
            const { data } = await axiosRequest.post('/auth/register', info)

            saveTokens(data.accessToken, data.refreshToken)

            window.location.href = '/menu'
        } catch (error) {
            console.log(error);
            setErrorMessage('Не удалось зарегистрироваться. Проверь данные или попробуй позже.')
        }
        
    }

  return (
    <div
      className="flex min-h-[calc(100vh-129px)] items-center justify-center px-5 py-8 font-[Arial,sans-serif]"
      style={{
        backgroundColor: '#f7f8f9',
        backgroundImage: 'radial-gradient(ellipse at 90% 15%, #f9edd9, transparent 30%), radial-gradient(ellipse at 18% 65%, #e4f1ed, transparent 30%), radial-gradient(ellipse at 0% 90%, #f5dddd, transparent 25%)',
      }}
    >
      <form onSubmit={handleSubmit} className="register-card w-full max-w-[440px] rounded-[17px] border border-[#eceef1] bg-white p-6 shadow-[0_16px_60px_-24px_#283e6b26] transition-[border-color,box-shadow] duration-300 focus-within:border-[#d5e0fa] focus-within:shadow-[0_20px_65px_-24px_#477eff35] sm:px-8 sm:py-7">
        <NavLink to="/" aria-label="На главную" className="mx-auto flex h-8 w-8 items-center justify-center transition-transform duration-200 hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none">
          <svg viewBox="0 0 56 56" className="h-8 w-8" aria-hidden="true">
            <g fill="none" stroke="#717b97" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 10v22m-9 1h18M17 15h22M28 10l-3 4m3-4 3 4M20 15l-5 12h10l-5-12Zm16 0-5 12h10l-5-12Z" />
              <path d="M15 27c1 5 9 5 10 0m6 0c1 5 9 5 10 0" />
            </g>
            <text x="28" y="41" textAnchor="middle" fill="#293052" fontSize="11" fontWeight="700">Adl 5:8</text>
            <path d="M17 44h22" stroke="#83b796" strokeWidth="1.5" />
          </svg>
        </NavLink>

        <div className="register-heading mt-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[24px] font-semibold text-[#252d38]">Регистрация</h1>
          <NavLink to="/login" className="text-[14px] text-[#477eff] underline-offset-4 transition-colors duration-200 hover:text-[#2454cb] hover:underline">Уже есть аккаунт?</NavLink>
        </div>

        <div className="register-fields mt-5 space-y-4">
          <div>
            <label htmlFor="register-business" className="mb-1.5 block text-[14px] text-[#708090]">Название бизнеса*</label>
            <input
              id="register-business"
              name="businessName"
              type="text"
              autoComplete="organization"
              placeholder="Моя компания"
              required
              className="h-[44px] w-full rounded-[10px] border border-[#d1d9e2] bg-white px-3 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff15]"
            />
          </div>

          <div>
            <label htmlFor="register-name" className="mb-1.5 block text-[14px] text-[#708090]">Имя пользователя*</label>
            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Введите имя пользователя"
              required
              className="h-[44px] w-full rounded-[10px] border border-[#d1d9e2] bg-white px-3 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff15]"
            />
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1.5 block text-[14px] text-[#708090]">Email*</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
              required
              className="h-[44px] w-full rounded-[10px] border border-[#d1d9e2] bg-white px-3 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff15]"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="mb-1.5 block text-[14px] text-[#708090]">Пароль*</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="******"
                minLength={6}
                maxLength={128}
                required
                className="h-[44px] w-full rounded-[10px] border border-[#d1d9e2] bg-white pl-3 pr-11 text-[14px] text-[#252d38] outline-none placeholder:text-[#a4a9af] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff15]"
              />

            </div>

          </div>
        </div>

        <p className="register-details mt-5 text-[12px] leading-[1.7] text-[#374151]">
          Регистрируясь, вы соглашаетесь с нашими{' '}
          <NavLink to="/terms" className="text-[#477eff] underline-offset-4 transition-colors duration-200 hover:text-[#2454cb] hover:underline">Условиями обслуживания</NavLink>{' '}
          и{' '}
          <NavLink to="/privacy" className="text-[#477eff] underline-offset-4 transition-colors duration-200 hover:text-[#2454cb] hover:underline">Политикой конфиденциальности</NavLink>
        </p>
        
        {errorMessage && (
          <div
           role="alert"
           className="register-error mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
           {errorMessage}
         </div>
      )}

        <div className="register-action mt-5">
          <button type="submit" className="register-submit h-[44px] w-full cursor-pointer rounded-[9px] text-[16px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#477eff]">
            Создать Аккаунт
          </button>
        </div>
      </form>
    </div>
  )
}
