import styles from '../../../styles/components/ui/button/ShowCardsAndSearchButton.module.scss'
// svg src
import arrowSvgSrc from '../../../assets/svgs/arrow_up.svg'
import searchSvgSrc from '../../../assets/svgs/search.svg'
import { SPACE } from '../../../utils/constants'
import { FC } from 'react'

interface Props {
    isCardsToggleOn: boolean
    onCardsClick: () => void
    onSearchClick: () => void
}

const ShowCardsAndSearchButton: FC<Props> = ({ isCardsToggleOn, onCardsClick, onSearchClick }) => {
    return (
        <div className={styles.mainBlock}>
            <div
                className={styles.mainBlock__arrowBlock}
                onClick={onCardsClick}>
                <div className={styles.mainBlock__arrowContentBlock}>
                    <img
                        className={[
                            styles.mainBlock__arrow,
                            isCardsToggleOn ? styles.mainBlock__arrow_active : ''
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

export default ShowCardsAndSearchButton