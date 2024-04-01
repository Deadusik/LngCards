import { FC } from 'react'
import styles from '../../../styles/components/dialog/learn_info/LearnInfoDialog.module.scss'
import crossSvgSrc from '../../../assets/svgs/cross.svg'
import { SPACE } from '../../../utils/constants'

interface Props {
    content: FC
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const LearnInfoDialog: FC<Props> = ({ content: ContentComponent, isActive, setIsActive }) => {
    const CloseClickHandler = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={[
            styles.mainBlock,
            isActive ? '' : styles.mainBlock_hidden
        ].join(SPACE)}>
            <div className={styles.mainBlock__content}>
                <ContentComponent />
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