import { FC, useEffect, useRef, useState } from 'react'
// components
import LearnInfo, { LearnInfoModifier } from '../components/ui/info/LearnInfo'
import FloatingButton from '../components/ui/button/FloatingButton'
import ListOfCards from '../components/card/ListOfCards'
import ShowCardsAndSearchButton from '../components/ui/button/ShowCardsAndSearchButton'
// styles 
import styles from '../styles/pages/Home.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
import TextInput from '../components/ui/input/TextInput'
import DropBox from '../components/ui/input/DropBox'

const Home: FC = () => {
    const [isCardsShowed, setIsCardsShowed] = useState(false)
    const [isSearchShowed, setIsSearchShowed] = useState(false)

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
            <div className={wrapperStyles.content}>
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
                </div>
                {/* additional content block */}
                <div className={styles.mainBlock__additionalContent}>
                    {/* search block by condition */
                        isSearchShowed &&
                        <div
                            className={styles.mainBlock__searchBlock}
                            ref={searchRef}>
                            <DropBox />
                            <TextInput />
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
        </div>
    )
}

export default Home