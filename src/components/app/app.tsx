import React, { useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";


const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';


function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [modalIngredientsOpen, setModalIngredientsOpen] = React.useState(false);
  const [modalOrderOpen, setModalOrderOpen] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(data => setIngredients(data.data))
      .catch(err => {
        console.log(err)
      })
  }, []);

  const onOrderClick = () => {
    setModalOrderOpen(true);
  }

  const onOrderModalClose = () => {
    setModalOrderOpen(false)
  }

  const onIngredientClick = (ingredient:object) => {
    setCurrentIngredient(ingredient);
    setModalIngredientsOpen(true);
  }

  const ingredientModalClose = () => {
    setModalIngredientsOpen(false);
  }

  return (
    <>
      {modalOrderOpen && 
      <Modal onClose={onOrderModalClose}> 
        < OrderDetails />
      </Modal>}

      {modalIngredientsOpen && 
      <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
        < IngredientDetails currentIngredient={currentIngredient}/>
      </Modal>}

      <AppHeader />
      <main className={styles.main}>
          <BurgerIngredients data={ingredients} onIngredientClick={onIngredientClick}/>
          {ingredients.length > 0 && <BurgerConstructor data={ingredients} onOrderClick={onOrderClick} />}
      </main>
    </>
  );
}


export default App;
