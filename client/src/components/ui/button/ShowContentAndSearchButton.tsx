import { FC } from 'react'
import styles from '../../../styles/components/ui/button/ShowContentAndSearchButton.module.scss'
// svg src
import arrowSvgSrc from '../../../assets/svgs/arrow_up.svg'
import { default as SearchSvg } from '../../../assets/svgs/search.svg?react'
// utils
import { SPACE } from '../../../utils/constants'
import { gray } from '../../../utils/colors'

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
                    <SearchSvg width={22} height={22} stroke={gray} />
                </div>
            </div>
        </div>
    )
}

export default ShowContentAndSearchButton