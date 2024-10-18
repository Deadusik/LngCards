import { FC, useEffect, useRef } from 'react'
import styles from '../../styles/components/card/ActionLabel.module.scss'
import { green } from '../../utils/colors'
import { getProgreesFromRange } from '../../utils/math'
import { CardDirection } from '../../utils/enum'
import { INITIAL } from '../../utils/constants'

interface Props {
    text: string
    triggerDirection: CardDirection
    cardDirection: CardDirection
    cardRestoreTrigger: boolean
    offsetX?: number | null
    offsetY?: number | null
    deadActionZone?: number
    verticalActionZone?: number
    horizontalActionZone?: number
    color?: string
    rotaiton?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
}

const ActionLabel: FC<Props> = ({
    text,
    cardDirection = CardDirection.Deadzone,
    triggerDirection = CardDirection.Deadzone,
    cardRestoreTrigger = false,
    offsetX = null,
    offsetY = null,
    deadActionZone = 0,
    horizontalActionZone = 0,
    verticalActionZone = 0,
    color = green,
    rotaiton = INITIAL,
    top = INITIAL,
    left = INITIAL,
    right = INITIAL,
    bottom = INITIAL,
}) => {
    // refs
    const labelRef = useRef<HTMLDivElement>(null)
    // constatns
    const DEAD_ZONE = deadActionZone
    const VERTICAL_OFFSET_ACTION = verticalActionZone
    const HORIZONTAL_OFFSET_ACTION = horizontalActionZone
    const MIN_OPACITY = '0'

    useEffect(() => {
        if (labelRef.current) {
            if (cardDirection === triggerDirection)
                labelRef.current.style.opacity = offsetToOpacity()
            else
                labelRef.current.style.opacity = MIN_OPACITY
        }
    }, [offsetX, offsetY, cardRestoreTrigger])

    function offsetToOpacity(): string {
        const MAX_OFFSET = HORIZONTAL_OFFSET_ACTION
        const MIN_OFFSET = DEAD_ZONE

        // got it && study again labels opacity controller
        if (offsetX !== null && offsetY === null) {
            const positiveOffset = Math.abs(offsetX);
            return getProgreesFromRange(MIN_OFFSET, MAX_OFFSET, positiveOffset).toFixed(1)
            // delete label opacity controller
        } else if (offsetX !== null && offsetY !== null) {
            const positiveOffset = { x: Math.abs(offsetX), y: Math.abs(offsetY) }
            const yOpacity = getProgreesFromRange(MIN_OFFSET, VERTICAL_OFFSET_ACTION, positiveOffset.y)
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