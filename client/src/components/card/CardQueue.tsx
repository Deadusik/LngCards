import { FC } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
import Card from "./Card"
import BackgroundCard from "./BackgroundCard"

const CardQueue: FC = () => {


    return (
        <div className={styles.CardQueue}>
            <Card />
            <BackgroundCard angle={3} />
            <BackgroundCard angle={-3} />
        </div>
    )
}

export default CardQueue