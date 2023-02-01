import styles from "./orders-list.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";
import { TIngredient } from "../../services/types/types";
import { getOrderStatus } from "../../utils/utils";
import { ALL_ORDERS_URL } from "../../utils/burger-ws";
import moment from "moment";

const VISIBLE_INGREDIENTS_SLICE = 6;


type TOrderCard = {
  order: { 
    ingredients: (TIngredient | undefined)[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string};
  isShow: boolean;
};

const OrderCard: FC<TOrderCard> = ({order, isShow}) => {

  // useEffect(() => {
  //   console.log(ingredients)
  // }, []) 

  const totalPrice = useMemo(() => {
    const buns = order.ingredients.filter((ingredient) => ingredient?.type === 'bun').reduce((acc, cur) => cur ? acc + cur.price * 2 : 0, 0) 
    const others = order.ingredients.filter((ingredient) => ingredient?.type !== 'bun').reduce((acc, cur) => cur ? acc + cur.price: 0, 0) 
    const total = buns + others;
    return total
  }, [order])

    useEffect(() => {
      
  }, []) 

  return (
    <li className={styles.card}>
      <div className={styles.card_head}>
        <p className="text text_type_digits-default"># {order.number}</p>
        <p className="text text_type_text-default text_color_inactive">{moment(order.createdAt).calendar()}</p>
      </div>
      <p className="mt-6 mb-2 text text_type_main-medium">{order.name}</p>
      {isShow ? <p style={{ color: getOrderStatus(order.status).color }} className="text text_type_main-default">{getOrderStatus(order.status).text}</p> : null}
      <div className={'mt-6 ' + styles.card_summary}>
        <div className={styles.card_imgbox} >

          {order && order.ingredients.slice(0, VISIBLE_INGREDIENTS_SLICE).map((item, index) => (
            <div key={index} className={styles.img_border} >
              <div className={styles.img_border_back} style={{ opacity: order.ingredients.length > VISIBLE_INGREDIENTS_SLICE && (index === VISIBLE_INGREDIENTS_SLICE - 1) ? 0.6 : 1 }}>
                <img className={styles.card_img} src={item?.image_mobile} alt="" />
              </div>
              {order.ingredients.length > VISIBLE_INGREDIENTS_SLICE && (index === VISIBLE_INGREDIENTS_SLICE - 1) &&
                <div className={styles.image_text}>+{order.ingredients.length - VISIBLE_INGREDIENTS_SLICE}</div>
              }
            </div>
          ))}

        </div>
        <div className={styles.card_total_sum} >
          <p className="mr-2 text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}


const OrdersList = ({isShow}: {isShow: boolean}) => {
  const dispatch = useDispatch();

  const { orders } = useSelector(store => store.WsOrdersReducer)
  const { ingredients } = useSelector((store) => store.ingredientsReducer);

  const data = orders?.orders.map(item => ({ ...item, ingredients: item.ingredients.filter(x => x !== null).map(item => ingredients.find(i => i._id === item)).filter(x => x !== undefined) }));

  useEffect(() => {
    console.log(data)
  }, [data]) 

  useEffect(() => {
    dispatch(connectToOrders(ALL_ORDERS_URL))

    return () => {
      dispatch(disconnectFromOrders());
    }
  }, [])

  return (
    <div className={styles.orders_list} >
      <ul>
        {data && data.map((order, index) => order.status === 'done' && <OrderCard key={index} isShow={isShow} order={order} />)}
      </ul>
    </div>
  )
}

export default OrdersList;