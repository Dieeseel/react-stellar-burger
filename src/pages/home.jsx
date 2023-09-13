import React from "react";
import styles from "./home.module.css"
import AppHeader from '../components/app-header/app-header'
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { getIngredients } from "../services/actions/burger";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage() {
  const dispatch = useDispatch()
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients)
  
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])


  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !ingredientsRequest && !ingredientsFailed && ingredients.length > 0 &&
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

export default HomePage;
