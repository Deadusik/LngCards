import { FC } from 'react'
// components
import LearnInfo, { LearnInfoModifier } from '../components/ui/info/LearnInfo'
import FloatingButton from '../components/ui/button/FloatingButton'
import ListOfCards from '../components/card/ListOfCards'
import ShowCardsAndSearchButton from '../components/ui/button/ShowCardsAndSearchButton'
// styles 
import styles from '../styles/pages/Home.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'

const Home: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <div className={styles.mainBlock__content}>
                    {/* learn block */}
                    <div className={styles.mainBlock__learnInfoBlock}>
                        <LearnInfo modifierType={LearnInfoModifier.toLearn} />
                        <div>{/* grid space */}</div>
                        <LearnInfo modifierType={LearnInfoModifier.known} />
                        <div>{/* grid space */}</div>
                        <LearnInfo modifierType={LearnInfoModifier.learned} />
                    </div>
                    {/* calendar block */}
                    <div className={styles.mainBlock__calendarBlock}>

                    </div>
                    {/* learn block */}
                    <div className={styles.mainBlock__dropBoxBlock}>
                        <ShowCardsAndSearchButton />
                        <div>{/* grid space */}</div>
                        <FloatingButton />
                    </div>
                    <div className={styles.mainBlock__listOfCardsBlock}>
                        <ListOfCards />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home