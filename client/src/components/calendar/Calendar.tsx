import styles from '../../styles/components/calendar/Calendar.module.scss'
import CalendarItem from './CalendarItem'

const Calendar = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__listBlock}>
                    <CalendarItem />
                    <CalendarItem />
                    <CalendarItem />

                    <CalendarItem />
                    <CalendarItem />
                </div>
            </div>
        </div>
    )
}

export default Calendar