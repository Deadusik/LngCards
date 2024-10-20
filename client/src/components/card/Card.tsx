import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import { SPACE } from '../../utils/constants'
import ActionLabel from './ActionLabel'
import { CardDirection } from '../../utils/enum'
import { gray, green, red } from '../../utils/colors'
import HintLabel from './HintLabel'
import CardContent from './CardContent'
import { pronounceText } from '../../utils/functins'

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
    isContentVisible: boolean
    deleteCallback: () => void
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
    isContentVisible,
    flippedCallback,
    deleteCallback
}) => {
    // event states
    const [isFrontSide, setIsFrontSide] = useState(true)
    const [isFlipAnimationActive, setIsFlipAnimationActive] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [isCardWasMoved, setIsCardWasMoved] = useState(false)
    // states
    const [primaryCursorPoint, setPrimaryCursorPoint] = useState({ x: 0, y: 0 } as CardOffset)
    const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 })
    const [cardDirection, setCardDirection] = useState<CardDirection>(CardDirection.Deadzone)
    // card style depends on conditions
    const cardStyle = useMemo(() => {
        const inactiveStyle = isActive ? '' : styles.Card_inactive
        const flipStyles = isFlipAnimationActive ? [styles.Card_inactive, styles.Card_flipped].join(SPACE) : ''
        const droppedNoActionStyles = isCardWasMoved && !isMouseDown ? styles.Card_deadZoneDropped : ''
        return [flipStyles, droppedNoActionStyles, inactiveStyle, styles.Card].join(SPACE)
    }, [isFlipAnimationActive, isCardWasMoved, isMouseDown, isActive])
    // refs
    const cardRef = useRef<HTMLDivElement>(null)
    // constats
    const ACTION_MULTIPLIER = getActionMultiplier()
    const DEAD_ZONE = 50 * ACTION_MULTIPLIER
    const HORIZONTAL_ACTION_ZONE = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
    const VERTICAL_ACTION_ZONE = (150 + DEAD_ZONE) * ACTION_MULTIPLIER
    const FLIP_ANIMATION_TIME = 600
    const CARD_ROTATION_RATE = 20

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
            cardRef.current.style.transform = `rotate(${(primaryCursorPoint.x - client.x) / CARD_ROTATION_RATE}deg)`
        }
    }

    // set card direction value by offset including dead zone
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
            cardRef.current.style.transform = 'rotate(0deg)'
            setPrimaryCursorPoint({ x: 0, y: 0 })
            setCardDirection(CardDirection.Deadzone)
        }
    }

    // set action for card by offset
    const actionByOffset = (offset: CardOffset) => {
        if (cardRef.current) {
            if (offset.y > VERTICAL_ACTION_ZONE && CardDirection.ToDelete) {
                // DEV!
                console.log('delete')
                deleteCallback()
                return
            }
            else if (offset.x > HORIZONTAL_ACTION_ZONE) {
                // DEV!
                console.log('got it')
                deleteCallback()
            } else if (offset.x < -HORIZONTAL_ACTION_ZONE) {
                // DEV!
                console.log('study')
                deleteCallback()
            }
        }
    }

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
            setMoveOffset({ x: 0, y: 0 })
            setIsMouseDown(false)
            resetCard()
        }
    }

    // mobile handlers 
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
            <CardContent
                toForeignLanguage={toForeignLanguage}
                nativeWord={nativeWord}
                foreignWord={foreignWord}
                isFrontContent={isFrontSide}
                example={example}
                src={src}
                isVisible={isContentVisible} />
            { /* action labels */}
            <ActionLabel
                text='Got It'
                triggerDirection={CardDirection.ToGotIt}
                cardDirection={cardDirection}
                cardRestoreTrigger={isMouseDown}
                offsetX={moveOffset.x}
                deadActionZone={DEAD_ZONE}
                horizontalActionZone={HORIZONTAL_ACTION_ZONE}
                left='20px'
                top='40px'
                rotaiton='-20deg' />
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
                right='20px'
                top='40px'
                rotaiton='20deg'
                color={red} />
            { /* hint labels */}
            <HintLabel
                conditionText="If you didn't know"
                hintText='swipe left'
                top='20px'
                left='7%'
                color={red}
                isDisabled={isFrontSide}
                isActive={isCardWasMoved && !isMouseDown} />
            <HintLabel
                conditionText="If you were right"
                hintText='swipe right'
                top='20px'
                right='7%'
                color={green}
                isDisabled={isFrontSide}
                isActive={isCardWasMoved && !isMouseDown}
                iconRotation='180deg' />
        </div >
    )
}

export default Card