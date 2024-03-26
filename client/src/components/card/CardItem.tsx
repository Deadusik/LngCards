import { FC } from 'react'
import styles from '../../styles/components/card/CardItem.module.scss'
// components
import PlayButton from '../ui/button/PlayButton'
import CardMenuButton from '../ui/button/CardMenuButton'
// test res
import appleSvgSrc from '../../assets/svgs/example/apple.svg'
import Battery from '../ui/Battery'
import { CardState } from '../../utils/enum'

interface Props {
    name?: string
    translation?: string
    example?: string
}

const CardItem: FC<Props> = ({
    name = 'Card name this name is very long cause I need to test it',
    translation = 'Card translation do you like it? Subsribe on me in github hehehe',
    example = 'He finally found his person in space. Drugs its bad mkay?'
}) => {
    const namePlayHandler = () => {

    }

    const examplePlayHandler = () => {

    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.mainBlock__contentBlock}>
                {/*img block*/}
                <div className={styles.mainBlock__imgBlock}>
                    <img className={styles.mainBlock__img}
                        src={appleSvgSrc} />
                    <div className={styles.mainBlock__battery}>
                        <Battery state={CardState.known}
                            percent={75} />
                    </div>
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
                    <CardMenuButton />
                </div>
            </div>
        </div>
    )
}

export default CardItem