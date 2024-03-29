import React from "react";
import styles from './order-details.module.css';
import donePng from '../../images/done.svg';
import { useSelector } from '../../hooks/hooks';


const OrderDetails = () => {
  const { order } = useSelector((store) => store.orderReducer);

  return (
    <div className={styles.order}>
      <p className={"mb-8 text text_type_digits-large " + styles.id} data-cy="orderNumber">{order.number}</p>
      <p className={"mb-15 text text_type_main-medium " + styles.text}>идентификатор заказа</p>
      <img className="mb-15" src={donePng} alt="done" />
      <p className={"mb-2 text text_type_main-default " + styles.text}>Ваш заказ начали готовить</p>
      <p className={"mb-30 text text_type_main-default text_color_inactive " + styles.text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default OrderDetails;
