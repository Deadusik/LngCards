import React, { FC, useState } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
import Card from "./Card"
import BackgroundCard from "./BackgroundCard"
import { SPACE } from "../../utils/constants"
import appleSvgSrc from '../../assets/test/svgs/apple.svg'
import dogSvgSrc from '../../assets/test/svgs/dog.svg'

const CardQueue: FC = () => {
    const [currentCard, setCurrentCard] = useState<number>(0)

    const cardsData = [
        {
            nativeWord: '',
            foreignWord: '',
            example: ''
        },
        {
            nativeWord: '',
            foreignWord: '',
            example: ''
        }
    ].join(SPACE)

    const onDeleteHandler = () => {
        console.log('Card was removed')
    }

    return (
        <div className={styles.CardQueue}>
            <Card
                foreignWord="Dog"
                nativeWord="Собака"
                example={"The dog is angry"}
                src={dogSvgSrc}
                toForeignLanguage={true}
                isActive={false}
                deleteCallback={onDeleteHandler} />
            <Card
                foreignWord="Apple"
                nativeWord="Яблуко"
                example={"The apple is tasty"}
                src={appleSvgSrc}
                toForeignLanguage={true}
                isActive={true}
                deleteCallback={onDeleteHandler} />
            {cardsData.length > 1 &&
                <React.Fragment>
                    <BackgroundCard angle={3} />
                    <BackgroundCard angle={-3} />
                </React.Fragment>
            }
        </div>
    )
}

export default CardQueue