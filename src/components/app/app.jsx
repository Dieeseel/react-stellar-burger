import React from "react";
import styles from "./app.module.css";
import { urlApi } from "../../utils/data";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientsDataContext, ConstructorDataContext } from "../../services/dataContext";


function App() {
  const [state, setState] = React.useState({
    hasError: false,
    isLoading: false,
    dataIngredients: []
  })

  const [constructorData, setConstructorData] = React.useState([])

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(`${urlApi}/ingredients`)
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
        <main className={styles.main}>
          <IngredientsDataContext.Provider value={dataIngredients}>
            <ConstructorDataContext.Provider value={{constructorData, setConstructorData}}>
              <BurgerIngredients />
              <BurgerConstructor />
            </ConstructorDataContext.Provider>
          </IngredientsDataContext.Provider>
        </main>
      }
    </div>
  );
}

export default App;
