import React, { useEffect, useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo, logout } from '../../services/actions/user';

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email, status } = useSelector(store => store.userReducer.user);
  const { editUserSuccess } = useSelector(store => store.userReducer);
  
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(getUserInfo());

    if (name && email) {
      setState({...state, name: name, email: email})
    }
  }, [dispatch, name, email]);

  const hadleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    })
  };

  const postForm = (e) => {
    e.preventDefault();

    dispatch(updateUserInfo(state));
  };

  const cancelEdit = () => {
    setState({...state, name: name, email: email, password: ''});
  };

  return (
    <div className={'mt-20 ' + styles.profile}>
      <div className={styles.sidebar}>
        <div className="mb-20">
          <NavLink exact={true} className={styles.link} to={{ pathname: '/profile' }} activeClassName={styles.link_active}><p>Профиль</p></NavLink>
          <NavLink exact={true} className={styles.link} to={{ pathname: '/profile/orders' }} activeClassName={styles.link_active}>История заказов</NavLink>
          <NavLink exact={true} className={styles.link} to={{ pathname: '/login' }}  onClick={() => dispatch(logout(history))} activeClassName={styles.link_active}>Выход</NavLink>
        </div>
        <p className={"text text_type_main-default text_color_inactive " + styles.info}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>

      <form onSubmit={postForm} className={styles.client_details}>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          value={state.name}
          name='name'
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          onChange={hadleInputChange}
        />
        <Input 
          type={'text'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          value={state.email}
          name='email'
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          onChange={hadleInputChange}
        />
        <Input 
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={state.password}
          name='password'
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          onChange={hadleInputChange}
        />
        { state.name !== name || state.email !== email ?
        <div className={styles.buttons_box}>
          <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
            Сохранить
          </Button>
          <Button htmlType="button" type="secondary" size="small" onClick={cancelEdit}>
            Отмена
          </Button>
        </div>
        : null }
        { editUserSuccess && <p>Данные успешно обновленны</p> }
      </form>
    </div>
  );
};