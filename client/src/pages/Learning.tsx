import { FC } from 'react'
import styles from '../styles/pages/Learning.module.scss'
import wrapperStyles from '../styles/pages/Wrapper.module.scss'
import Card from '../components/card/Card'

const Learning: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={wrapperStyles.content}>
                <Card />
            </div>
        </div>
    )
}

export default Learning