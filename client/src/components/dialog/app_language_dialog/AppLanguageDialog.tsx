import { FC } from 'react'
import styles from '../../../styles/components/dialog/app_language_dialog/AppLanguageDialog.module.scss'
import LanguageButton from './LanguageButton'

interface Props {
    isHidden: boolean
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
    onSelectedLng: (name: string, countryCode: string) => void
}

const AppLanguageDialog: FC<Props> = ({ isHidden, setIsHidden, onSelectedLng }) => {
    const dialogStyle = isHidden ? styles.LngDialog_hidden : styles.LngDialog

    const onBgClickHandler = () => {
        setIsHidden(true)
    }

    const onCardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const onSelectedLngHandler = (name: string, countryCode: string) => {
        onSelectedLng(name, countryCode)
        setIsHidden(true)
    }

    return (
        <div className={dialogStyle} onClick={onBgClickHandler}>
            <div className={styles.Card} onClick={e => onCardClickHandler(e)}>
                <div className={styles.Card__content}>
                    <LanguageButton
                        appLng={{
                            name: 'English',
                            countryCode: 'gb'
                        }}
                        onClick={() => onSelectedLngHandler('English', 'gb')} />
                    <LanguageButton
                        appLng={{
                            name: 'Ukranian',
                            countryCode: 'ua'
                        }}
                        onClick={() => onSelectedLngHandler('Ukranian', 'ua')} />
                    <LanguageButton
                        appLng={{
                            name: 'French',
                            countryCode: 'fr'
                        }}
                        onClick={() => onSelectedLngHandler('French', 'fr')} />
                    <LanguageButton
                        appLng={{
                            name: 'German',
                            countryCode: 'de'
                        }}
                        onClick={() => onSelectedLngHandler('German', 'de')} />
                </div>
            </div>
        </div>
    )
}

export default AppLanguageDialog