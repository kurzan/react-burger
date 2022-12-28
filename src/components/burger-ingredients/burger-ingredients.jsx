import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/types.js'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useInView } from 'react-intersection-observer';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MenuElement = ({ ingredient }) => {

  const location = useLocation();

  const { selectedIngredients, bun } = useSelector(store => store.selectedIngredientsReducer)

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {ingredient},

  });

  const allIngredients = [...selectedIngredients, bun ? bun : ''];

  const count = allIngredients.filter(item => item._id === ingredient._id).length

  return (
    <Link  to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location }}} className={styles.menu_element} ref={dragRef}>
      {count ? <span className={styles.counter} ><Counter count={count}/></span> : null}
      <img className="ml-4 mr-4 mb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price_wrapper}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </Link>

  )
}

MenuElement.propTypes = {
  ingredient: PropTypes.shape(
    dataPropTypes.isRequired).isRequired,
};


const BurgerIngredients = () => {

  const { ingredients } = useSelector(store => store.ingredientsReducer);


  const tabs = [{ id: 'bun', title: 'Булки' }, { id: 'sauce', title: 'Соусы' }, { id: 'main', title: 'Начинки' }];

  const [current, setCurrent] = useState('bun');
  
  const { ref: bunRef, inView: inBunView } = useInView();
  const { ref: sauceRef, inView: inSauceView } = useInView();
  const { ref: mainRef, inView: inMainView } = useInView();

  useEffect(() => {
    const target = document.querySelector(`#${current}`);
    target.scrollIntoView();

  }, [current]);

  useEffect(() => {
    if (inBunView) {
      setCurrent('bun')
    } else if (inSauceView) {
      setCurrent('sauce')
    } else if (inMainView) {
      setCurrent('main')
    }
  }, [inBunView, inSauceView, inMainView])

  return (
    <section className={styles.build_burger}>
      <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>

      <div className="mt-5 mb-10" style={{ display: 'flex' }}>
        {tabs.map(tabItem => (
          <Tab key={tabItem.id} value={tabItem.id} active={current === tabItem.id} onClick={setCurrent}>
            {tabItem.title}
          </Tab>
        ))}
      </div>
      <div className={styles.menu_container}>

        <div className={styles.menu} ref={bunRef}>
          <p className="text text_type_main-medium" id='bun'>Булки</p>
          <ul className={styles.menu_wrapper}>
            {ingredients.map((item) => {
              if (item.type === 'bun') {
                return <MenuElement key={item._id} ingredient={item} />
              }
              return null;
            })}
          </ul>
        </div>

        <div className={styles.menu} ref={sauceRef}>
          <p className="text text_type_main-medium" id='sauce'>Соусы</p>
          <ul className={styles.menu_wrapper}>
            {ingredients.map((item) => {
              if (item.type === 'sauce') {
                return <MenuElement key={item._id} ingredient={item} />
              }
              return null;
            })}
          </ul>
        </div>

        <div className={styles.menu} ref={mainRef}>
          <p className="text text_type_main-medium" id='main'>Начинки</p>
          <ul className={styles.menu_wrapper}>
            {ingredients.map((item) => {
              if (item.type === 'main') {
                return <MenuElement key={item._id} ingredient={item} />
              }
              return null;
            })}
          </ul>
        </div>
      </div>

    </section>
  )
}

export default BurgerIngredients;