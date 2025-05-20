import { FC, useState } from 'react'
import styles from '../../../styles/components/dialog/deck_language/DeckLanguageDialog.module.scss'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
// components
import LanguageButton from '../app_language/LanguageButton'
import Search from './Search'
import { COUNTRY_CODES, GENERAL_COUNTRY_CODES, SECONDARY_COUNTRY_CODES } from '../../../utils/constants'


interface Props {
    isHidden: boolean
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
    onSelectedLng: (name: string, countryCode: string) => void
}

const DeckLanguageDialog: FC<Props> = ({ isHidden, setIsHidden, onSelectedLng }) => {
    // use state
    const [searchText, setSearchText] = useState('')
    const [selectedLanguages, setSelectedLanguages] = useState<[string, string][]>([])
    const dialogStyle = isHidden ? styles.Dialog_hidden : styles.Dialog
    // language entities
    countries.registerLocale(enLocale)
    const generalCountriesArr = searchText ? selectedLanguages : Object.entries(GENERAL_COUNTRY_CODES)
    const secondaryCountriesArr = Object.entries(SECONDARY_COUNTRY_CODES)

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
        setSearchText(text)

        const countryArr = Object.entries(COUNTRY_CODES)
        const matches: [string, string][] = []

        countryArr.forEach(([code, language]) => {
            if (language.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                matches.push([code, language])
            }
        })

        setSelectedLanguages(matches)
    }

    const onCloseHandler = () => {
        setIsHidden(true)
    }

    return (
        <div className={dialogStyle} onClick={onBgClickHandler}>
            <div className={styles.Card} onClick={e => onCardClickHandler(e)}>
                <div className={styles.Card__content}>
                    <Search
                        onChange={onSearchInputChanged}
                        onClose={onCloseHandler} />
                    <hr className={styles.Card__separator} />
                    <div className={styles.Card__languageBlock}>
                        {
                            generalCountriesArr.map(([code, language]) => (
                                <LanguageButton
                                    key={code}
                                    appLng={{ name: language, countryCode: code.toLowerCase() }}
                                    onClick={() => onSelectedLngHandler(language, code.toLowerCase())}
                                />
                            ))
                        }
                        {!searchText && <hr className={styles.Card__separator} />}
                        {
                            !searchText &&
                            secondaryCountriesArr.map(([code, language]) => (
                                <LanguageButton
                                    key={code}
                                    appLng={{ name: language, countryCode: code.toLowerCase() }}
                                    onClick={() => onSelectedLngHandler(language, code.toLowerCase())}
                                />
                            ))
                        }
                        {
                            selectedLanguages.length == 0 &&
                            <p className={styles.Card__textNoResult}>🤷</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeckLanguageDialog