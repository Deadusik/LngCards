import { FC } from 'react'
import styles from '../../../styles/components/dialog/learn_info/ToLearnDialogContent.module.scss'
import cardsSvgSrc from '../../../assets/svgs/cards.svg'
import RoundButton from '../../ui/button/RoundButton'

interface Props {
    onLinkClick: () => void
}

const ToLearnDialogContent: FC<Props> = ({ onLinkClick }) => {
    return (
        <div className={styles.mainBlock}>
            <h2 className={styles.mainBlock__title}>
                Cards to learn
            </h2>
            <p className={styles.mainBlock__text}>
                This number means how many cards are ready to be learnt based on our spaced-repetition algorithm.
            </p>
            <p className={styles.mainBlock__link}
                onClick={onLinkClick}>
                SHOW CARDS TO LEARN
            </p>
            <img className={styles.mainBlock__cardsIcon}
                src={cardsSvgSrc} />
            <h2 className={styles.mainBlock__title}>
                Spaced-repetition algorithm
            </h2>
            <p className={styles.mainBlock__text}>
                App tracks every single one of your cards and knows when it is the right time to show it to you again. It knows which cards you sent to the right so he will show them to you again after a longer period of time. If you sent a card to the left, it will show it to you sooner.
            </p>
            <div className={styles.mainBlock__button}>
                <RoundButton text='START LEARNING'
                    onClick={() => console.log('Round btn click!')} />
            </div>
        </div>
    )
}

export default ToLearnDialogContent