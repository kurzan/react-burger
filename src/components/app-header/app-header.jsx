import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'


const NavItem = (props) => {
    
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#" className={'p-5 mr-2 ' + styles.nav_item}>
        <div className="pr-2">{props.icon}</div>
        <p className="text text_type_main-default">
              {props.text}
            </p>
      </a>
    )

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