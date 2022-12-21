import React, { useState } from 'react';
import styles from './home.module.css'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';

import OrderDetails from "../../components/order-details/order-details";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentIngredient, resetCurrentIngredient } from '../../services/actions/current-ingredient';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {
  const [modalIngredientsOpen, setModalIngredientsOpen] = useState(false);
  const [modalOrderOpen, setModalOrderOpen] = useState(false);

  const dispatch = useDispatch ();
  const { isLoading, isError } = useSelector(store => store.ingredientsReducer);
  const { orderRequest, orderFailed } = useSelector(store => store.orderReducer);

  const onOrderClick = () => {
    setModalOrderOpen(true);
  }

  const onOrderModalClose = () => {
    setModalOrderOpen(false);
  }

  const onIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    setModalIngredientsOpen(true);
  }

  const ingredientModalClose = () => {
    dispatch(resetCurrentIngredient())
    setModalIngredientsOpen(false);
  }

  return (
    <>
      {orderRequest && <Modal title={'Отправляем заказ на сервер...'} />}
      {modalOrderOpen && !orderRequest && !orderFailed &&
      <Modal onClose={onOrderModalClose}>
        <OrderDetails />
      </Modal>}
      {orderFailed &&
        <Modal title={`Ошибка: Что-то пошло не так :( Попробуйте еще раз`} /> 
      }

      {modalIngredientsOpen && 
      <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
        < IngredientDetails/>
      </Modal>}

      {isLoading && <Modal title={'Загрузка данных...'} />}
      {isError ? <Modal title={`Ошибка: Что-то пошло не так :( Обновите страницу`} /> 
      :
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
            <BurgerIngredients onIngredientClick={onIngredientClick}/>
            <BurgerConstructor onOrderClick={onOrderClick} />
        </main>
      </DndProvider>
      }
    </>
  );
}

export default HomePage;
