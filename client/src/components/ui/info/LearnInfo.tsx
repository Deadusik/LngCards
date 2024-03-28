import styles from '../../../styles/components/ui/info/LearnInfo.module.scss'
import { SPACE } from '../../../utils/constants'
import questionSvgSrc from '../../../assets/svgs/question.svg'
import { CardState } from '../../../utils/enum'
import { useLearnInfoModifier } from '../../../hooks/useLearnInfoModifier'

interface Props {
    onClick: () => void
    count?: number
    modifierType: CardState
}

const LearnInfo = ({ count = 0, modifierType, onClick }: Props) => {
    const modifier = useLearnInfoModifier(modifierType, styles)

    return (
        <div className={[styles.mainBlock, modifier.style].join(SPACE)}
            onClick={onClick}>
            <p className={styles.mainBlock__count}>{count}</p>
            <div className={styles.mainBlock__textBlock}>
                <p className={styles.mainBlock__text}>{modifier.text}</p>
                <img className={[
                    styles.icon,
                    modifier.iconStyle
                ].join(SPACE)}
                    src={questionSvgSrc}
                    alt='question' />
            </div>
        </div>
    )
}

export default LearnInfo