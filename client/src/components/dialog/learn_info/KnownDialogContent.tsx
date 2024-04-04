import { FC } from 'react'
import styles from '../../../styles/components/dialog/learn_info/KnownDialogContent.module.scss'
import filterSvgSrc from '../../../assets/svgs/filter.svg'

interface Props {
    onLinkClick: () => void
}

const KnownDialogContent: FC<Props> = ({ onLinkClick }) => {
    return (
        <div className={styles.mainBlock}>
            <h2 className={styles.mainBlock__title}>
                Short-term memory
            </h2>
            <p className={styles.mainBlock__text}>
                This number means how many words and phrases you have in your short-term memory.
            </p>
            <p className={styles.mainBlock__text}>
                You won't find these cards in learning mode for a while, unless you use the
                <img className={styles.mainBlock__filterIcon} src={filterSvgSrc} />
                <span> filter</span>
                , where you can include cards that you already know.
            </p>
            <p className={styles.mainBlock__link}
                onClick={onLinkClick}>
                SHOW KNOWN CARDS
            </p>
        </div>
    )
}

export default KnownDialogContent