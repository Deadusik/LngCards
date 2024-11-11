import React, { FC, useState } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
import Card from "./Card"
import BackgroundCard from "./BackgroundCard"
import appleSvgSrc from '../../assets/test/svgs/apple.svg'
import dogSvgSrc from '../../assets/test/svgs/dog.svg'
import houseSvgSrc from '../../assets/test/svgs/house.svg'
import airplaceSvgSrc from '../../assets/test/svgs/airplane.svg'

interface CardEntity {
    nativeWord: string
    foreignWord: string
    example: string
    src: string
    toForeignLanguage: boolean
}

const CardQueue: FC = () => {
    const [isTopCardFlipped, setIsTopCardFlipped] = useState(false)
    const [cardsData, setCardsData] = useState<CardEntity[]>(
        [
            {
                nativeWord: 'Яблуко',
                foreignWord: 'Apple',
                example: 'Apple is a red fruit',
                src: appleSvgSrc,
                toForeignLanguage: false,
            },
            {
                nativeWord: 'Собака',
                foreignWord: 'Dog',
                example: 'My pet is dog',
                src: dogSvgSrc,
                toForeignLanguage: true
            },
            {
                nativeWord: 'Літак',
                foreignWord: 'Airplane',
                example: 'Using by airplane we can rich any place in Earth',
                src: airplaceSvgSrc,
                toForeignLanguage: false,
            },
            {
                nativeWord: 'Хата',
                foreignWord: 'House',
                example: 'She sold her house cheaply',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
        ]
    )

    const onDeleteHandler = () => {
        const newCardsData = [...cardsData]
        newCardsData.pop()

        if (newCardsData) {
            setCardsData(newCardsData)
            setIsTopCardFlipped(false)
        }
    }

    const onCardFlipHandler = () => {
        setIsTopCardFlipped(true)
    }

    return (
        <div className={styles.CardQueue}>
            {
                <React.Fragment>
                    {
                        cardsData.map((card, index, arr) => {
                            const isTopCard = index === arr.length - 1
                            const nextCardIndex = arr.length >= 2 ? arr.length - 2 : -1
                            // set invisible front content for the next card
                            // to remove strange flip effect
                            const isContentVisible = isTopCard || index == nextCardIndex && isTopCardFlipped

                            return (
                                <Card key={index}
                                    nativeWord={card.nativeWord}
                                    foreignWord={card.foreignWord}
                                    example={card.example}
                                    toForeignLanguage={card.toForeignLanguage}
                                    src={card.src}
                                    isActive={isTopCard}
                                    isFrontContentVisible={isContentVisible}
                                    deleteCallback={onDeleteHandler}
                                    flippedCallback={onCardFlipHandler}
                                />
                            )
                        })
                    }
                </React.Fragment>
            }
            { /* background */}
            {cardsData.length > 1 && <BackgroundCard hasShadow={true} />}
            {cardsData.length > 2 && <BackgroundCard angle={3} />}
            {cardsData.length > 3 && <BackgroundCard angle={-3} />}
        </div>
    )
}

export default CardQueue