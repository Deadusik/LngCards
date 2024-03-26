import { FC, useEffect, useRef, useState } from 'react'
import { CardState } from '../utils/enum'
// styles 
import styles from '../styles/pages/Home.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
// components
import LearnInfo, { LearnInfoModifier } from '../components/ui/info/LearnInfo'
import FloatingButton from '../components/ui/button/FloatingButton'
import ListOfCards from '../components/card/ListOfCards'
import ShowCardsAndSearchButton from '../components/ui/button/ShowCardsAndSearchButton'
import TextInput from '../components/ui/input/TextInput'
import StateDropBox, { OptionsPlacement } from '../components/ui/input/StateDropBox'
import LearnInfoDialog from '../components/dialog/learn_info/LearnInfoDialog'
import ToLearnDialogContent from '../components/dialog/learn_info/ToLearnDialogContent'

const Home: FC = () => {
    // dialog 
    const [isDialogVisible, setIsDialogVisible] = useState(false)

    // additional content visibility
    const [isCardsShowed, setIsCardsShowed] = useState(false)
    const [isSearchShowed, setIsSearchShowed] = useState(false)

    // search states
    const [cardStateFilter, setCardStateFilter] = useState<CardState>(CardState.none)
    const [searchText, setSearchText] = useState('')

    // refs
    const searchRef = useRef<HTMLDivElement>(null)
    const listOfCardsRef = useRef<HTMLDivElement>(null)

    const scrollToElementByCondition = (ref: React.RefObject<HTMLDivElement>, condition: boolean) => {
        if (condition && ref) {
            ref.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const searchHandle = () => {
        setIsSearchShowed(!isSearchShowed)
    }

    const cardsHandle = () => {
        setIsCardsShowed(!isCardsShowed)
    }

    useEffect(() => {
        scrollToElementByCondition(listOfCardsRef, isCardsShowed)
    }, [isCardsShowed])

    useEffect(() => {
        scrollToElementByCondition(searchRef, isSearchShowed)
    }, [isSearchShowed])

    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.contentVertical}>
                <div className={styles.mainBlock__content}>
                    {/* base content block */}
                    <div className={styles.mainBlock__baseContent}>
                        {/* learn block */}
                        <div className={styles.mainBlock__learnInfoBlock}>
                            <LearnInfo modifierType={LearnInfoModifier.toLearn} />
                            <LearnInfo modifierType={LearnInfoModifier.known} />
                            <LearnInfo modifierType={LearnInfoModifier.learned} />
                        </div>
                        {/* calendar block */}
                        <div className={styles.mainBlock__calendarBlock}>

                        </div>
                        {/* dropbox block */}
                        <div className={styles.mainBlock__dropBoxBlock}>
                            <ShowCardsAndSearchButton
                                isCardsToggleOn={isCardsShowed}
                                onCardsClick={cardsHandle}
                                onSearchClick={searchHandle} />
                            <div>{/* grid space */}</div>
                            <FloatingButton />
                        </div>
                    </div>
                    {/* additional content block */}
                    <div className={styles.mainBlock__additionalContent}>
                        {/* search block by condition */
                            isSearchShowed &&
                            <div
                                className={styles.mainBlock__searchBlock}
                                ref={searchRef}>
                                <StateDropBox
                                    cardState={cardStateFilter}
                                    setCardState={setCardStateFilter}
                                    optionPlacement={
                                        isCardsShowed ?
                                            OptionsPlacement.default
                                            :
                                            OptionsPlacement.top
                                    } />
                                <TextInput
                                    text={searchText}
                                    setText={setSearchText}
                                    placeholder='Search' />
                            </div>
                        }
                        {/* list of cards by condition */
                            isCardsShowed &&
                            <div
                                className={styles.mainBlock__listOfCardsBlock}
                                ref={listOfCardsRef}>
                                <ListOfCards />
                            </div>
                        }
                    </div>
                </div>
                <LearnInfoDialog
                    content={ToLearnDialogContent}
                    isActive={isDialogVisible}
                    setIsActive={setIsDialogVisible} />
            </div>
        </div>
    )
}

export default Home