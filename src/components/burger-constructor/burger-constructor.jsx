import React from 'react';
import dataPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/';



 const BurgerConstructor = ({data}) => {
  const bun = data.find(item => item.type === 'bun');

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
        { data.map((item, index) => {
            return (
            <React.Fragment key={index}>
              { item.type !== 'bun' && 
              <li key={index} className={'mr-1 ' + styles.item}>
                <span className={'mr-10' + styles.grug_icon}><DragIcon type="primary" /></span>
                <ConstructorElement
                key={index}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                />
              </li> 
              }
            </React.Fragment>
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
        <p className="text text_type_digits-medium mr-10">1 450<CurrencyIcon /></p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = { 
  data: PropTypes.arrayOf(
    PropTypes.shape(
      dataPropTypes.isRequired).isRequired)
};


export default BurgerConstructor;