import { FC, useEffect, useRef, useState } from 'react'
import { CardState } from '../utils/enum'
import { useDialogInfoContent } from '../hooks/useDialogInfoContent'
import { SPACE } from '../utils/constants'
// styles 
import styles from '../styles/pages/Home.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
// components
import ListOfCards from '../components/card/ListOfCards'
import LearnInfoDialog from '../components/dialog/learn_info/LearnInfoDialog'
import LearnInfoSection from '../components/section/home/LearnInfoSection'
import ShowSection from '../components/section/home/ShowSection'
import SearchSection from '../components/section/home/SearchSection'
import Calendar from '../components/calendar/Calendar'

const Home: FC = () => {
    // additional content visibility
    const [isCardsShowed, setIsCardsShowed] = useState(false)
    const [isSearchShowed, setIsSearchShowed] = useState(false)

    // dialog 
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [dialogContentType, setDialogContentType] = useState<CardState>(CardState.none)

    // refs
    const searchRef = useRef<HTMLDivElement>(null)
    const listOfCardsRef = useRef<HTMLDivElement>(null)

    const dialogLinkCallback = () => {
        console.log('link click')
    }

    const scrollToElementByCondition = (ref: React.RefObject<HTMLDivElement>, condition: boolean) => {
        if (condition && ref) {
            ref.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        scrollToElementByCondition(listOfCardsRef, isCardsShowed)
    }, [isCardsShowed])

    useEffect(() => {
        scrollToElementByCondition(searchRef, isSearchShowed)
    }, [isSearchShowed])

    return (
        <div className={[
            wrapperStyles.contentVertical,
            styles.wrapper
        ].join(SPACE)}>
            <div className={styles.mainBlock}>
                <div className={styles.mainBlock__content}>
                    {/* base content block */}
                    <div className={styles.mainBlock__baseContent}>
                        <LearnInfoSection
                            setDialogType={setDialogContentType}
                            setDialogVisibility={setIsDialogVisible} />
                        {/* calendar block */}
                        <div className={styles.mainBlock__calendarBlock}>
                            <Calendar />
                        </div>
                        <ShowSection
                            isContentVisible={isCardsShowed}
                            isSearchActive={isSearchShowed}
                            setIsContentVisible={setIsCardsShowed}
                            setIsSearchActive={setIsSearchShowed} />
                    </div>
                    {/* additional content block */}
                    <div className={styles.mainBlock__additionalContent}>
                        {/* search block by condition */
                            isSearchShowed &&
                            <div className={styles.mainBlock__searchBlock}
                                ref={searchRef}>
                                <SearchSection
                                    isCardsShowed={isCardsShowed} />
                            </div>
                        }
                        {/* list of cards by condition */
                            isCardsShowed &&
                            <div className={styles.mainBlock__listOfCardsBlock}
                                ref={listOfCardsRef}>
                                <ListOfCards />
                            </div>
                        }
                    </div>
                </div>
                <LearnInfoDialog
                    onLinkClick={dialogLinkCallback}
                    content={useDialogInfoContent(dialogContentType)}
                    isActive={isDialogVisible}
                    setIsActive={setIsDialogVisible} />
            </div>
        </div>
    )
}

export default Home