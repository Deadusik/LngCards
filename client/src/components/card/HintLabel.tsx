import { FC } from 'react'
import styles from '../../styles/components/card/HintLabel.module.scss'
//svg
import { default as ArrowSvg } from '../../assets/svgs/arrow_line.svg?react'
// utils
import { INITIAL, SPACE } from '../../utils/constants'

interface Props {
    conditionText: string
    hintText: string
    isDisabled: boolean
    isActive: boolean
    left?: string
    top?: string
    right?: string
    bottom?: string
    color?: string
    iconRotation?: string
}

const HintLabel: FC<Props> = ({
    conditionText,
    hintText,
    isActive,
    isDisabled,
    left = INITIAL,
    top = INITIAL,
    right = INITIAL,
    bottom = INITIAL,
    color = '#000',
    iconRotation = INITIAL
}) => {
    const getHintLabelStyle = (): string => {
        const style = styles.HintLabel
        const hiddenStyle = isDisabled ? styles.HintLabel_hidden : ''
        const activeStyle = isActive ?
            styles.HintLabel_active : styles.HintLabel_disappear

        return [style, hiddenStyle, activeStyle].join(SPACE)
    }

    return (
        <div className={getHintLabelStyle()}
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