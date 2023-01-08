import React, { ChangeEvent, useState } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { registerUser } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux'; 
import { TLocationWithFrom } from "../../utils/types";

export const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationWithFrom>();

  const { user, status, registerFailure, registerSuccess, registerRequest } = useSelector((store: any) => store.userReducer);

  const [email, setEmail] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')
  const inputPasswordRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => {
      if (inputPasswordRef.current) {
        inputPasswordRef.current.focus()
      }
    }, 0)
    alert('Icon Click Callback')
  }

  const [name, setName] = React.useState('')
  const inputNameRef = React.useRef(null)

  const postRegister = () => {
    // @ts-ignore
    dispatch(registerUser(name, email, password));
  };

  return (
    <>
      { user ? <Redirect to={ location.state?.from || '/' } /> : 
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
          type={'password'}
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
        { registerFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
        { registerRequest && <p className="text text_type_main-default">{status}</p>}
        { registerSuccess && <p className="text text_type_main-default">{status}</p>}
        </div>
        <div className="mb-20">
          <Button htmlType="button" disabled={ name && email && password ? false : true} type="primary" size="medium" onClick={() => postRegister()}>
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
      </div>
      }
    </>
  );
};
