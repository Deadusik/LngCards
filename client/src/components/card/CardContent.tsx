import { FC } from 'react'
import styles from '../../styles/components/card/CardContent.module.scss'

interface IProps {
    isFrontContent: boolean
}

const CardContent: FC<IProps> = ({ isFrontContent }) => {
    return (
        <div className={styles.CardContent}>
            {
                isFrontContent ?
                    <div></div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default CardContent