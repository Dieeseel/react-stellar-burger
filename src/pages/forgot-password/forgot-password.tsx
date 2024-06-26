import styles from '../home/home.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Link, Navigate } from "react-router-dom"
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { resetPassword } from '../../services/actions/user'
import { useDispatch, useSelector } from '../../services/hooks'
import { ChangeEvent, useState, useCallback } from 'react'

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch()
    const isEmailValid = useSelector(store => store.auth.isEmailValid)
    const [form, setValue] = useState({ email: ''})

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const reset = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          dispatch(resetPassword(form));
        }, [form]
    );
    
    
    if (isEmailValid) {
        return <Navigate to='/reset-password' />
    }

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={reset}>
                        <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
                        <div className={styles.inputs}>
                            <EmailInput 
                                    name='email' 
                                    placeholder="Укажите e-mail"
                                    value={form.email}
                                    onChange={onChange} 
                                    required />
                        </div>
                        <Button htmlType="submit" 
                                type="primary" 
                                size="medium"
                                extraClass="mb-20"
                                required >
                            Восстановить
                        </Button>
                    </form>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспомнили пароль? <Link to='/sign-in' className={styles.link}>Войти</Link> 
                    </p>
                </div>
            </div>
        </div>
    )
}