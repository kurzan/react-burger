import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getUserInfo, updateUserInfo, logout } from '../../services/actions/user';
import OrdersList from '../../components/orders-list/orders-list';
import { USER_ORDERS_URL } from "../../utils/burger-ws";
import { connect as connectToOrders, disconnect as disconnectFromOrders } from "../../services/actions/ws-orders";
import { getCookie } from "../../utils/cookie"; 
import { useForm } from "../../hooks/useForms";

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectToOrders(`${USER_ORDERS_URL}?token=${getCookie('accessToken')?.replace('Bearer ','')}`))
    return () => {
      dispatch(disconnectFromOrders());
    }
  }, [])

  const location = useLocation<{background: Location}>();

  const { user } = useSelector((store) => store.userReducer);
  const { editUserSuccess } = useSelector((store) => store.userReducer);


  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    dispatch(getUserInfo());

    if (user?.name && user?.email) {
      setValues({...values, name: user.name, email: user.email})
    }

  }, [dispatch, user?.name, user?.email]);


  const postForm = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(values));
  };

  const cancelEdit = () => {
    setValues({...values, name: user?.name, email: user?.email, password: ''});
  };

  const logoutOnClick = () => {
    dispatch(logout())
  }


  return (

      <div className={'mt-20 ' + styles.profile}>
        <div className={styles.sidebar}>
          <div className="mb-20">
            <NavLink exact={true} className={styles.link} to={{ pathname: '/profile' }} activeClassName={styles.link_active}><p>Профиль</p></NavLink>
            <NavLink exact={true} className={styles.link} to={{ pathname: '/profile/orders' }} activeClassName={styles.link_active}>История заказов</NavLink>
            <NavLink exact={true} className={styles.link} to={{ pathname: '/login' }}  onClick={logoutOnClick} activeClassName={styles.link_active}>Выход</NavLink>
          </div>
          <p className={"text text_type_main-default text_color_inactive " + styles.info}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

            {location.pathname === '/profile' && <form onSubmit={postForm} className={styles.client_details}>
              <Input 
                type={'text'}
                placeholder={'Имя'}
                icon={'EditIcon'}
                value={values.name || ''}
                name='name'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
                onChange={handleChange}
              />
              <Input 
                type={'text'}
                placeholder={'Логин'}
                icon={'EditIcon'}
                value={values.email || ''}
                name='email'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
                onChange={handleChange}
              />
              <Input 
                type={'password'}
                placeholder={'Пароль'}
                icon={'EditIcon'}
                value={values.password || ''}
                name='password'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
                onChange={handleChange}
              />
              { values.name !== user?.name || values.email !== user?.email ?
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
            </form>}

            {location.pathname.startsWith('/profile/orders') && <div className={styles.orders_history} >
              <OrdersList isShow={true}/>
            </div>}

      </div>
  );
};