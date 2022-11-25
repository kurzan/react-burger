import React from "react";
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/types.js'
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

MenuElement.propTypes = {
  ingredients: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
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

Menu.propTypes = { 
  data: dataPropTypes.isRequired
};

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
  data: dataPropTypes.isRequired
};


export default BurgerIngredients;