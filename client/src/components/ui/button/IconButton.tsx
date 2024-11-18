import { FC } from "react"
import styles from '../../../styles/components/ui/button/IconButton.module.scss'

interface Props {
    size?: number
    stroke?: string
    fill?: string
    color?: string
    background?: string
    content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    triggerSize?: string
    onClick: () => void
}

const IconButton: FC<Props> = ({
    content: Content,
    size = 25,
    color = 'black',
    fill = 'black',
    stroke = 'black',
    background = '',
    triggerSize = '30px',
    onClick
}) => {
    return (
        <div className={styles.IconButton} onClick={onClick} style={{
            width: triggerSize,
            height: triggerSize,
            background
        }}>
            <Content width={size} height={size} color={color} fill={fill} stroke={stroke} />
        </div>
    )
}

export default IconButton