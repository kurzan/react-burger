import React, { useState } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('')
  const onChange = e => {
    setEmail(e.target.value)
  }

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
      <p className="mt-20 mb-6 text text_type_main-medium">Регистрация</p>
      <div className="mb-6"> 
      <Input 
        type={'text'}
        placeholder={'Имя'}
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
      <div className="mb-6" style={{ display: 'flex', flexDirection: 'column' }}>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
        />
      </div>
      <div className="mb-6"> 
      <Input 
        type={'text'}
        placeholder={'Пароль'}
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
      <div className="mb-20">
        <Button htmlType="button" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
    </div>
  );
};
