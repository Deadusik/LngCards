import { FC } from 'react'
import styles from '../../styles/components/card/CardItem.module.scss'
// components
import PlayButton from '../ui/button/PlayButton'
import CardMenuButton from '../ui/button/CardMenuButton'
// test res
import appleSvgSrc from '../../assets/svgs/example/apple.svg'

interface Props {
    name?: string
    translation?: string
    example?: string
}

const CardItem: FC<Props> = ({
    name = 'Card name',
    translation = 'Card translation',
    example = 'Card example'
}) => {
    const namePlayHandler = () => {

    }

    const examplePlayHandler = () => {

    }

    const cardMenuHandler = () => {

    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__contentBlock}>
                {/*img block*/}
                <div className={styles.mainBlock__imgBlock}>
                    <img className={styles.mainBlock__img}
                        src={appleSvgSrc} />
                </div>
                {/*info block*/}
                <div className={styles.mainBlock__infoBlock}>
                    <div className={styles.mainBlock__name}>
                        <div className={styles.mainBlock__play}>
                            <PlayButton
                                onClick={namePlayHandler} />
                        </div>
                        <p>{name}</p>
                    </div>
                    <div className={styles.mainBlock__translate}>
                        <p>{translation}</p>
                    </div>
                    <div className={styles.mainBlock__example}>
                        <div className={styles.mainBlock__play}>
                            <PlayButton
                                onClick={examplePlayHandler} />
                        </div>
                        <p>{example}</p>
                    </div>
                </div>
                {/*control block*/}
                <div className={styles.mainBlock__controlBlock}>
                    <CardMenuButton onClick={cardMenuHandler} />
                </div>
            </div>
        </div>
    )
}

export default CardItem