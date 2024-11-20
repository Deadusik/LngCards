import styles from '../../../styles/components/ui/dropbox/LanguageDropBox.module.scss'
import { default as ArrowSvg } from '../../../assets/svgs/arrow_up.svg?react'

const LanguageDropBox = () => {
    return (
        <div className={styles.LanguageDropBox}>
            <div className={styles.LanguageDropBox__content}>
                { /* button to open/close menu */}
                <button className={styles.LanguageDropBox__button}>
                    <img className={styles.LanguageDropBox__flag} />
                    <h1 className={styles.LanguageDropBox__label}>
                        Text
                    </h1>
                    <div className={styles.LanguageDropBox__arrow}>
                        <ArrowSvg />
                    </div>
                </button>
                { /* dropbox menu */}
                <div className={styles.Menu}>
                    <div className={styles.Menu__item}>

                    </div>
                    <div className={styles.Menu__item}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguageDropBox