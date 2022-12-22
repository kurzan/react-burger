import React, { useState } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const onChange = e => {
    setEmail(e.target.value)
  }

  return (
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
      <div className="mb-20">
        <Button htmlType="button" type="primary" size="medium">
        Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={{ pathname: '/login' }} className={styles.link}>Войти</Link></p>
    </div>
  );
};
