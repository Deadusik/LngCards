import { FC } from 'react'
import styles from '../../../styles/components/dialog/learn_info/LearnedDialogContent.module.scss'
import cardsSvgSrc from '../../../assets/svgs/cards.svg'

interface Props {
    onLinkClick: () => void
}

const LearnedDialogContent: FC<Props> = ({ onLinkClick }) => {
    return (
        <div className={styles.mainBlock}>
            <h2 className={styles.mainBlock__title}>
                Long-term memory
            </h2>
            <p className={styles.mainBlock__text}>
                This number means how many words and phrases you have in logn-term memory.
            </p>
            <img className={styles.mainBlock__cardsIcon}
                src={cardsSvgSrc} />
            <p className={styles.mainBlock__text}>
                Application knows which cards you already remember well. He will show them to you again occasionally, just to make sure you don't forget them ever.
            </p>
            <p className={styles.mainBlock__text}>
                You can list through these learned cards and reset their progress if you want to learn them again.
            </p>
            <p className={styles.mainBlock__link}
                onClick={onLinkClick}>
                SHOW LEARNED CARDS
            </p>
        </div>
    )
}

export default LearnedDialogContent