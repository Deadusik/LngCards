import styles from '../styles/pages/Registration.module.scss'
import { useState } from 'react'
import { SPACE } from '../utils/constants'
// components
import LanguageRoundButton from '../components/dialog/deck_language/LanguageRoundButton'
import RoundButton from '../components/ui/button/RoundButton'
import ProgressBar from '../components/ui/info/ProgressBar'
import DeckLanguageDialog from '../components/dialog/deck_language/DeckLanguageDialog'


const Registration = () => {
    const [progress, setProgress] = useState(10)
    const [isLngDialogHidden, setIsLngDialogHidden] = useState(true)

    const continueClickHandler = () => {
        setProgress(progress + 30)
    }

    const onSelectedLanguageHandler = (name: string, countryCode: string) => {
        console.log(name, countryCode)
    }

    const nativeClickHandler = () => {
        setIsLngDialogHidden(false)
    }

    const toLearnClickHandler = () => {
        setIsLngDialogHidden(false)
    }

    const isToNativeProgress = progress >= 40
    const toLearnBlockStyle = isToNativeProgress ? [styles.ToLearnBlock, styles.ToLearnBlock_moveAnim].join(SPACE) : styles.ToLearnBlock
    const nativeBlockStyle = isToNativeProgress ? styles.NativeBlock : styles.NativeBlock_hidden

    return (
        <div className={styles.Registration}>
            <div className={styles.Registration__content}>
                <ProgressBar progress={progress} />
                <div className={styles.Registration__centerBlock}>
                    {/* to learn dropbox */}
                    <div className={toLearnBlockStyle}>
                        <h4 className={styles.ToLearnBlock__languageTitle}>Language you want to learn</h4>
                        <LanguageRoundButton language={{
                            name: 'English',
                            countryCode: 'gb'
                        }} onClick={toLearnClickHandler} />
                    </div>
                    {/* native dropbox */}
                    <div className={nativeBlockStyle}>
                        <h4 className={styles.NativeBlock__languageTitle}>Your native Language</h4>
                        <LanguageRoundButton language={{
                            name: 'Ukranian',
                            countryCode: 'ua'
                        }} onClick={nativeClickHandler} />
                    </div>
                </div>
                <RoundButton text='CONTINUE' onClick={continueClickHandler} />
            </div>
            <DeckLanguageDialog
                isHidden={isLngDialogHidden}
                setIsHidden={setIsLngDialogHidden}
                onSelectedLng={onSelectedLanguageHandler} />
        </div>
    )
}

export default Registration