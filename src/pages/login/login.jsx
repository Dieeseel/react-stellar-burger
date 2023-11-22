import AppHeader from "../../components/app-header/app-header"
import styles from '../home/home.module.css'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signIn } from "../../services/actions/auth"

export const LoginPage = () => {
    const dispatch = useDispatch()
    const [form, setValue] = useState({ email: '', password: '' })

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const login = useCallback(
        e => {
          e.preventDefault();
          dispatch(signIn(form));
        }, [form]
    );

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={login}>
                        <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
                        <div className={styles.inputs}>
                            <EmailInput 
                                name='email' 
                                placeholder="E-mail"
                                onChange={onChange} 
                                value={form.email}
                                required />
                            <PasswordInput 
                                name='password'  
                                placeholder="Пароль" 
                                onChange={onChange} 
                                value={form.password}
                                required />
                        </div>
                        <Button htmlType="submit" 
                                type="primary" 
                                size="medium" 
                                extraClass="mb-20"
                                required >
                            Войти
                        </Button>
                    </form>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link> 
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link> 
                    </p>
                </div>
            </div>
        </div>   
    )
}
