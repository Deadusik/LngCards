import React, { FC, useEffect, useState } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
import Card from "./Card"
import BackgroundCard from "./BackgroundCard"
import { CardDirection } from "../../utils/enum"
import IconButton from "../ui/button/IconButton"
import { default as PlusSvg } from '../../assets/svgs/plus.svg?react'
import { default as BackSvg } from '../../assets/svgs/arrow_line.svg?react'
import { blue } from "../../utils/colors"
//svg src
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
    // DEV! test data
    const [cardsData, setCardsData] = useState<CardEntity[]>(
        [
            {
                nativeWord: 'Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата',
                foreignWord: 'House House House House House House House House House House House House House House House House House House House House House House House House House House House',
                example: 'She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply. She sold her house cheaply.',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
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
                example: 'She sold her house cheaply.',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
        ]
    )

    const onDeleteHandler = (cardAction: CardDirection) => {
        // DEV!
        console.log('external card action', cardAction)

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

    useEffect(() => {
        // DEV!
        console.log('cards data: ', cardsData)
        console.log('is top flipped: ', isTopCardFlipped)
    }, [cardsData, isTopCardFlipped])

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
            { /* background */}
            {cardsData.length > 1 && <BackgroundCard hasShadow={true} />}
            {cardsData.length > 2 && <BackgroundCard angle={3} />}
            {cardsData.length > 3 && <BackgroundCard angle={-3} />}
        </div>
    )
}

export default CardQueue