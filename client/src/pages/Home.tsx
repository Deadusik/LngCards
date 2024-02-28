import { FC } from 'react'
import styles from '../styles/pages/Home.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
import LearnInfo, { LearnInfoModifier } from '../components/ui/info/LearnInfo'
import FloatingButton from '../components/ui/button/FloatingButton'

const Home: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <div className={styles.mainBlock__learnInfo}>
                    <LearnInfo modifierType={LearnInfoModifier.toLearn} />
                    <div>{ /* grid space */}</div>
                    <LearnInfo modifierType={LearnInfoModifier.known} />
                    <div>{ /* grid space */}</div>
                    <LearnInfo modifierType={LearnInfoModifier.learned} />
                </div>
                <div className={styles.mainBlock__dropBoxRow}>
                    <FloatingButton />
                </div>
            </div>
        </div>
    )
}

export default Home