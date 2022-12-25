import React, { useState, useCallback } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { Link, useHistory } from 'react-router-dom';
import { loginning } from "../../services/actions/login";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/modal/modal";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [email, setEmail] = useState('')
  const onChange = e => {
    setEmail(e.target.value)
  }

  const { status, loginFailure } = useSelector(store => store.loginReducer);

  const onLoginClick = () => {
    dispatch(loginning(email, password, history));
  }

  return (
    <>
      { loginFailure && <Modal title={status} /> }
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
        </div>
        <div className="mb-20">
          <Button htmlType="button" type="primary" size="medium" onClick={() => onLoginClick()} disabled={ email && password ? false : true }>
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вы новый пользователь? <Link to={{ pathname: '/register' }} className={styles.link}>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={{ pathname: '/forgot-password' }} className={styles.link} >Восстановить пароль</Link></p>
      </div>
    </>
  );
};
