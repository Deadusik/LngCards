import styles from '../../styles/components/calendar/CalendarItem.module.scss'
import { SPACE } from '../../utils/constants'

const CalendarItem = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__dataBlock}>
                    <div className={styles.mainBlock__dateBlock}>
                        <p className={styles.mainBlock__date}>Today</p>
                    </div>
                    { /* Info block */}
                    <div className={[
                        styles.mainBlock__infoBlock,
                        styles.info
                    ].join(SPACE)}>
                        <div className={styles.info__content}>
                            <div className={styles.info__col}>
                                <p className={styles.info__label}>Added:</p>
                                <p className={styles.info__label}>Checked:</p>
                            </div>
                            <div className={styles.info__col}>
                                <p className={styles.info__count}>22</p>
                                <p className={styles.info__count}>-</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className={styles.mainBlock__divider} />
            </div>
        </div>
    )
}

export default CalendarItem