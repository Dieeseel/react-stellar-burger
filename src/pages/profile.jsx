import styles from './profile.module.css'
import AppHeader from '../components/app-header/app-header'
import { ProfileNavigation } from '../components/profile-navigation/profile-navigation'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut, saveNewData } from '../services/actions/auth'



export const ProfilePage = () => {
    const dispatch = useDispatch()
    const userData = useSelector(store => store.auth.userData)
    const [form, setValue] = useState({name: userData.user.name, email: userData.user.email, password: ''})
    const [activeButton, setActiveButton] = useState(false)

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const saveChanges = useCallback(
        e => {
          e.preventDefault();
          dispatch(saveNewData(form))
        }, [form]
    );
    
    
    const resetChanges = () => {
        setValue({name: userData.user.name, email: userData.user.email, password: ''})
    }

    useEffect(() => {
        form.name ===  userData.user.name &&
        form.email === userData.user.email &&  
        form.password === '' ? setActiveButton(false) : setActiveButton(true)
    }, [form])


    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <ProfileNavigation />
                <form className={styles.form} onSubmit={saveChanges}>
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
                             />
                    </div>
                    <div className={styles.buttons}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={resetChanges}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" disabled={!activeButton}>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}