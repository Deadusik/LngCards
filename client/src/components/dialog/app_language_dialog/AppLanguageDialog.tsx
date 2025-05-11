import styles from '../../../styles/components/dialog/app_language_dialog/AppLanguageDialog.module.scss'
import LanguageButton from './LanguageButton'

const AppLanguageDialog = () => {
    return (
        <div className={styles.LngDialog}>
            <div className={styles.Card}>
                <div className={styles.Card__content}>
                    <LanguageButton name='English' contryCode='gb' />
                    <LanguageButton name='Ukranian' contryCode='ua' />
                    <LanguageButton name='French' contryCode='fr' />
                    <LanguageButton name='German' contryCode='de' />
                </div>
            </div>
        </div>
    )
}

export default AppLanguageDialog