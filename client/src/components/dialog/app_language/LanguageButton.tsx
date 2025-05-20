import { FC } from 'react'
import styles from '../../../styles/components/dialog/app_language/LanguageButton.module.scss'
import { AppLanguage } from '../../../utils/interfaces'

interface Props {
    appLng: AppLanguage
    onClick: () => void
}

const LanguageButton: FC<Props> = ({ appLng, onClick }) => {
    const flagUrl = `https://flagcdn.com/20x15/${appLng.countryCode}.png`

    return (
        <button onClick={onClick} className={styles.LngButton}>
            <img className={styles.LngButton__icon} src={flagUrl} />
            <p className={styles.LngButton__text}>{appLng.name}</p>
        </button>
    )
}

export default LanguageButton