import styles from "./orders-list.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";

const OrderCard = ({order}: any) => {

  return (
    <li className={styles.card}>
      <div className={styles.card_head}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_text-default text_color_inactive">Сегодня, 16:20</p>
      </div>
        <p className="mt-6 text text_type_main-medium"> Death Star Starship Main бургер</p>
      <div className={'mt-6 ' + styles.card_summary}>
        <div className={styles.card_imgbox} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt=""/>
            </div>
          </div>

          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>

          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>

        </div>
        <div className={styles.card_total_sum} >
          <p className="mr-2 text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}


const OrdersList = () => {
  const dispatch = useDispatch();

  const url = 'wss://norma.nomoreparties.space/orders/all'

  useEffect(() => {
    dispatch(connectToOrders(url))

    return () => {
      dispatch(disconnectFromOrders());
    }
  }, []) 

  const { orders } = useSelector(store => store.WsOrdersReducer)



  return (
    <div className={styles.orders_list} >
      <ul>
        <OrderCard />
      </ul>
    </div>
  )
}

export default OrdersList;