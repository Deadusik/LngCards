import styles from '../../styles/components/dialog/CardMenuDialog.module.scss'
import { SPACE } from '../../utils/constants'
//svg srs
import penSvgSrc from '../../assets/svgs/pen.svg'
import resetSvgSrc from '../../assets/svgs/reset.svg'
import trashSvgSrc from '../../assets/svgs/trash.svg'
import { FC } from 'react'

export enum CardAction {
    none,
    edit,
    reset,
    delete
}

interface Props {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    setCardAction: React.Dispatch<React.SetStateAction<CardAction>>
}

const CardMenuDialog: FC<Props> = ({ setIsActive, setCardAction }) => {
    const disableMenu = (action: CardAction, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setCardAction(action)
        setIsActive(false)
    }

    const EditHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        disableMenu(CardAction.edit, e)
    }

    const ResetHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        disableMenu(CardAction.reset, e)
    }

    const DeleteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        disableMenu(CardAction.delete, e)
    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__item}
                onClick={e => EditHandler(e)}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_pen
                    ].join(SPACE)}
                        src={penSvgSrc} />
                    <p className={styles.mainBlock__text}>Edit</p>
                </div>
            </div>
            <div className={styles.mainBlock__item}
                onClick={ResetHandler}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_reset
                    ].join(SPACE)}
                        src={resetSvgSrc} />
                    <p className={styles.mainBlock__text}>Reset</p>
                </div>
            </div>
            <div className={styles.mainBlock__item}
                onClick={DeleteHandler}>
                <div className={styles.mainBlock__content}>
                    <img className={[
                        styles.mainBlock__icon,
                        styles.mainBlock__icon_trash
                    ].join(SPACE)}
                        src={trashSvgSrc} />
                    <p className={styles.mainBlock__text}>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default CardMenuDialog