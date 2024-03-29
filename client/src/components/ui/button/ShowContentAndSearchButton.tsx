import styles from '../../../styles/components/ui/button/ShowContentAndSearchButton.module.scss'
// svg src
import arrowSvgSrc from '../../../assets/svgs/arrow_up.svg'
import searchSvgSrc from '../../../assets/svgs/search.svg'
import { SPACE } from '../../../utils/constants'
import { FC } from 'react'

interface Props {
    isContentVisible: boolean
    onCardsClick: () => void
    onSearchClick: () => void
}

const ShowContentAndSearchButton: FC<Props> = ({ isContentVisible, onCardsClick, onSearchClick }) => {
    return (
        <div className={styles.mainBlock}>
            <div
                className={styles.mainBlock__arrowBlock}
                onClick={onCardsClick}>
                <div className={styles.mainBlock__arrowContentBlock}>
                    <img
                        className={[
                            styles.mainBlock__arrow,
                            isContentVisible ? styles.mainBlock__arrow_active : ''
                        ].join(SPACE)}
                        src={arrowSvgSrc}
                        alt='arrow' />
                    <p className={styles.mainBlock__text}>
                        Cards
                    </p>
                </div>
            </div>
            <div className={styles.mainBlock__searchBlock}>
                <div
                    className={styles.mainBlock__searchContentBlock}
                    onClick={onSearchClick}>
                    <img
                        className={styles.mainBlock__search}
                        src={searchSvgSrc} />
                </div>
            </div>
        </div>
    )
}

export default ShowContentAndSearchButton