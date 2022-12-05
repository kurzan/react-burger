import React from "react";
import PropTypes from 'prop-types';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'


const NavItem = ({Icon, text}) => {
  const [isActive, setIsActive] = React.useState(false);

  const iconHandle = () => {
    setIsActive(!isActive);
  }
    
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#" className={'p-5 mr-2 ' + styles.nav_item} onMouseEnter={iconHandle} onMouseLeave={iconHandle}>
        <div className="pr-2"><Icon type={ isActive ? 'primary' : 'secondary'} /></div>
        <p className="text text_type_main-default">
              {text}
            </p>
      </a>
    )

}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
}

const AppHeader = () => {
  
    return (
      <header className={'pt-4 pb-4 ' + styles.header}>
        <div className={styles.container}>
          <nav className={styles.menu}>
              <NavItem Icon={BurgerIcon} text={'Конструктор'}/>
              <NavItem Icon={ListIcon} text={'Лента заказов'}/>
          </nav>
          <div className={styles.logo}>
            <Logo />
          </div>
          <nav className={styles.user_menu}>
              <NavItem Icon={ProfileIcon} text={'Личный кабинет'} />
          </nav>
        </div>
      </header>
    )
  }

export default AppHeader;