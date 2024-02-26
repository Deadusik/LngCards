import styles from '../../../styles/components/ui/info/LearnInfo.module.scss'
import { SPACE } from '../../../utils/constants'
import questionSvgSrc from '../../../assets/svgs/question.svg'

export enum LearnInfoModifier {
    toLearn,
    known,
    learned
}

interface Props {
    count?: number
    modifierType: LearnInfoModifier
}

interface Modifier {
    style: string
    text: string
    iconStyle: string
}

const getModifier = (modifierType: LearnInfoModifier): Modifier => {
    switch (modifierType) {
        case LearnInfoModifier.toLearn: {
            return {
                text: 'To learn',
                style: styles.mainBlock_toLearn,
                iconStyle: styles.icon_toLearn
            }
        }
        case LearnInfoModifier.known: {
            return {
                text: 'Known',
                style: styles.mainBlock_known,
                iconStyle: styles.icon_known
            }
        }
        case LearnInfoModifier.learned: {
            return {
                text: 'Learned',
                style: styles.mainBlock_learned,
                iconStyle: styles.icon_learned
            }
        }
    }
}

const clickHandler = () => {

}

const LearnInfo = ({ count = 0, modifierType }: Props) => {
    const modifier = getModifier(modifierType)

    return (
        <div className={[styles.mainBlock, modifier.style].join(SPACE)}
            onClick={() => clickHandler}>
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