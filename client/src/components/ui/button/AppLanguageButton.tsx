import { FC } from 'react'
import styles from '../../../styles/components/ui/button/AppLanguageButton.module.scss'
import { default as ArrowSvg } from '../../../assets/svgs/arrow_up.svg?react'
import { AppLanguage } from '../../../utils/interfaces'

interface Props {
    appLng: AppLanguage
    onClick: () => void
}

const AppLanguageButton: FC<Props> = ({ appLng, onClick }) => {
    const flagUrl = `https://flagcdn.com/20x15/${appLng.countryCode}.png`

    return (
        <button className={styles.LngButton} onClick={onClick}>
            <div className={styles.LngButton__content}>
                <img src={flagUrl} className={styles.LngButton__icon} />
                <h3 className={styles.LngButton__text}>{appLng.name}</h3>
                <ArrowSvg width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
            </div>
        </button>
    )
}

export default AppLanguageButton