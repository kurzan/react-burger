import React, { useContext } from 'react';
import dataPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/';
import { IngredientsContext } from '../../services/ingredientsContext';
import { OrderContext } from '../../services/orderContext';
import { postOrder } from '../../utils/burger-api.js'


 const BurgerConstructor = ({onOrderClick, setIsError}) => {
  const {selectedIngredients} = useContext(IngredientsContext);
  const {setOrder} = useContext(OrderContext);
  
  const bun = selectedIngredients.find(item => item.type === 'bun');
  const mainIngredients = selectedIngredients.slice(0, 8).filter(item => item.type !== 'bun');
  const allIngredients = [...mainIngredients, bun];
  const totalValue = mainIngredients.reduce((sum, el) => sum + el.price, 0) + (bun? bun.price * 2 : 0);

  const createOrder = () => {
    postOrder(setOrder, allIngredients, setIsError);
    onOrderClick();
  };

  return (
    <section className={'mt-25 ml-10 ' + styles.constructor}>
      <div className={'mb-4 mr-4 ' + styles.top}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + ' (верх)'}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.content}>
        { mainIngredients.map((item, index) => {
            return (
              <li key={index} className={'mr-1 ' + styles.item}>
                <span className={'mr-10' + styles.grug_icon}><DragIcon type="primary" /></span>
                <ConstructorElement
                key={index}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                />
              </li> 
            )
        }) }
      </ul>
      <div className={'mt-4 mr-4 ' + styles.bottom}>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
      </div>
      <div className={'mt-10 mr-4 ' + styles.order}>
        <p className="text text_type_digits-medium mr-10">{totalValue}<CurrencyIcon /></p>
        <div onClick={createOrder}>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = { 
  data: PropTypes.arrayOf(
    PropTypes.shape(
      dataPropTypes.isRequired).isRequired),
  onOrderClick: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
};


export default BurgerConstructor;