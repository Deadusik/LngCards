import { FC } from 'react'
import styles from '../../../styles/components/dialog/app_language/LanguageButton.module.scss'
import { AppLanguage } from '../../../utils/interfaces'
import { SPACE } from '../../../utils/constants'

interface Props {
    appLng: AppLanguage
    isActive?: boolean
    onClick: () => void
}

const LanguageButton: FC<Props> = ({ appLng, isActive = true, onClick }) => {
    const flagUrl = `https://flagcdn.com/20x15/${appLng.countryCode}.png`
    const buttonStyle = isActive ?
        styles.LngButton
        :
        [styles.LngButton, styles.LngButton_disabled].join(SPACE)

    return (
        <button onClick={onClick} className={buttonStyle}>
            <img className={styles.LngButton__icon} src={flagUrl} />
            <p className={styles.LngButton__text}>{appLng.name}</p>
        </button>
    )
}

export default LanguageButton