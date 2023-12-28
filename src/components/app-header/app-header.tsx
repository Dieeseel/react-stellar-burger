import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink } from 'react-router-dom'

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.links}>
                        <li className='pl-5 pr-5 pb-4 pt-4'>
                            <NavLink to={{ pathname: `/` }} className={styles.link}>
                                {({ isActive }) => (
                                    <>
                                        <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                        <p className={isActive 
                                            ? 'text text_type_main-default' 
                                            : 'text text_type_main-default text_color_inactive'}>
                                                Конструктор
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className='pl-5 pr-5 pb-4 pt-4'>
                            <NavLink to={{ pathname: `/feed` }} className={styles.link}>
                                {({ isActive }) => (
                                    <>
                                        <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                        <p className={isActive 
                                            ? 'text text_type_main-default' 
                                            : 'text text_type_main-default text_color_inactive'}>
                                                Лента заказов
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <Logo />

                <NavLink to={{ pathname: `/profile` }} className={styles.profileLink}>
                {({ isActive }) => (
                    <>
                        <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                        <p className={isActive 
                            ? 'text text_type_main-default' 
                            : 'text text_type_main-default text_color_inactive'}>
                            Личный кабинет
                        </p>
                    </>
                )}
            </NavLink>
            </div>
        </header>
    )
}

export default AppHeader