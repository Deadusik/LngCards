import { FC, useRef, useState } from 'react'
import styles from '../../styles/components/card/ActionLabel.module.scss'
import { green } from '../../utils/colors'
import { getProgreesFromRange } from '../../utils/math'

interface Props {
    text: string
    offsetX?: number | null
    offsetY?: number | null
    color?: string
    rotaiton?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
}

const ActionLabel: FC<Props> = ({
    text,
    offsetX = null,
    offsetY = null,
    color = green,
    rotaiton = 'initial',
    top = 'initial',
    left = 'initial',
    right = 'initial',
    bottom = 'initial'
}) => {
    // states 
    const labelOpacity = useState<number>(0)
    // refs
    const labelRef = useRef<HTMLDivElement>(null)
    // constantsx
    const MIN_OPACITY = '0'
    const ACTION_MULTIPLIER = getActionMultiplier()
    const DEAD_ZONE = 50 * ACTION_MULTIPLIER
    const GOT_IT = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
    const STUDY_AGAIN = (-100 - DEAD_ZONE) * ACTION_MULTIPLIER
    const DELETE_OFFSET = (150 + DEAD_ZONE) * ACTION_MULTIPLIER

    // if devise is small than we'll get a smaller multiplier
    function getActionMultiplier(): number {
        const XS_TRIGGER = 450
        const XS_MULTIPLIER = 0.5
        const DEFAULT_MULTIPLIER = 1

        const clientWidth = window.innerWidth
        const multiplier = clientWidth < XS_TRIGGER ? XS_MULTIPLIER : DEFAULT_MULTIPLIER

        return multiplier
    }

    function offsetToOpacity(): string {
        const MAX_OFFSET = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
        const MIN_OFFSET = DEAD_ZONE

        // got it && study again labels opacity controller
        if (offsetX !== null && offsetY === null) {
            const positiveOffset = Math.abs(offsetX);
            return getProgreesFromRange(MIN_OFFSET, MAX_OFFSET, positiveOffset).toFixed(1)
        } else if (offsetX !== null && offsetY !== null) { // delete label opacity controller
            const positiveOffset = { x: Math.abs(offsetX), y: Math.abs(offsetY) }
            const yOpacity = getProgreesFromRange(MIN_OFFSET, DELETE_OFFSET, positiveOffset.y)
            const xOpacity = getProgreesFromRange(DEAD_ZONE, 0, positiveOffset.x)
            const opacity = yOpacity * xOpacity
            return opacity.toFixed(1)
        }

        return MIN_OPACITY
    }

    return (
        <div className={styles.ActionLabel}
            ref={labelRef}
            style={{
                transform: `rotate(${rotaiton})`,
                borderColor: color,
                top,
                left,
                right,
                bottom
            }}>
            <h2 className={styles.ActionLabel__text}
                style={{
                    color,
                }}>
                {text}
            </h2>
        </div>
    )
}

export default ActionLabel