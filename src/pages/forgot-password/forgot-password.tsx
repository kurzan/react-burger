import React, { ChangeEvent, useState } from "react";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getForgotPassword } from '../../services/actions/reset-password';
import { TLocationWithFrom } from "../../services/types/types";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation<TLocationWithFrom>();
  const { user } = useSelector((store) => store.userReducer);
  const { forgotRequest, forgotFailed, status } = useSelector((store) => store.resetPasswordReducer);

  const [email, setEmail] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const postForgotRequest = () => {
    dispatch(getForgotPassword(email, history))
  }

  return (
    <>
      { user ? <Redirect to={ location.state?.from || '/' } /> : 
      <div className={styles.login}>
        <p className="mt-20 mb-6 text text_type_main-medium">Восстановление пароля</p>
        <div className="mb-6" style={{ display: 'flex', flexDirection: 'column' }}>
          <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            isIcon={false}
            placeholder={'Укажите e-mail'}
          />
        </div>
        { forgotFailed && <p className="text text_type_main-default text_color_error">{status}</p>}
        { forgotRequest && <p className="text text_type_main-default">{status}</p>}
        <div className="mb-20 mt-4">
          <Button htmlType="button" disabled={ email ? false : true } type="primary" size="medium" onClick={() => postForgotRequest()}>
          Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
      </div>
      }
    </>
  );
};
