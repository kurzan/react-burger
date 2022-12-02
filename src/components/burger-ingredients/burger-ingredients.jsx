import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/types.js'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const tabs = [{id: 'bun', title: 'Булки'}, {id: 'sauce', title: 'Соусы'}, {id: 'main', title: 'Начинки'}];

const Tabs = () => {
  
  const [current, setCurrent] = React.useState('bun');

  useEffect(() => {
    const target = document.querySelector(`#${current}`);
    target.scrollIntoView();
  }, [current]);
  
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

const MenuElement = ({ingredient, onIngredientClick}) => {

  const onClick = () => {
    onIngredientClick(ingredient)
  }


  return (
    <div className={styles.menu_element} onClick={onClick} >
      <span className={styles.counter} ><Counter /></span>  
      <img className="ml-4 mr-4 mb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price_wrapper}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>

  )
}

MenuElement.propTypes = { 
  ingredient: PropTypes.shape(
      dataPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired
};

const Menu = ({data, onIngredientClick}) => {


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
                  return <MenuElement key={i} ingredient={item} onIngredientClick={onIngredientClick}/>
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
  data: PropTypes.arrayOf(
    PropTypes.shape(
      dataPropTypes.isRequired).isRequired),
  onIngredientClick: PropTypes.func.isRequired
};

const BurgerIngredients = ({data, onIngredientClick}) => {
  return (
    <section className={styles.build_burger}>
      <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <div className={styles.menu_container}>
        <Menu data={data} onIngredientClick={onIngredientClick}/>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = { 
  data: PropTypes.arrayOf(
    PropTypes.shape(
      dataPropTypes.isRequired).isRequired),
  onIngredientClick: PropTypes.func.isRequired
};


export default BurgerIngredients;