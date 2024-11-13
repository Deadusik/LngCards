import { FC } from 'react'
import styles from '../styles/pages/Learning.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
import CardQueue from '../components/card/CardQueue'
import { SPACE } from '../utils/constants'

const Learning: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={[wrapperStyles.content, wrapperStyles.content_card].join(SPACE)}>
                <div className={styles.mainBlock__content}>
                    <div className={styles.mainBlock__cards}>
                        <CardQueue />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Learning