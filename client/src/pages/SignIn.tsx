import styles from '../styles/pages/SignIn.module.scss'
import { useNavigate } from 'react-router-dom'
import { START } from '../router/paths'
// assets 
import { default as Google } from '../assets/svgs/social/google.svg?react'
import { default as Email } from '../assets/svgs/social/email.svg?react'
import { default as Arrow } from '../assets/svgs/arrow_up.svg?react'
import bgSrc from '../assets/imgs/start-bg.png'
//components
import AppLanguageButton from '../components/ui/button/AppLanguageButton'
import IconButton from '../components/ui/button/IconButton'
import SignInButton from '../components/ui/button/SignInButton'
import AppTitle from '../components/visuals/AppTitle'
import { useState } from 'react'
import AppLanguageDialog from '../components/dialog/app_language/AppLanguageDialog'
import { AppLanguage } from '../utils/interfaces'

const SignIn = () => {
    const navigate = useNavigate()
    const [isLngDialogHidden, setIsLngDialogHidden] = useState<boolean>(true)
    const [selectedLng, setSelectedLng] = useState<AppLanguage>({ name: 'English', countryCode: 'gb' })

    const signInGoogleHandler = () => {
        // dev note: sign in with google logic
    }

    const signInEmailHandler = () => {
        // dev note: sign in with email logic
    }

    const onSelectedLng = (name: string, countryCode: string) => {
        setSelectedLng({ name, countryCode })
        // dev note: set global state for app language here
    }

    const onLanguageClick = () => {
        setIsLngDialogHidden(false)
    }

    return (
        <div className={styles.SignIn}>
            <div className={styles.SignIn__content}>
                { /* nabar block */}
                <div className={styles.SignIn__navbarBlock}>
                    <div className={styles.SignIn__backButton}>
                        <IconButton
                            onClick={() => navigate(START)}
                            content={Arrow}
                            transform='rotate(-90deg)'
                            triggerSize='40px' />
                    </div>
                    <AppLanguageButton
                        onClick={onLanguageClick}
                        appLng={{
                            name: selectedLng.name,
                            countryCode: selectedLng.countryCode
                        }} />
                </div>
                { /* page decoration */}
                <div className={styles.SignIn__decorationBlock}>
                    <img src={bgSrc} className={styles.SignIn__decorationImg} />
                    <AppTitle />
                    <p className={styles.SignIn__decorationText}>Add words from anywhere, never forget them</p>
                </div>
                { /* sign in buttons block */}
                <div className={styles.SignIn__socialBlock}>
                    <SignInButton
                        title='CONTINUE WITH GOOGLE'
                        SvgComponent={Google}
                        onClick={signInGoogleHandler} />
                    <SignInButton
                        title='CONTINUE WITH EMAIL'
                        SvgComponent={Email}
                        onClick={signInEmailHandler} />
                </div>
            </div>
            <AppLanguageDialog
                isHidden={isLngDialogHidden}
                setIsHidden={setIsLngDialogHidden}
                onSelectedLng={onSelectedLng} />
        </div>
    )
}

export default SignIn