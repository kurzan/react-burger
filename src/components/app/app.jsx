import React, { useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { getIngridients } from '../../utils/burger-api.js'

import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { IngredientsContext } from '../../services/ingredientsContext';
import { OrderContext } from '../../services/orderContext';


function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [modalIngredientsOpen, setModalIngredientsOpen] = React.useState(false);
  const [modalOrderOpen, setModalOrderOpen] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  const [isError, setIsError] = React.useState({status: false, text: ''});
  const [order, setOrder] = React.useState({});

  useEffect(() => {
    getIngridients(setIngredients, setIsError);
    getIngridients(setSelectedIngredients, setIsError)
  }, []);

  const onOrderClick = () => {
    setModalOrderOpen(true);
  }

  const onOrderModalClose = () => {
    setModalOrderOpen(false)
  }

  const onIngredientClick = (ingredient) => {
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
        <OrderContext.Provider value={{order, setOrder}}>
          <OrderDetails />
        </OrderContext.Provider>    
      </Modal>}

      {modalIngredientsOpen && 
      <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
        < IngredientDetails currentIngredient={currentIngredient}/>
      </Modal>}

      <AppHeader />
      {!isError.status ? 
      <main className={styles.main}>
          <BurgerIngredients data={ingredients} onIngredientClick={onIngredientClick}/>
          {selectedIngredients.length && 
          <IngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients}}>
            <OrderContext.Provider value={{order, setOrder}}>
              <BurgerConstructor onOrderClick={onOrderClick} setIsError={setIsError} />
            </OrderContext.Provider>   
          </IngredientsContext.Provider>}
      </main>
      :
      <Modal title={`Ошибка: ${isError.text} Что-то пошло не так :( Обновите страницу`} />
    }
    </>
  );
}


export default App;
