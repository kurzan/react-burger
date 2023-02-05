import React, { FC, useState } from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom';

type TNavItemProps = {
  Icon: any;
  text: string;
  to: string;
};

const NavItem: FC<TNavItemProps> = ({Icon, text, to}) => {
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();

  const iconHandle = () => {
    setIsActive(!isActive);
  }
    
    return (
      <NavLink exact={true} to={to} className={'p-5 mr-2 ' + styles.nav_item} activeClassName={styles.nav_item__active} onMouseEnter={iconHandle} onMouseLeave={iconHandle} >
        <div className="pr-2"><Icon type={ isActive || location.pathname === to ? 'primary' : 'secondary'} /></div>
        <p className="text text_type_main-default">{text}</p>
      </NavLink>
    )
}

const AppHeader = () => {
  
    return (
          <header className={'pt-4 pb-4 ' + styles.header}>
          <div className={styles.container}>
            <nav className={styles.menu}>
                <NavItem Icon={BurgerIcon} text={'Конструктор'} to={'/'}/>
                <NavItem Icon={ListIcon} text={'Лента заказов'} to={'/feed'}/>
            </nav>
            <div className={styles.logo}>
              <Logo />
            </div>
            <nav className={styles.user_menu}>
                <NavItem Icon={ProfileIcon} text={'Личный кабинет'} to={'/profile'}/>
            </nav>
          </div>
        </header>
    )
  }

export default AppHeader;