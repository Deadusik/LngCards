import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
// components
import FrontContent from './FrontContent'
import BackContent from './BackContent'
import ActionLabel from './ActionLabel'
import HintLabel from './HintLabel'
// utils
import { CardDirection } from '../../utils/enum'
import { gray, green, red } from '../../utils/colors'
import { pronounceText } from '../../utils/functins'
import { SPACE } from '../../utils/constants'

export interface CardOffset {
    x: number
    y: number
}

interface Props {
    nativeWord: string
    foreignWord: string
    toForeignLanguage: boolean
    example?: string | null
    src?: string | null
    isActive: boolean
    isFrontContentVisible: boolean
    deleteCallback: (cardAction: CardDirection) => void
    flippedCallback: () => void
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>
}

const Card: FC<Props> = ({
    nativeWord,
    foreignWord,
    toForeignLanguage,
    example,
    src,
    isActive,
    isFrontContentVisible,
    flippedCallback,
    deleteCallback
}) => {
    // boolean states
    const [isFrontSide, setIsFrontSide] = useState(true)
    const [isFlipAnimationActive, setIsFlipAnimationActive] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [isCardWasMoved, setIsCardWasMoved] = useState(false)
    // states
    const [cardAction, setCardAction] = useState<CardDirection>(CardDirection.Deadzone)
    const [cardDirection, setCardDirection] = useState<CardDirection>(CardDirection.Deadzone)
    const [primaryCursorPoint, setPrimaryCursorPoint] = useState({ x: 0, y: 0 } as CardOffset)
    const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 } as CardOffset)

    // card style depends on conditions
    const cardStyle = useMemo(() => {
        // disable card
        const inactiveStyle = isActive ? '' : styles.Card_inactive
        // freeze the card during the flip animation.
        const flipStyle = isFlipAnimationActive ? [styles.Card_inactive, styles.Card_flipped].join(SPACE) : ''
        // play drop anim
        const droppedNoActionStyles = isCardWasMoved && !isMouseDown ? styles.Card_deadZoneDropped : ''
        // keep card flipped 
        const flipedStyle = !isFrontSide ? styles.Card_flipped : ''
        // set anim for card action (got it / study again / delete)
        const onDeleteStyle = cardAction !== CardDirection.Deadzone ? getOnDeleteStyle() : ''
        // join all styles
        return [flipStyle, droppedNoActionStyles, inactiveStyle, flipedStyle, onDeleteStyle, styles.Card].join(SPACE)
    }, [isFlipAnimationActive, isCardWasMoved, isMouseDown, isFrontSide, cardAction, isActive])

    // refs
    const cardRef = useRef<HTMLDivElement>(null)

    // constats
    const ACTION_MULTIPLIER = getActionMultiplier()
    const DEAD_ZONE = 50 * ACTION_MULTIPLIER
    const HORIZONTAL_ACTION_ZONE = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
    const VERTICAL_ACTION_ZONE = (150 + DEAD_ZONE) * ACTION_MULTIPLIER
    const FLIP_ANIMATION_TIME = 600
    const CARD_ROTATION_RATE = 20

    // get card anim style for action
    function getOnDeleteStyle(): string {
        let style = ''
        switch (cardAction) {
            case CardDirection.ToStudy:
                {
                    style = styles.Card_studyAgain
                    break
                }
            case CardDirection.ToGotIt:
                {
                    style = styles.Card_gotIt
                    break
                }
            case CardDirection.ToDelete:
                {
                    style = styles.Card_delete
                    break
                }
        }

        return style
    }

    // if mobile device then action multiplier smaller
    // and we need move less card to execute some aciton
    function getActionMultiplier(): number {
        const XS_TRIGGER = 450
        const XS_MULTIPLIER = 0.5
        const DEFAULT_MULTIPLIER = 1

        const clientWidth = window.innerWidth
        const multiplier = clientWidth < XS_TRIGGER ? XS_MULTIPLIER : DEFAULT_MULTIPLIER

        return multiplier
    }

    // get client coordinates depends on platform (pc or mobile)
    const getClientfromPlatform = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): CardOffset | undefined => {
        let client: CardOffset | undefined

        if ('clientX' in event) {
            client = { x: event.clientX, y: event.clientY }
        } else if ('touches' in event) {
            client = { x: event.touches[0].clientX, y: event.touches[0].clientY }
        }

        return client
    }

    // card rotation depends on card offset
    const rotateCard = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const client = getClientfromPlatform(event)

        if (cardRef.current && client) {
            cardRef.current.style.transform = `rotate(${(primaryCursorPoint.x - client.x) / CARD_ROTATION_RATE}deg) rotateY(180deg)`
        }
    }

    // set CardDirection value by offset including dead zone
    // we use CardDirection to determine which <ActionLabel/> will be visible.
    const setCardSideByOffset = (offset: CardOffset) => {
        if (offset.y > DEAD_ZONE && offset.x < DEAD_ZONE && offset.x > -DEAD_ZONE)
            setCardDirection(CardDirection.ToDelete)
        else if (offset.x > DEAD_ZONE)
            setCardDirection(CardDirection.ToGotIt)
        else if (offset.x < -DEAD_ZONE)
            setCardDirection(CardDirection.ToStudy)
        else
            setCardDirection(CardDirection.Deadzone)
    }

    const moveCard = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const client = getClientfromPlatform(event)

        if (cardRef.current && client) {
            const offsetX = client.x - primaryCursorPoint.x
            const offsetY = client.y - primaryCursorPoint.y
            cardRef.current.style.left = `${offsetX}px`
            cardRef.current.style.top = `${offsetY}px`

            const offset = {
                x: offsetX,
                y: offsetY
            } as CardOffset

            setMoveOffset(offset)
            setCardSideByOffset(offset)
        }
    }

    const resetCard = () => {
        if (cardRef.current) {
            cardRef.current.style.left = '0px'
            cardRef.current.style.top = '0px'
            cardRef.current.style.transform = 'rotate(0deg) rotateY(180deg)'
            setPrimaryCursorPoint({ x: 0, y: 0 })
            setCardDirection(CardDirection.Deadzone)
        }
    }

    // set action for card by offset (got it / study again / delete)
    const actionByOffset = (offset: CardOffset) => {
        if (cardRef.current) {
            if (offset.y > VERTICAL_ACTION_ZONE && offset.x < DEAD_ZONE / 2 && offset.x > -DEAD_ZONE / 2 && CardDirection.ToDelete) {
                const currentCardAction = CardDirection.ToDelete
                setCardAction(currentCardAction)
                // timeout for delete animation
                setTimeout(() => {
                    deleteCallback(currentCardAction)
                }, 200)
                return
            }
            else if (offset.x > HORIZONTAL_ACTION_ZONE) {
                const currentCardAction = CardDirection.ToGotIt
                setCardAction(currentCardAction)
                // timeout for got it animation
                setTimeout(() => {
                    deleteCallback(currentCardAction)
                }, 200)
            } else if (offset.x < -HORIZONTAL_ACTION_ZONE) {
                const currentCardAction = CardDirection.ToStudy
                setCardAction(currentCardAction)
                // timeout for study again animation
                setTimeout(() => {
                    if (cardRef.current)
                        cardRef.current.style.zIndex = '0'
                    setTimeout(() => {
                        deleteCallback(currentCardAction)
                    }, 150)
                }, 150)
            }
        }
    }

    // mouse handleres //
    const onCardClickHandler = () => {
        if (isFrontSide)
            setIsFlipAnimationActive(true)
        else setIsCardWasMoved(true)
    }

    const onMouseMoveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown && !isFrontSide) {
            rotateCard(event)
            moveCard(event)
            setIsCardWasMoved(true)
        }
    }

    const onMouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseDown(true)
        setPrimaryCursorPoint({ x: event.clientX, y: event.clientY })
    }

    const onMouseUpHandler = () => {
        setIsMouseDown(false)
        actionByOffset(moveOffset)
        resetCard()
    }

    const onMouseLeaveHandler = () => {
        if (!isFrontSide && primaryCursorPoint.x !== 0 && primaryCursorPoint.y !== 0) {
            // to prevent offset action
            setMoveOffset({ x: 0, y: 0 })
            setIsMouseDown(false)
            resetCard()
        }
    }

    // mobile handlers //
    const onTouchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        setIsMouseDown(true)
        setPrimaryCursorPoint({ x: event.touches[0].clientX, y: event.touches[0].clientY })
    }

    const onTouchEndHandler = () => {
        if (!isFrontSide)
            onMouseUpHandler()
    }

    const onTouchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!isFrontSide) {
            rotateCard(event)
            moveCard(event)
            setIsCardWasMoved(true)
        }
    }

    // card flip animation logic
    useEffect(() => {
        if (isFlipAnimationActive) {
            setTimeout(() => {
                setIsFrontSide(false)
                pronounceText(foreignWord)
                setTimeout(() => {
                    setIsFlipAnimationActive(false)
                    flippedCallback()
                }, FLIP_ANIMATION_TIME / 2)
            }, FLIP_ANIMATION_TIME / 2)
        }
    }, [isFlipAnimationActive])

    // resolve anim conflict when we move card
    // we set 0s transition for normal movement 
    useEffect(() => {
        if (isMouseDown && !isFrontSide && cardRef.current) {
            cardRef.current.style.transition = 'transform 0s ease-in-out'
        }
    }, [isMouseDown, isFrontSide]);

    return (
        <div className={cardStyle}
            ref={cardRef}
            // events
            onMouseMove={onMouseMoveHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onCardClickHandler}
            // mobile events
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}>
            { /* we need it to hide content for next card in queue
             to remove strange flip effect */}
            {isFrontContentVisible &&
                <FrontContent
                    toForeignLanguage={toForeignLanguage}
                    nativeWord={nativeWord}
                    foreignWord={foreignWord}
                    example={example}
                    src={src}
                />
            }
            <BackContent
                toForeignLanguage={toForeignLanguage}
                nativeWord={nativeWord}
                foreignWord={foreignWord}
                example={example}
                src={src}
            />
            {/* got it / study again / delete action labels */}
            <ActionLabel
                text='Got It'
                triggerDirection={CardDirection.ToGotIt}
                cardDirection={cardDirection}
                cardRestoreTrigger={isMouseDown}
                offsetX={moveOffset.x}
                deadActionZone={DEAD_ZONE}
                horizontalActionZone={HORIZONTAL_ACTION_ZONE}
                right='20px'
                top='40px'
                rotaiton='20deg' />
            <ActionLabel
                text='Delete'
                triggerDirection={CardDirection.ToDelete}
                cardDirection={cardDirection}
                cardRestoreTrigger={isMouseDown}
                offsetX={moveOffset.x}
                offsetY={moveOffset.y}
                deadActionZone={DEAD_ZONE}
                verticalActionZone={VERTICAL_ACTION_ZONE}
                right='50%'
                top='30px'
                rotaiton='3deg'
                color={gray} />
            <ActionLabel
                text='Study again'
                triggerDirection={CardDirection.ToStudy}
                cardDirection={cardDirection}
                cardRestoreTrigger={isMouseDown}
                offsetX={moveOffset.x}
                deadActionZone={DEAD_ZONE}
                horizontalActionZone={HORIZONTAL_ACTION_ZONE}
                left='20px'
                top='40px'
                rotaiton='-20deg'
                color={red} />
            { /* hint labels */}
            <HintLabel
                conditionText="If you didn't know"
                hintText='swipe left'
                top='20px'
                right='7%'
                color={red}
                isDisabled={isFrontSide || cardAction !== CardDirection.Deadzone}
                isActive={isCardWasMoved && !isMouseDown} />
            <HintLabel
                conditionText="If you were right"
                hintText='swipe right'
                top='20px'
                left='7%'
                color={green}
                isDisabled={isFrontSide || cardAction !== CardDirection.Deadzone}
                isActive={isCardWasMoved && !isMouseDown}
                iconRotation='180deg' />
        </div >
    )
}

export default Card