import { FC } from 'react'
import styles from '../../../styles/components/dialog/app_language_dialog/LanguageButton.module.scss'

interface Props {
    name: string
    contryCode: string
}

const LanguageButton: FC<Props> = ({ name, contryCode }) => {
    const flagUrl = `https://flagcdn.com/20x15/${contryCode}.png`

    return (
        <button className={styles.LngButton}>
            <img className={styles.LngButton__icon} src={flagUrl} />
            <p className={styles.LngButton__text}>{name}</p>
        </button>
    )
}

export default LanguageButton