import React from "react";
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const dispatch = useDispatch()
  const { ingredients, ingredientsRequest, ingredientsFaile } = useSelector(store => store.burger)
  
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])


  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !ingredientsRequest && !ingredientsFaile && ingredients.length > 0 &&
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      }
    </div>
  );
}

export default App;
