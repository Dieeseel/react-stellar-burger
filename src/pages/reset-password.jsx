import styles from './home.module.css'
import AppHeader from '../components/app-header/app-header'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from "react-router-dom"
import { useState, useCallback } from 'react'
import { changePassword } from '../services/actions/auth'

export const ResetPasswordPage = () => {
    const dispatch = useDispatch()
    const isEmailValid = useSelector(store => store.auth.isEmailValid)
    const [form, setValue] = useState({ password: '', token: ''})

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const change = useCallback(
        e => {
          e.preventDefault();
          dispatch(changePassword(form))
        }, [form]
    );

    if (!isEmailValid) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={change}>
                        <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
                        <div className={styles.inputs}>
                            <PasswordInput 
                                    placeholder="Введите новый пароль" 
                                    name='password' 
                                    value={form.password} 
                                    onChange={onChange} 
                                    required />
                            <Input 
                                placeholder="Введите код из письма" 
                                name='token' 
                                value={form.token} 
                                onChange={onChange}
                                minLength={3}
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