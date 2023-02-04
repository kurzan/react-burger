import React, { FormEvent } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { postResetPassword } from "../../services/actions/reset-password"; 
import { TLocationWithFrom } from "../../services/types/types";
import { useForm } from "../../hooks/useForms";

export const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation<TLocationWithFrom>();

  const dispatch = useDispatch();

  const { resetFailure, resetSuccess, fargotSuccess, resetRequest, status } = useSelector((store) => store.resetPasswordReducer);

  const {values, handleChange} = useForm({});

  const inputPasswordRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => {
      if (inputPasswordRef.current) {
        inputPasswordRef.current.focus()
      }
    }, 0)
    alert('Icon Click Callback')
  }

  const inputNameRef = React.useRef<HTMLInputElement>(null)

  const postNewPassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(postResetPassword(values.password, values.emailCode, history))
  }

  return (
    <>
      { !fargotSuccess ? <Redirect to={ location.state?.from || '/' } /> : 
      <form onSubmit={postNewPassword} className={styles.login}>
        <p className="mt-20 mb-6 text text_type_main-medium">Восстановление пароля</p>

        <div className="mb-6"> 
        <Input 
          type={'text'}
          placeholder={'Введите новый пароль'}
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
        </div>

        <div className="mb-6"> 
        <Input 
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.emailCode || ''}
          name={'emailCode'}
          error={false}
          ref={inputNameRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        { resetFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
        { resetRequest && <p className="text text_type_main-default">{status}</p>}
        { resetSuccess && <p className="text text_type_main-default">{status}</p>}
        </div>

        <div className="mb-20">
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
      </form>
      }
    </>

  );
};
