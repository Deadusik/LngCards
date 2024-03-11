import styles from '../../styles/components/dialog/CardMenuDialog.module.scss'
import { SPACE } from '../../utils/constants'
//svg srs
import penSvgSrc from '../../assets/svgs/pen.svg'
import resetSvgSrc from '../../assets/svgs/reset.svg'
import trashSvgSrc from '../../assets/svgs/trash.svg'

const CardMenuDialog = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__item}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_pen
                    ].join(SPACE)}
                        src={penSvgSrc} />
                    <p className={styles.mainBlock__text}>Edit</p>
                </div>
            </div>
            <div className={styles.mainBlock__item}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_reset
                    ].join(SPACE)}
                        src={resetSvgSrc} />
                    <p className={styles.mainBlock__text}>Reset</p>
                </div>
            </div>
            <div className={styles.mainBlock__item}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_trash
                    ].join(SPACE)}
                        src={trashSvgSrc} />
                    <p className={styles.mainBlock__text}>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default CardMenuDialog