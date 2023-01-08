import React, { useState } from 'react';
import styles from './home.module.css'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';

import OrderDetails from "../../components/order-details/order-details";

import { useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const HomePage = () => {
  const [modalOrderOpen, setModalOrderOpen] = useState(false);

  const { isLoading, isError } = useSelector((store: any) => store.ingredientsReducer);
  const { orderRequest, orderFailed } = useSelector((store: any) => store.orderReducer);

  const onOrderClick = () => {
    setModalOrderOpen(true);
  }

  const onOrderModalClose = () => {
    setModalOrderOpen(false);
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

      {isLoading && <Modal title={'Загрузка данных...'} />}
      {isError ? <Modal title={`Ошибка: Что-то пошло не так :( Обновите страницу`} /> 
      :
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor onOrderClick={onOrderClick} />
        </main>
      </DndProvider>
      }
    </>
  );
}
