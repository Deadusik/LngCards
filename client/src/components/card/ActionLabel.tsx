import { FC, useRef } from 'react'
import styles from '../../styles/components/card/ActionLabel.module.scss'
import { green } from '../../utils/colors'

interface Props {
    text: string
    color?: string
    rotaiton?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
}

const ActionLabel: FC<Props> = ({
    text,
    color = green,
    rotaiton = 'initial',
    top = 'initial',
    left = 'initial',
    right = 'initial',
    bottom = 'initial'
}) => {
    const labelRef = useRef<HTMLDivElement>(null)

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