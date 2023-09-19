import { useEffect } from 'react'
import styles from "./home.module.css"
import AppHeader from '../components/app-header/app-header'
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { wsConnectionStart } from '../services/actions/wsActions';
import { useSelector, useDispatch } from 'react-redux'
import { getCookie } from '../services/cookie';

function HomePage() {
    const dispatch = useDispatch()
    const accessToken = getCookie('accessToken')
    const url = `wss://norma.nomoreparties.space/orders?token=${accessToken}`

    
    useEffect(() => {
        dispatch(wsConnectionStart(url))
    }, [])

    return (
      <div className={styles.app}>
        <AppHeader />
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
      </div>
    );
}

export default HomePage;
