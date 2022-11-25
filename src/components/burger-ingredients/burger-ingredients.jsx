import React from "react";
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'

const tabs = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'},{id: 'main', title: 'Начинки'}];

const Tabs = () => {
  
  const [current, setCurrent] = React.useState('bun');
  
  return (
    
    <div className="mt-5 mb-10" style={{ display: 'flex' }}>
        {tabs.map(tabItem => (
          <Tab key={tabItem.id} value={tabItem.id} active={current === tabItem.id} onClick={setCurrent}>
            {tabItem.title}
          </Tab>
        ))}
    </div>
  )
}

const MenuElement = ({ingredients}) => {

  return (
    <div className={styles.menu_element}>
      <span className={styles.counter} ><Counter /></span>  
      <img className="ml-4 mr-4 mb-1" src={ingredients.image} alt={ingredients.name} />
      <div className={styles.price_wrapper}>
        <p className="text text_type_digits-default">{ingredients.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{ingredients.name}</p>
    </div>

  )
}

const Menu = ({data}) => {

  return (
    <>
      { tabs.map((item, i) => {
        const id = item.id;
        
          return (
            <div className={styles.menu} key={i}>   
              <p className="text text_type_main-medium" id={item.id}>{item.title}</p>
              <ul className={styles.menu_wrapper}>
                {data.map((item, i) => {
                  if(item.type === id) {
                  return <MenuElement key={i} ingredients={item}/>
                  }

                  return null;
                  })}
              </ul>
            </div>  
          )
        })}
    </>
  )
}

const BurgerIngredients = ({data}) => {
  return (
    <section className={styles.build_burger}>
      <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <div className={styles.menu_container}>
        <Menu data={data} />
      </div>
    </section>

  )

}

BurgerIngredients.propTypes = { 
  data: PropTypes.arrayOf(PropTypes.shape({  
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })).isRequired,
};

export default BurgerIngredients;