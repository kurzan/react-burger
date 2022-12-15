import React, { useRef } from 'react';
import dataPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/';
import { useDrop, useDrag } from "react-dnd";

import { postOrder } from '../../services/actions/order';
import { removeIngredient, moveIngredient } from '../../services/actions/selected-ingredients';
import { useDispatch, useSelector } from 'react-redux';

import { selectIngredient, selectBun } from '../../services/actions/selected-ingredients';
import { v4 as uuid } from 'uuid';


const ConstructorItem = ({ ingredient, index, onDelete }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient(dragIndex, hoverIndex));

      item.index = hoverIndex;

    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li className={'mr-1 ' + styles.item} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <span className={'mr-10 ' + styles.grug_icon}><DragIcon type="primary" /></span>
      <ConstructorElement
        key={index}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete(ingredient.key)}
      />
    </li>
  )
}

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape(
      dataPropTypes.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};


const BurgerConstructor = ({ onOrderClick }) => {
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

  const { bun, selectedIngredients } = useSelector(store => store.selectedIngredientsReducer);

  const allIngredients = [...selectedIngredients, bun ? bun : ''];
  const totalValue = selectedIngredients.reduce((sum, el) => sum + el.price, 0) + (bun ? bun.price * 2 : 0);

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
        {selectedIngredients.map((item, index) => <ConstructorItem key={item.key} ingredient={item} index={index} onDelete={handleRemoveItem} />)}
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
  onOrderClick: PropTypes.func.isRequired,
};


export default BurgerConstructor;