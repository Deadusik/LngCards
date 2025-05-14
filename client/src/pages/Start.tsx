import { useState } from 'react'
import styles from '../styles/pages/Start.module.scss'
import bgSrc from '../assets/imgs/start-bg.png'
import { AppLanguage } from '../utils/interfaces'
// components
import AppTitle from '../components/visuals/AppTitle'
import AppLanguageButton from '../components/ui/button/AppLanguageButton'
import RoundButton from '../components/ui/button/RoundButton'
import AppLanguageDialog from '../components/dialog/app_language_dialog/AppLanguageDialog'


const Start = () => {
    const [isLngDialogHidden, setIsLngDialogHidden] = useState<boolean>(true)
    const [selectedLng, setSelectedLng] = useState<AppLanguage>({ name: 'English', countryCode: 'gb' })

    const onLanguageClick = () => {
        setIsLngDialogHidden(false)
    }

    const onSelectedLng = (name: string, countryCode: string) => {
        setSelectedLng({ name, countryCode })
        // dev note: set global state for app language here
    }

    return (
        <div className={styles.Start}>
            <div className={styles.Start__content}>
                <AppLanguageButton
                    onClick={onLanguageClick}
                    languageName={selectedLng.name}
                    languageCountryCode={selectedLng.countryCode} />
                <div className={styles.Start__centerBlock}>
                    <AppTitle />
                    <img src={bgSrc} className={styles.Start__contentImage} />
                    <h3 className={styles.Start__textInfo}>Effective vocabulary learning</h3>
                </div>
                <div className={styles.Start__bottomBlock}>
                    <RoundButton text='I ALREADY HAVE AN ACCOUNT' isInverted={true} onClick={() => { }} />
                    <RoundButton text='CONTINUE' onClick={() => { }} />
                </div>
            </div>
            <AppLanguageDialog
                isHidden={isLngDialogHidden}
                setIsHidden={setIsLngDialogHidden}
                onSelectedLng={onSelectedLng} />
        </div>
    )
}

export default Start