import React, { useState } from "react";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {
    const [email, setEmail] = useState('')
    const onChange = e => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }

    return (
        <>
            <p>Вход</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            isIcon={false}
            />
            </div>
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
            <Button htmlType="button" type="primary" size="medium">
                Нажми на меня
            </Button>
        </>

    );
};
