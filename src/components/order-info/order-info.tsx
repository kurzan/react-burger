import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/';

export const OrderInfo = () => {
  return (
    <div className={styles.container} >
      <p className={"mb-10 text text_type_digits-default " + styles.number}>#034533</p>
      <p className="mb-3 text text_type_main-medium">Black Hole Singularity острый бургер</p>
      <p className="mb-15 text text_type_main-small">Выполнен</p>
      <p className="mb-6 text text_type_main-medium">Состав:</p>

      <div className={'mb-10 ' + styles.ingredients_box}>

      <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={styles.ingrediens_item} >
          <div className={styles.img_border} >
            <div className={styles.img_border_back}>
              <img className={styles.card_img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
            </div>
          </div>
          <p className={"text text_type_main-default " + styles.name}>Флюоресцентная булка R2-D3</p>
          <div className={styles.count}>
            <p className="text text_type_digits-default">2 х 20</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>

      <div className={styles.summary} >
        <p className="text text_type_text-default text_color_inactive">Сегодня, 16:20</p>
        <div className={styles.count}>
            <p className="text text_type_digits-default">510</p>
            <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
};