import styles from './not-found.module.css'
import { Link } from 'react-router-dom'

export const NotFound404 = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large mb-6">Упс... Ошибка 404</h1>
            <p className="text text_type_main-default text_color_inactive mb-10">Данной страницы не существует</p>
            <span className="text text_type_main-default text_color_inactive">
                Проверьте адрес или перейдите на <Link className={styles.link} to='/'>главную страницу</Link>
            </span>
        </div>
    )
}