import styles from './profile.module.css'
import AppHeader from '../components/app-header/app-header'
import { NavLink } from 'react-router-dom'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut, saveNewData } from '../services/actions/auth'


export const ProfilePage = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(store => store.auth)
    const [form, setValue] = useState({name: userData.user.name, email: userData.user.email, password: ''})

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const saveChanges = useCallback(
        e => {
          e.preventDefault();
          dispatch(saveNewData(form))
        }, [form]
    );
    
    const exit = useCallback(
        e => {
          e.preventDefault();
          dispatch(signOut())
        }, [form]
    );

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.navigation}>
                    <NavLink 
                        to='/profile' 
                        className={({ isActive}) =>
                        isActive ? `text text_type_main-medium ${styles.activeLink}` 
                            : `text text_type_main-medium text_color_inactive ${styles.inactivelink}`
                      }
                        >
                        Профиль
                    </NavLink>
                    <NavLink className={`text text_type_main-medium text_color_inactive ${styles.inactivelink}`}>История заказов</NavLink>
                    <NavLink onClick={exit} className={`text text_type_main-medium text_color_inactive ${styles.inactivelink}`}>Выход</NavLink>
                </div>
                <form className={styles.form}>
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
                    <Button htmlType="button" type="primary" size="medium" onClick={saveChanges}>
                        Сохранить
                    </Button>
                </form>
            </main>
        </div>
    )
}