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
    // dialog states
    const [isForeignDialogHidden, setIsForeignDialogHidden] = useState(true)
    const [isNativeDialogHidden, setIsNativeDialogHidden] = useState(true)
    const [foreignLanguage, setForeignLanguage] = useState<[string, string] | null>(null)
    const [nativeLanguage, setNativeaLanguage] = useState<[string, string] | null>(null)

    const continueClickHandler = () => {
        setProgress(progress + 30)
    }

    const onSelectedForeignLngHandler = (countryCode: string, name: string) => {
        setForeignLanguage([countryCode, name])
        console.log(countryCode, name) //  DEV!
    }

    const onSelectedNativeLngHandler = (countryCode: string, name: string) => {
        setNativeaLanguage([countryCode, name])
        console.log(countryCode, name) //  DEV!
    }

    const nativeClickHandler = () => {
        setIsNativeDialogHidden(false)
    }

    const toLearnClickHandler = () => {
        setIsForeignDialogHidden(false)
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
                            name: foreignLanguage?.[1] ?? '',
                            countryCode: foreignLanguage?.[0] ?? ''
                        }} onClick={toLearnClickHandler} />
                    </div>
                    {/* native dropbox */}
                    <div className={nativeBlockStyle}>
                        <h4 className={styles.NativeBlock__languageTitle}>Your native Language</h4>
                        <LanguageRoundButton language={{
                            name: nativeLanguage?.[1] ?? '',
                            countryCode: nativeLanguage?.[0] ?? ''
                        }} onClick={nativeClickHandler} />
                    </div>
                </div>
                <RoundButton text='CONTINUE' onClick={continueClickHandler} />
            </div>
            {/* disabled already selected languages (disabledLanguages prop) */}
            <DeckLanguageDialog
                disabledLanguages={nativeLanguage ? [nativeLanguage] : []}
                isHidden={isForeignDialogHidden}
                setIsHidden={setIsForeignDialogHidden}
                onSelectedLng={onSelectedForeignLngHandler} />
            <DeckLanguageDialog
                disabledLanguages={foreignLanguage ? [foreignLanguage] : []}
                isHidden={isNativeDialogHidden}
                setIsHidden={setIsNativeDialogHidden}
                onSelectedLng={onSelectedNativeLngHandler} />
        </div>
    )
}

export default Registration