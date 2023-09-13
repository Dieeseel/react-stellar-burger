import AppHeader from "../components/app-header/app-header"
import styles from './home.module.css'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from "react-router-dom"
import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/actions/auth"

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(store => store.auth)
    const [form, setValue] = useState({name: '', email: '', password: ''})

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }
    
    const register = useCallback(
        e => {
          e.preventDefault();
          dispatch(signUp(form))
        }, [form]
    );
    
    if(userData) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <h1 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h1>
                        <div className={styles.inputs}>
                            <Input 
                                placeholder="Имя" 
                                name='name' 
                                value={form.name} 
                                onChange={onChange}
                                minLength={3}
                                required />
                            <EmailInput 
                                placeholder="E-mail" 
                                name='email' 
                                value={form.email} 
                                minLength={3}
                                onChange={onChange}
                                required />
                            <PasswordInput 
                                placeholder="Пароль" 
                                name='password' 
                                value={form.password} 
                                minLength={6}
                                onChange={onChange} 
                                required />
                        </div>
                        <Button htmlType="submit" 
                                type="primary" 
                                size="medium" 
                                extraClass="mb-20"  
                                onClick={register} 
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to='/sign-in' className={styles.link} href="#">Войти</Link> 
                    </p>
                </div>
            </div>
        </div> 
    )
}