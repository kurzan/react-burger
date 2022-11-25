import React from "react";
import PropTypes from 'prop-types';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'


const NavItem = ({icon, text}) => {
    
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#" className={'p-5 mr-2 ' + styles.nav_item}>
        <div className="pr-2">{icon}</div>
        <p className="text text_type_main-default">
              {text}
            </p>
      </a>
    )

}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
}

const AppHeader = () => {
  
    return (
      <header className={'pt-4 pb-4 ' + styles.header}>
        <div className={styles.container}>
          <nav className={styles.menu}>
              <NavItem icon={<BurgerIcon type="active" />} text={'Конструктор'}/>
              <NavItem icon={<ListIcon type="secondary" />} text={'Лента заказов'}/>
          </nav>
          <div className={styles.logo}>
            <Logo />
          </div>
          <nav className={styles.user_menu}>
              <NavItem icon={<ProfileIcon type="secondary" />} text={'Личный кабинет'} />
          </nav>
        </div>
      </header>
    )
  }

export default AppHeader;