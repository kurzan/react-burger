import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';
import { useSocket } from '../../hooks/use-socket';
import { useEffect, useState } from 'react';

export const Feed = () => {

  // const { connect } = useSocket('wss://norma.nomoreparties.space/orders/all');

  const [orders, setOrders] = useState();

  useEffect(() => {
    const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');


    ws.onmessage = function(e) {
      setOrders(e.data)
    }

    ws.onclose = function(e) {
      console.log('closed')
    }

    console.log(orders)

    return () => {
      ws.close();

    }
  }, [])

  return (

    <>
      <h1 className="mt-10 mb-6 text text_type_main-large">Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.orders_list}>
          <OrdersList />
        </div>

        <div className={'ml-15 ' + styles.orders_summary}>
          <div className={styles.orders_status}>

            <div className={styles.orders_done}>
              <p className="mb-6 text text_type_main-medium">Готовы:</p>
              <ul>
                <li><p style={{ color: '#00CCCC' }} className="text text_type_digits-default">034533</p></li>
                <li><p style={{ color: '#00CCCC' }} className="text text_type_digits-default">034533</p></li>
                <li><p style={{ color: '#00CCCC' }} className="text text_type_digits-default">034533</p></li>
                <li><p style={{ color: '#00CCCC' }} className="text text_type_digits-default">034533</p></li>
                <li><p style={{ color: '#00CCCC' }} className="text text_type_digits-default">034533</p></li>
              </ul>
            </div>

            <div className={"mb-15 " + styles.orders_imwork}>
              <p className="mb-6 text text_type_main-medium">В работе:</p>
              <ul>
                <li><p className="text text_type_digits-default">034533</p></li>
                <li><p className="text text_type_digits-default">034533</p></li>
                <li><p className="text text_type_digits-default">034533</p></li>
                <li><p className="text text_type_digits-default">034533</p></li>
                <li><p className="text text_type_digits-default">034533</p></li>
              </ul>
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={"mb-15 text text_type_digits-large " + styles.digit} >28 752</p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={"mb-15 text text_type_digits-large " + styles.digit}>138</p>
        </div>
      </div>

    </>
  )
}