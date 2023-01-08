import React, { ChangeEvent, useState } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { loginning } from "../../services/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { TLocationWithFrom } from "../../utils/types";

export const Login = () => {
  const { user } = useSelector((store: any) => store.userReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocationWithFrom>();

  const [password, setPassword] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
    alert('Icon Click Callback')
  }

  const [email, setEmail] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const { status, loginFailure } = useSelector((store: any) => store.userReducer);

  const onLoginClick = () => {
    //@ts-ignore
    dispatch(loginning(email, password, history));
  }

  return (
    <>
      { user ? <Redirect to={ location.state?.from || '/' } /> : 
      <div className={styles.login}>
        <p className="mt-20 mb-6 text text_type_main-medium">Вход</p>
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
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        { loginFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
        </div>
        <div className="mb-20">
          <Button htmlType="button" type="primary" size="medium" onClick={() => onLoginClick()} disabled={ email && password ? false : true }>
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вы новый пользователь? <Link to={{ pathname: '/register' }} className={styles.link}>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={{ pathname: '/forgot-password' }} className={styles.link} >Восстановить пароль</Link></p>
      </div>}
    </>
  );
};
