import React from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postResetPassword } from "../../services/actions/reset-password"; 

export const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const { resetFailure, resetSuccess, fargotSuccess, resetRequest, status } = useSelector(store => store.resetPasswordReducer);

  const [password, setPassword] = React.useState('')
  const inputPasswordRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [emailCode, setEmailCode] = React.useState('')
  const inputNameRef = React.useRef(null)

  const postNewPassword = () => {
    dispatch(postResetPassword(password, emailCode, history))

  }

  return (
    <>
      { !fargotSuccess ? <Redirect to={ location.state?.from || '/' } /> : 
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
          onChange={e => setEmailCode(e.target.value)}
          value={emailCode}
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
          <Button htmlType="button" type="primary" size="medium" onClick={() => postNewPassword()}>
            Сохранить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
      </div>
      }
    </>

  );
};
