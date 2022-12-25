import React, { useEffect, useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, logout } from '../../services/actions/user';

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(store => store.userReducer);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch])

  // const [name, setName] = useState('');
  // const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={'mt-20 ' + styles.profile}>
      <div className={styles.sidebar}>
        <div className="mb-20">
          <NavLink exact={true} className={styles.link} to={{ pathname: '/profile' }} activeClassName={styles.link_active}><p>Профиль</p></NavLink>
          <NavLink exact={true} className={styles.link} to={{ pathname: '/orders' }} activeClassName={styles.link_active}>История заказов</NavLink>
          <NavLink exact={true} className={styles.link} to={{ pathname: '/' }}  onClick={() => dispatch(logout(history))} activeClassName={styles.link_active}>Выход</NavLink>
        </div>
        <p className={"text text_type_main-default text_color_inactive " + styles.info}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>

      <div className={styles.client_details}>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          value={user.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <Input 
          type={'text'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          value={user.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <Input 
          type={'text'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

      </div>
    </div>
  );
};