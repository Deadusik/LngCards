import { FC, useState } from 'react'
import styles from '../../../styles/components/ui/button/CardMenuButton.module.scss'
import CardMenuDialog, { CardAction } from '../../dialog/CardMenuDialog'

interface Props {
    size?: string
}

const CardMenuButton: FC<Props> = ({ size = '50px' }) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [cardAction, setCardAction] = useState<CardAction>(CardAction.none)

    const clickHendler = () => {
        setIsActive(true)
    }

    const blurHandler = () => {
        setIsActive(false)
    }

    return (
        <div className={styles.mainBlock}
            onClick={clickHendler}
            onBlur={blurHandler}
            tabIndex={0}
            style={{
                width: size,
                height: size
            }}>
            <div className={styles.mainBlock__content}>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
                <div className={styles.mainBlock__dot}>{/*dot*/}</div>
            </div>
            {
                isActive &&
                <div className={styles.mainBlock__cardMenu}>
                    <CardMenuDialog
                        setIsActive={setIsActive}
                        setCardAction={setCardAction} />
                </div>
            }
        </div>
    )
}

export default CardMenuButton 