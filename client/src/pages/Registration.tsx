import styles from '../styles/pages/Registration.module.scss'
// components
import LanguageRoundButton from '../components/ui/button/LanguageRoundButton'
import RoundButton from '../components/ui/button/RoundButton'
import ProgressBar from '../components/ui/info/ProgressBar'
import { useState } from 'react'
import { SPACE } from '../utils/constants'

const Registration = () => {
    const [progress, setProgress] = useState(10)

    const continueClickHandler = () => {
        setProgress(progress + 30)
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
                        }} />
                    </div>
                    {/* native dropbox */}
                    <div className={nativeBlockStyle}>
                        <h4 className={styles.NativeBlock__languageTitle}>Your native Language</h4>
                        <LanguageRoundButton language={{
                            name: 'Ukranian',
                            countryCode: 'ua'
                        }} />
                    </div>
                </div>
                <RoundButton text='CONTINUE' onClick={continueClickHandler} />
            </div>
        </div>
    )
}

export default Registration