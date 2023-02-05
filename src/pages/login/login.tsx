import React, { FormEvent } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { loginning } from "../../services/actions/user";
import { useSelector, useDispatch } from '../../hooks/hooks';
import { TLocationWithFrom } from "../../services/types/types";
import { useForm } from "../../hooks/useForms";
import { TFormUser } from "../../services/types/types";

export const Login = () => {
  const { user } = useSelector((store) => store.userReducer);

  const {values, handleChange} = useForm<TFormUser>({});

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocationWithFrom>();

  const inputRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
    alert('Icon Click Callback')
  }


  const { status, loginFailure } = useSelector((store) => store.userReducer);

  const onLoginClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginning(values, history));
  }

  return (
    <>
      { user ? <Redirect to={ location.state?.from || '/' } /> : 
      <form onSubmit={onLoginClick} className={styles.login}>
        <p className="mt-20 mb-6 text text_type_main-medium">Вход</p>
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
          type={'text'}
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={'ShowIcon'}
          value={values.password || ''}
          name={'password'}
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
          <Button htmlType="submit" type="primary" size="medium" disabled={ values.email && values.password ? false : true }>
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вы новый пользователь? <Link to={{ pathname: '/register' }} className={styles.link}>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={{ pathname: '/forgot-password' }} className={styles.link} >Восстановить пароль</Link></p>
      </form>}
    </>
  );
};
