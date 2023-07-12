import React from "react";
import styles from "./app.module.css";
import { urlApi } from "../../utils/data";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {
  const [state, setState] = React.useState({
    hasError: false,
    isLoading: false,
    dataIngredients: []
  })

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(urlApi)
        .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
        .then(res => setState({ ...state, dataIngredients: res.data, isLoading: false }))
        .catch(err => {
          setState({ ...state, hasError: true, isLoading: false });
          console.log(err)
        });
    }
    getIngredients()
  }, [])

  const { dataIngredients, isLoading, hasError } = state;
  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !isLoading && !hasError && dataIngredients.length &&
        <>
          <main className={styles.main}>
            <BurgerIngredients ingridientsData={dataIngredients} />
            <BurgerConstructor constructorData={dataIngredients} />
          </main>
        </>
      }

    </div>
  );
}

export default App;
