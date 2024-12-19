import React, { FC, useState } from "react"
import styles from '../../styles/components/card/CardQueue.module.scss'
import wrapperStyles from '../../styles/pages/Wrapper.module.scss'
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
import { SPACE } from "../../utils/constants"
// DEV! svg src
import appleSvgSrc from '../../assets/test/svgs/apple.svg'
import dogSvgSrc from '../../assets/test/svgs/dog.svg'
import houseSvgSrc from '../../assets/test/svgs/house.svg'
import airplaceSvgSrc from '../../assets/test/svgs/airplane.svg'

interface CardEntity {
    id: string
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
            // {
            //     id: 'card_' + Math.random().toFixed(5),
            //     nativeWord: 'Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата Хата',
            //     foreignWord: 'House House House House House House House House House House House House House House House House House House House House House House House House House House House',
            //     example: 'The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valleyThe house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valleyThe house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley The house on the hill has a beautiful view of the valley',
            //     src: houseSvgSrc,
            //     toForeignLanguage: true
            // },
            {
                id: 'card_' + Math.random().toFixed(5),
                nativeWord: 'Привіт',
                foreignWord: 'Hello',
                toForeignLanguage: true
            },
            {
                id: 'card_' + Math.random().toFixed(5),
                nativeWord: 'Яблуко',
                foreignWord: 'Apple',
                example: 'An apple a day keeps the doctor away',
                src: appleSvgSrc,
                toForeignLanguage: false,
            },
            {
                id: 'card_' + Math.random().toFixed(5),
                nativeWord: 'Собака',
                foreignWord: 'Dog',
                example: 'The dog barked loudly at the stranger',
                src: dogSvgSrc,
                toForeignLanguage: true
            },
            {
                id: 'card_' + Math.random().toFixed(5),
                nativeWord: 'Літак',
                foreignWord: 'Airplane',
                example: 'The new airplane model is faster and more fuel-efficient',
                src: airplaceSvgSrc,
                toForeignLanguage: false,
            },
            {
                id: 'card_' + Math.random().toFixed(5),
                nativeWord: 'Хата',
                foreignWord: 'House',
                example: 'The house on the hill has a beautiful view of the valley',
                src: houseSvgSrc,
                toForeignLanguage: true
            },
        ]
    )

    const popCard = () => {
        const newCardsData = [...cardsData]
        newCardsData.pop()

        if (newCardsData) {
            setCardsData(newCardsData)
            setIsTopCardFlipped(false)
        }
    }

    const shiftCard = () => {
        const newCardsData = [...cardsData];
        const lastCard = newCardsData.pop();
        //change id to update shifted card component state
        if (lastCard)
            lastCard.id += '_' + Math.random().toFixed(5)

        if (lastCard) {
            newCardsData.unshift(lastCard);
            setCardsData(newCardsData);
            setIsTopCardFlipped(false);
        }
    }

    const processCardAction = (cardAction: CardDirection) => {
        switch (cardAction) {
            case CardDirection.ToStudy: {
                shiftCard()
                break
            }
            case CardDirection.ToGotIt: {
                popCard()
                break
            }
            case CardDirection.ToDelete: {
                popCard()
                break
            }
            default: {
                return
            }
        }
    }

    // delete callback for cards
    const onDeleteHandler = (cardAction: CardDirection) => {
        console.log(cardAction)
        processCardAction(cardAction)
    }

    const onCardFlipHandler = () => {
        setIsTopCardFlipped(true)
    }

    return (
        <div className={[
            styles.CardQueue,
            wrapperStyles.content
        ].join(SPACE)}>
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
                                <Card key={card.id}
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