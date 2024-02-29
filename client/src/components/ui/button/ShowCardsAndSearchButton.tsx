import styles from '../../../styles/components/ui/button/ShowCardsAndSearchButton.module.scss'
// svg src
import arrowSvgSrc from '../../../assets/svgs/arrow_up.svg'
import searchSvgSrc from '../../../assets/svgs/search.svg'

const ShowCardsAndSearchButton = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__arrowBlock}>
                <img
                    className={styles.mainBlock__arrow}
                    src={arrowSvgSrc}
                    alt='arrow' />
                <p>Cards</p>
            </div>
            <div className={styles.mainBlock__searchBlock}>
                <img
                    className={styles.mainBlock__search}
                    src={searchSvgSrc} />
            </div>
        </div>
    )
}

export default ShowCardsAndSearchButton