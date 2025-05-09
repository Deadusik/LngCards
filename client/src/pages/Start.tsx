import AppTitle from '../components/visuals/AppTitle'
import styles from '../styles/pages/Start.module.scss'
import bgSrc from '../assets/imgs/start-bg.png'
import AppLanguageButton from '../components/ui/button/AppLanguageButton'
import RoundButton from '../components/ui/button/RoundButton'

const Start = () => {
    return (
        <div className={styles.Start}>
            <div className={styles.Start__content}>
                <AppLanguageButton
                    languageName='English'
                    languageCountryCode='gb' />
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
        </div>
    )
}

export default Start