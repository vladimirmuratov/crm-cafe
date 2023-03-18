import {AuthLayout} from '../layouts/auth-layout'
import {useNavigate} from 'react-router-dom'
import {useStore} from '../services/store.service'
import {useForm} from 'react-hook-form'
import React, {useEffect} from 'react'

const RegisterPage = () => {
    const navigate = useNavigate()
    const {register: registerHandler, isAuth} = useStore(state => state)
    const {register, handleSubmit, reset, formState: {errors, isValid, isSubmitting}} = useForm()

    useEffect(() => {
        if(isAuth){
            navigate('/overview')
        }
    }, [isAuth])

    const onSubmit = async (data) => {
        if (isValid) {
            await registerHandler(data)
            reset()
            navigate('/login', {replace: true})
        }
    }

    return (
    <AuthLayout>
        <form className="card" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-content">
                <span className="card-title">Создать аккаунт</span>
                <div className="input-field">
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'email not valid'
                            }
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                        className={`${errors.email && 'invalid'}`}
                    />
                    <label htmlFor="email">Email:</label>
                    {errors.email &&
                        <span className="helper-text red-text text-darken-2">{errors.email?.message}</span>}
                </div>
                <div className="input-field">
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "password is required",
                            minLength: {
                                value: 6,
                                message: 'min 6 symbols'
                            },
                            maxLength: {
                                value: 10,
                                message: 'max 10 symbols'
                            }
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                        className={`${errors.password && 'invalid'}`}
                    />
                    <label htmlFor="password">Пароль:</label>
                    {errors.password &&
                        <span className="helper-text red-text text-darken-2">{errors.password?.message}</span>}
                </div>
            </div>
            <div className="card-action">
                <button
                    type="submit"
                    className="modal-action btn waves-effect"
                    disabled={isSubmitting}
                >
                    Создать
                </button>
            </div>
        </form>
    </AuthLayout>
    )
}

export default React.memo(RegisterPage)
