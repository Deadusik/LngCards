import styles from '../../../styles/components/ui/button/FloatingButton.module.scss'
import plusSvgSrc from '../../../assets/svgs/plus.svg'

const FloatingButton = () => {
    return (
        <div className={styles.mainBlock}>
            <img
                className={styles.mainBlock__icon}
                src={plusSvgSrc}
                alt='plus' />
        </div>
    )
}

export default FloatingButton