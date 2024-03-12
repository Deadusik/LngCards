import styles from '../../styles/components/ui/Battery.module.scss'

const Battery = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__cap}></div>
                <div className={styles.mainBlock__body}></div>
                <div className={styles.mainBlock__progress}></div>
            </div>
        </div>
    )
}

export default Battery