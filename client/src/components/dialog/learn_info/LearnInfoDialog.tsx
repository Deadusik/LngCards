import { FC } from 'react'
import styles from '../../../styles/components/dialog/learn_info/LearnInfoDialog.module.scss'
import crossSvgSrc from '../../../assets/svgs/cross.svg'
import { SPACE } from '../../../utils/constants'
import { DialogContentProps } from '../../../utils/interface/DialogContentProps'

interface Props {
    content: FC<DialogContentProps>
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    onLinkClick: () => void
}

const LearnInfoDialog: FC<Props> = ({ content: ContentComponent, isActive, setIsActive, onLinkClick }) => {
    const CloseClickHandler = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={[
            styles.mainBlock,
            isActive ? '' : styles.mainBlock_hidden
        ].join(SPACE)}>
            <div className={styles.mainBlock__content}>
                <ContentComponent onLinkClick={onLinkClick} />
                <div className={styles.mainBlock__closeButton}
                    onClick={CloseClickHandler}>
                    <img className={styles.mainBlock__closeIcon}
                        src={crossSvgSrc} />
                </div>
            </div>
        </div>
    )
}

export default LearnInfoDialog