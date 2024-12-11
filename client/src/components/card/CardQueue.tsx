import React, { FC, useState } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
// components
import Card from "./Card"
import BackgroundCard from "./BackgroundCard"
import IconButton from "../ui/button/IconButton"
// svgs 
import { default as PlusSvg } from '../../assets/svgs/plus.svg?react'
import { default as BackSvg } from '../../assets/svgs/arrow_line.svg?react'
// utils
import { CardDirection } from "../../utils/enum"
import { blue } from "../../utils/colors"
// DEV! svg src
import appleSvgSrc from '../../assets/test/svgs/apple.svg'
import dogSvgSrc from '../../assets/test/svgs/dog.svg'
import houseSvgSrc from '../../assets/test/svgs/house.svg'
import airplaceSvgSrc from '../../assets/test/svgs/airplane.svg'

interface CardEntity {
    nativeWord: string
    foreignWord: string
    example?: string
    src?: string
    toForeignLanguage: boolean
}

const CardQueue: FC = () => {
    const [isTopCardFlipped, setIsTopCardFlipped] = useState(false)
    // DEV! test data
    const [cardsData, setCardsData] = useState<CardEntity[]>(
        [
            {
                nativeWord: 'Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата',
                foreignWord: 'House House House House House House House House House House House House House House House House House House House House House House House House House House House',
                example: 'The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valleyThe house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valleyThe house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
            {
                nativeWord: 'Привіт',
                foreignWord: 'Hello',
                toForeignLanguage: true
            },
            {
                nativeWord: 'Яблуко',
                foreignWord: 'Apple',
                example: 'An apple a day keeps the doctor away',
                src: appleSvgSrc,
                toForeignLanguage: false,
            },
            {
                nativeWord: 'Собака',
                foreignWord: 'Dog',
                example: 'The dog barked loudly at the stranger',
                src: dogSvgSrc,
                toForeignLanguage: true
            },
            {
                nativeWord: 'Літак',
                foreignWord: 'Airplane',
                example: 'The new airplane model is faster and more fuel-efficient',
                src: airplaceSvgSrc,
                toForeignLanguage: false,
            },
            {
                nativeWord: 'Хата',
                foreignWord: 'House',
                example: 'The house on the hill has a beautiful view of the valley',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
        ]
    )

    // delete callback for cards
    const onDeleteHandler = (cardAction: CardDirection) => {
        // DEV!
        console.log('card action', cardAction)

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
                    {/* show nav buttons if last card flipped or cards queue is empty */}
                    {((isTopCardFlipped && cardsData.length == 1) || cardsData.length == 0) &&
                        <div className={styles.CardQueue__content}>
                            <IconButton
                                content={BackSvg}
                                size={100}
                                stroke={blue}
                                triggerSize={'150px'}
                                onClick={() => { console.log('Back Icon Button') }} />
                            <IconButton
                                content={PlusSvg}
                                size={100}
                                stroke={blue}
                                triggerSize={'150px'}
                                onClick={() => { console.log('Plus Icon Button') }} />
                        </div>
                    }
                </React.Fragment>
            }
            { /* background depends on queue of cards */}
            {cardsData.length > 1 && <BackgroundCard hasShadow={true} />}
            {cardsData.length > 2 && <BackgroundCard angle={3} />}
            {cardsData.length > 3 && <BackgroundCard angle={-3} />}
        </div>
    )
}

export default CardQueue