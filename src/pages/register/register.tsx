import React, { FormEvent } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { registerUser } from '../../services/actions/user';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { TLocationWithFrom } from "../../services/types/types";
import { useForm } from "../../hooks/useForms";
import { TFormUser } from "../../services/types/types";


export const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationWithFrom>();

  const { user, status, registerFailure, registerSuccess, registerRequest } = useSelector((store) => store.userReducer);

  const {values, handleChange} = useForm<TFormUser>({});

  const inputPasswordRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => {
      if (inputPasswordRef.current) {
        inputPasswordRef.current.focus()
      }
    }, 0)
    alert('Icon Click Callback')
  }

  const inputNameRef = React.useRef(null)

  const postRegister = (e: FormEvent) => {
    e.preventDefault()
    dispatch(registerUser(values.name, values.email, values.password));
  };

  return (
    <>
      { user ? <Redirect to={ location.state?.from || '/' } /> : 
      <form onSubmit={postRegister} className={styles.login}>
        <p className="mt-20 mb-6 text text_type_main-medium">Регистрация</p>
        <div className="mb-6"> 
        <Input 
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name || ''}
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
            onChange={handleChange}
            value={values.email || ''}
            name={'email'}
            isIcon={false}
          />
        </div>
        <div className="mb-6"> 
        <Input 
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={'ShowIcon'}
          value={values.password || ''}
          name={'password'}
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
          <Button htmlType="submit" disabled={ values.name && values.email && values.password ? false : true} type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
      </form>
      }
    </>
  );
};
