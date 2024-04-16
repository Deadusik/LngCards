import styles from '../../styles/components/calendar/Calendar.module.scss'
import RoundButton from '../ui/button/RoundButton'
import CalendarItem from './CalendarItem'

const Calendar = () => {
    const ClickHendler = () => {
        console.log('start click hendeler')
    }

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
                <div className={styles.mainBlock__buttonBlock}>
                    <RoundButton
                        text='START'
                        onClick={ClickHendler} />
                </div>
            </div>
        </div>
    )
}

export default Calendar