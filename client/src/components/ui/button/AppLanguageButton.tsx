import { FC } from 'react'
import styles from '../../../styles/components/ui/button/AppLanguageButton.module.scss'
import { default as ArrowSvg } from '../../../assets/svgs/arrow_up.svg?react'

interface Props {
    languageName: string
    languageCountryCode: string
    onClick: () => void
}

const AppLanguageButton: FC<Props> = ({ languageName, languageCountryCode, onClick }) => {
    const flagUrl = `https://flagcdn.com/20x15/${languageCountryCode}.png`

    return (
        <button className={styles.LngButton} onClick={onClick}>
            <div className={styles.LngButton__content}>
                <img src={flagUrl} className={styles.LngButton__icon} />
                <h3 className={styles.LngButton__text}>{languageName}</h3>
                <ArrowSvg width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
            </div>
        </button>
    )
}

export default AppLanguageButton