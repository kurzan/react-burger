import React, { FC, useRef } from 'react';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/';
import { useDrop, useDrag } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core';

import { postOrder } from '../../services/actions/order';
import { removeIngredient, moveIngredient } from '../../services/actions/selected-ingredients';
import { useDispatch, useSelector } from '../../hooks/hooks'; 

import { selectIngredient, selectBun } from '../../services/actions/selected-ingredients';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../services/types/types';

type TConstructorItemProps = {
  ingredient: TIngredient;
  index: number;
  onDelete: (item?: string | undefined) => void;
};

type DragItem = {
  index: number
  id: string
  type: string
};

const ConstructorItem: FC<TConstructorItemProps> = ({ ingredient, index, onDelete }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
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

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    <div className={'mr-1 ' + styles.item} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <span className={'mr-10 ' + styles.grug_icon}><DragIcon type="primary" /></span>
      <ConstructorElement
        key={index}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete(ingredient.key)}
      />
    </div>
  )
}

type TBurrgerConsructorProps = {
  onOrderClick: () => void;
};

const BurgerConstructor: FC<TBurrgerConsructorProps> = ({ onOrderClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((store) => store.userReducer);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: any) {
      if (item.ingredient.type === 'bun') {
        dispatch(selectBun(item.ingredient));
      } else {
        dispatch(selectIngredient(item.ingredient, uuid()));
      }
    },
  });

  const { bun, selectedIngredients } = useSelector((store) => store.selectedIngredientsReducer);
  
  const allIngredients = [...selectedIngredients, bun ? bun : '', bun ? bun : ''];
  const totalValue = selectedIngredients.reduce((sum: number, el: TIngredient) => sum + el.price, 0) + (bun ? bun.price * 2 : 0);

  const createOrder = () => {
    if (user) {
      dispatch(postOrder(allIngredients));
      onOrderClick();
    } else {
      history.push({pathname: '/login'});
    }
  };

  const handleRemoveItem = (key: any) => {
    dispatch(removeIngredient(key))
  }
  
  const chekConstructor = selectedIngredients.length || bun ? false : true;

  return (
    <section className={'ml-10 ' + styles.constructor} ref={dropTarget} data-cy='dropTarget'>
        
        {bun &&
          <div data-cy="constructorItem" className={'mb-4 mr-4 ' + styles.top} >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          
        </div>
        }
        <ul className={styles.content}>

            {selectedIngredients.map((item, index) => 
              <ConstructorItem ingredient={item} key={item.key} index={index} onDelete={handleRemoveItem} />
            )}
          
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
        {chekConstructor && <p>Перенестите необходимые ингредиенты для бургера в эту часть экрана</p>}
        <div className={'mt-10 mr-4 ' + styles.order}>
          <p className="text text_type_digits-medium mr-10">{totalValue}<CurrencyIcon type='primary' /></p>
          <Button data-cy="orderButton" htmlType="button" type="primary" size="large" disabled={chekConstructor} onClick={createOrder}>
            Оформить заказ
          </Button>
        </div>
    </section>
  )
}

export default BurgerConstructor;