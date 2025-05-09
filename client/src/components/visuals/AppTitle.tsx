import { FC } from 'react'
import styles from '../../styles/visulas/AppTitle.module.scss'

interface Props {
    fontSize?: string
}

const AppTitle: FC<Props> = ({ fontSize = '48px' }) => {
    return (
        <h1 className={styles.AppTitle}
            style={{ fontSize }}>
            LngCards
        </h1>
    )
}

export default AppTitle