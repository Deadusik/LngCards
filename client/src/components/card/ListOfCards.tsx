import styles from '../../styles/components/card/ListOfCards.module.scss'
import CardItem from './CardItem'

// home page list
const ListOfCards = () => {
    return (
        <div className={styles.mainBlock}>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
        </div>
    )
}

export default ListOfCards