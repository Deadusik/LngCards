import { useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import { SPACE } from '../../utils/constants'

const Card = () => {
    const [isFrontSide, setIsFrontSide] = useState(true)

    const onCardClick = () => {
        setIsFrontSide(false)
    }

    return (
        <div className={isFrontSide ? styles.Card : [styles.Card, styles.Card_active].join(SPACE)}
            onClick={onCardClick}>
            <div className={styles.Card__content}>
                {
                    isFrontSide ?
                        <div className={styles.FrontContent}>
                            <img className={styles.CardContent__picture /*extended*/} src={testImgSrc} />
                            <h1 className={styles.CardContent__name /*extended*/}>Багато часу тому</h1>
                            <p className={styles.FrontContent__example}>In a galaxy, far away...</p>
                        </div>
                        :
                        <div className={styles.BackContent}>
                            <img className={styles.CardContent__picture} src={testImgSrc} />
                            <p className={styles.BackContent__translated}>Багато часу тому</p>
                            <h1 className={styles.BackContent__translation}>Long time ago</h1>
                        </div>
                }
            </div>
        </div >
    )
}

export default Card