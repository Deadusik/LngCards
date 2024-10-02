import { FC } from 'react'
import styles from '../../styles/components/card/HintLabel.module.scss'
import { INITIAL } from '../../utils/constants'
import { default as ArrowSvg } from '../../assets/svgs/arrow_line.svg?react'

interface Props {
    conditionText: string
    hintText: string
    left?: string
    top?: string
    right?: string
    bottom?: string
    isActive?: boolean
    color?: string
    iconRotation?: string
}

const HintLabel: FC<Props> = ({
    conditionText,
    hintText,
    isActive = true,
    left = INITIAL,
    top = INITIAL,
    right = INITIAL,
    bottom = INITIAL,
    color = '#000',
    iconRotation = INITIAL
}) => {
    return (
        <div className={styles.HintLabel}
            style={{
                left,
                top,
                right,
                bottom
            }}>
            <ArrowSvg width={30} height={30} stroke={color} style={{ transform: `rotate(${iconRotation})` }} />
            <p className={styles.HintLabel__conditionText}
                style={{ color }}>
                {conditionText}
            </p>
            <p className={styles.HintLabel__hintText}
                style={{ color }}>
                {hintText}
            </p>
        </div>
    )
}

export default HintLabel