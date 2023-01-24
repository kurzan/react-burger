import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';

export const Feed = () => {
  return (

    <>
      <h1 className="mt-10 mb-6 text text_type_main-large">Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.orders_list}>
          <OrdersList />
        </div>
        <div className={styles.orders_status}>

        </div>
      </div>

    </>
  )
}