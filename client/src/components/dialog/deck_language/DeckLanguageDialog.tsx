import { FC } from 'react'
import styles from '../../../styles/components/dialog/deck_language/DeckLanguageDialog.module.scss'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
// components
import LanguageButton from '../app_language/LanguageButton'
import Search from './Search'
import { GENERAL_COUNTRY_CODES, SECONDARY_COUNTRY_CODES } from '../../../utils/constants'


interface Props {
    isHidden: boolean
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
    onSelectedLng: (name: string, countryCode: string) => void
}

const DeckLanguageDialog: FC<Props> = ({ isHidden, setIsHidden, onSelectedLng }) => {
    const dialogStyle = isHidden ? styles.Dialog_hidden : styles.Dialog
    countries.registerLocale(enLocale)
    const countryNames = countries.getNames('en')

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

    const onSearchInputChanged = (text: string) => {

    }

    return (
        <div className={dialogStyle} onClick={onBgClickHandler}>
            <div className={styles.Card} onClick={e => onCardClickHandler(e)}>
                <div className={styles.Card__content}>
                    <Search onChange={onSearchInputChanged} />
                    <hr className={styles.Card__separator} />
                    <div className={styles.Card__languageBlock}>
                        {
                            Object.entries(GENERAL_COUNTRY_CODES).map(([code, language]) => (
                                <LanguageButton
                                    key={code}
                                    appLng={{ name: language, countryCode: code.toLowerCase() }}
                                    onClick={() => onSelectedLngHandler(language, code.toLowerCase())}
                                />
                            ))
                        }
                        <hr className={styles.Card__separator} />
                        {
                            Object.entries(SECONDARY_COUNTRY_CODES).map(([code, language]) => (
                                <LanguageButton
                                    key={code}
                                    appLng={{ name: language, countryCode: code.toLowerCase() }}
                                    onClick={() => onSelectedLngHandler(language, code.toLowerCase())}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeckLanguageDialog