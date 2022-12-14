import React from 'react';
import dataPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/';
import { useDrop } from "react-dnd";

import { postOrder } from '../../services/actions/order';
import { removeIngredient } from '../../services/actions/selected-ingredients';
import { useDispatch, useSelector } from 'react-redux';

import { selectIngredient, selectBun } from '../../services/actions/selected-ingredients';
import { v4 as uuid } from 'uuid';

 const BurgerConstructor = ({onOrderClick}) => {
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.ingredient.type === 'bun') {
        dispatch(selectBun(item.ingredient));
      } else {
        dispatch(selectIngredient(item.ingredient, uuid()));
      }
    },
  });
  
  const { bun, selectedIngredients } = useSelector(store => store.selectedIngredientsReducer );

  const allIngredients = [...selectedIngredients, bun ? bun : ''];
  const totalValue = selectedIngredients.reduce((sum, el) => sum + el.price, 0) + (bun? bun.price * 2 : 0);

  const createOrder = () => {
    dispatch(postOrder(allIngredients));
    onOrderClick();
  };

  const handleRemoveItem = (key) => {
    dispatch(removeIngredient(key))
  }

  return (
    <section className={'mt-25 ml-10 ' + styles.constructor} ref={dropTarget}>
      <div className={'mb-4 mr-4 ' + styles.top} >
        {bun && 
                <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + ' (верх)'}
                price={bun.price}
                thumbnail={bun.image}
              />
        }
      </div>
      <ul className={styles.content}>
        { selectedIngredients.map((item, index) => {
            return (
              <li key={index} className={'mr-1 ' + styles.item}>
                <span className={'mr-10' + styles.grug_icon}><DragIcon type="primary" /></span>
                <ConstructorElement
                key={index}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleRemoveItem(item.key)}
                />
              </li> 
            )
        }) }
      </ul>
      <div className={'mt-4 mr-4 ' + styles.bottom}>
        {bun && 
                <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + ' (низ)'}
                price={bun.price}
                thumbnail={bun.image}
              />
        }
      </div>
      <div className={'mt-10 mr-4 ' + styles.order}>
        <p className="text text_type_digits-medium mr-10">{totalValue}<CurrencyIcon /></p>
        <Button htmlType="button" type="primary" size="large" disabled={selectedIngredients.length || bun ? false : true} onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = { 
  data: PropTypes.arrayOf(
    PropTypes.shape(
      dataPropTypes.isRequired).isRequired),
  onOrderClick: PropTypes.func.isRequired,
};


export default BurgerConstructor;