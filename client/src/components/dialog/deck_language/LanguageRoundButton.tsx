import { FC } from 'react'
import styles from '../../../styles/components/dialog/deck_language/LanguageRoundButton.module.scss'
import { AppLanguage } from '../../../utils/interfaces'
import { default as ArrowSvg } from '../../../assets/svgs/arrow_up.svg?react'

interface Props {
    language: AppLanguage
    onClick: () => void
}

const LanguageRoundButton: FC<Props> = ({ language, onClick }) => {
    const flagUrl = `https://flagcdn.com/20x15/${language.countryCode}.png`

    return (
        <button className={styles.LngButton} onClick={onClick}>
            <div className={styles.LngButton__languageBlock}>
                <img className={styles.LngButton__icon} src={flagUrl} />
                <p className={styles.LngButton__text}>{language.name}</p>
            </div>
            <ArrowSvg width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
    )
}

export default LanguageRoundButton