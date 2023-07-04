import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.links}>
                        <li className='pl-5 pr-5 pb-4 pt-4'>
                            <a className={styles.link} href="#">
                                <BurgerIcon type='primary' />
                                <p className='text text_type_main-default'>Конструктор</p>
                            </a>
                        </li>
                        <li className='pl-5 pr-5 pb-4 pt-4'>
                            <a className={styles.link} href="#">
                                <ListIcon type='secondary'/>
                                <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
                            </a>
                        </li>
                    </ul>
                </nav>

                <Logo />

                <a className={styles.profileLink} href='#'>
                    <ProfileIcon type='secondary' />
                    <p className='text text_type_main-default text_color_inactive'>Личный кабинет</p>
                </a>
            </div>
        </header>
    )
}

export default AppHeader