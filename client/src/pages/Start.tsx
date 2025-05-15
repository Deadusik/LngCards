import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/pages/Start.module.scss'
import bgSrc from '../assets/imgs/start-bg.png'
import { AppLanguage } from '../utils/interfaces'
import { REGISTRATION, SIGNIN } from '../router/paths'
// components
import AppTitle from '../components/visuals/AppTitle'
import AppLanguageButton from '../components/ui/button/AppLanguageButton'
import RoundButton from '../components/ui/button/RoundButton'
import AppLanguageDialog from '../components/dialog/app_language_dialog/AppLanguageDialog'



const Start = () => {
    const [isLngDialogHidden, setIsLngDialogHidden] = useState<boolean>(true)
    const [selectedLng, setSelectedLng] = useState<AppLanguage>({ name: 'English', countryCode: 'gb' })
    const navigate = useNavigate()

    const onLanguageClick = () => {
        setIsLngDialogHidden(false)
    }

    const onSelectedLng = (name: string, countryCode: string) => {
        setSelectedLng({ name, countryCode })
        // dev note: set global state for app language here
    }

    const signInHandler = () => {
        navigate(SIGNIN)
    }

    const registrationHandler = () => {
        navigate(REGISTRATION)
    }

    return (
        <div className={styles.Start}>
            <div className={styles.Start__content}>
                <AppLanguageButton
                    onClick={onLanguageClick}
                    appLng={{
                        name: selectedLng.name,
                        countryCode: selectedLng.countryCode
                    }} />
                <div className={styles.Start__centerBlock}>
                    <AppTitle />
                    <img src={bgSrc} className={styles.Start__contentImage} />
                    <h3 className={styles.Start__textInfo}>Effective vocabulary learning</h3>
                </div>
                <div className={styles.Start__bottomBlock}>
                    <RoundButton text='I ALREADY HAVE AN ACCOUNT' isInverted={true} onClick={signInHandler} />
                    <RoundButton text='CONTINUE' onClick={registrationHandler} />
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