import React, { useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = React.useState('')
  const inputPasswordRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [name, setName] = React.useState('')
  const inputNameRef = React.useRef(null)

  return (
    <div className={styles.login}>
      <p className="mt-20 mb-6 text text_type_main-medium">Восстановление пароля</p>

      <div className="mb-6"> 
      <Input 
        type={'text'}
        placeholder={'Введите новый пароль'}
        onChange={e => setPassword(e.target.value)}
        icon={'ShowIcon'}
        value={password}
        name={'name'}
        error={false}
        ref={inputPasswordRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      </div>

      <div className="mb-6"> 
      <Input 
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        ref={inputNameRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      </div>

      <div className="mb-20">
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
    </div>
  );
};
