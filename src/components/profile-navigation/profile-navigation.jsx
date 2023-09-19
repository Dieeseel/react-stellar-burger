import styles from './profile-navigation.module.css'
import { NavLink } from 'react-router-dom'
import { useCallback } from 'react'
import { signOut } from '../../services/actions/auth'
import { useDispatch } from 'react-redux'

export const ProfileNavigation = () => {
    const dispatch = useDispatch()

    const exit = useCallback(
        e => {
          e.preventDefault();
          dispatch(signOut())
        }, []
    );

    return (
        <div className={styles.navigation}>
            <NavLink to={{ pathname: `/profile` }} className={({ isActive }) =>
                isActive ? `text text_type_main-medium ${styles.activeLink}` 
                    : `text text_type_main-medium text_color_inactive ${styles.inactivelink}`
                } end> Профиль </NavLink>
            <NavLink to={{ pathname: `/profile/orders` }} className={({ isActive }) =>
                isActive ? `text text_type_main-medium ${styles.activeLink}` 
                    : `text text_type_main-medium text_color_inactive ${styles.inactivelink}`
                } end> История заказов </NavLink>
            <NavLink onClick={exit} className={`text text_type_main-medium text_color_inactive ${styles.inactivelink}`}>Выход</NavLink>
        </div>
    )
}