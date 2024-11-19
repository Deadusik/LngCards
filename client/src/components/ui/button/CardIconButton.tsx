import { FC } from 'react'
import styles from '../../../styles/components/ui/button/CardPlayButton.module.scss'

interface Props {
    onClick: () => void
    content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    isFrontSide?: boolean
    color?: string,
    fill?: string,
    stroke?: string,
}

const CardIconButton: FC<Props> = ({
    color = '',
    fill = '',
    stroke = '',
    content: Content,
    isFrontSide = false,
    onClick
}) => {
    const onClickStopPropagationHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <button className={styles.CardPlayButton}
            onClick={onClickStopPropagationHandler}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
            onMouseUp={e => {
                if (isFrontSide)
                    e.stopPropagation()
            }}>
            <Content
                width={20}
                height={20}
                color={color}
                fill={fill}
                stroke={stroke}
            />
        </button>
    )
}

export default CardIconButton