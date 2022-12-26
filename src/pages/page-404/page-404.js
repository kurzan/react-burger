import styles from './page-404.module.css';
import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div className={styles.container}>
      <p className="mt-20 text text_type_main-large">Ошибка 404</p>
      <p className="text text_type_main-medium">Страница не найдена</p>
      <Link to='/'>Перейти на главную</Link>
    </div>
  )
};
