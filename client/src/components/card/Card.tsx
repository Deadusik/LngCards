import { FC, useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import playSvgSrc from '../../assets/svgs/sound.svg'
import { SPACE } from '../../utils/constants'
import PlayButton from '../ui/button/PlayButton'
import ActionLabel from './ActionLabel'
import { CardDirection } from '../../utils/enum'
import { gray, green, red } from '../../utils/colors'
import HintLabel from './HintLabel'

export interface CardOffset {
    x: number
    y: number
}

interface Props {
    isActive?: boolean
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>
}

const Card: FC<Props> = () => {
    // event states
    const [isFrontSide, setIsFrontSide] = useState(true)
    const [isFlipAnimationActive, setIsFlipAnimationActive] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    // states
    const [primaryCursorPoint, setPrimaryCursorPoint] = useState({ x: 0, y: 0 } as CardOffset)
    const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 })
    const [cardDirection, setCardDirection] = useState<CardDirection>(CardDirection.Deadzone)
    // refs
    const cardRef = useRef<HTMLDivElement>(null)
    const frontContentRef = useRef<HTMLDivElement>(null)
    const backContentRef = useRef<HTMLDivElement>(null)
    // constats
    const ACTION_MULTIPLIER = getActionMultiplier()
    const DEAD_ZONE = 50 * ACTION_MULTIPLIER
    const HORIZONTAL_ACTION_ZONE = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
    const VERTICAL_ACTION_ZONE = (150 + DEAD_ZONE) * ACTION_MULTIPLIER
    const FLIP_ANIMATION_TIME = 600
    const CARD_ROTATION_RATE = 20

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

    const rotateCard = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const client = getClientfromPlatform(event)

        if (cardRef.current && client) {
            cardRef.current.style.transform = `rotate(${(primaryCursorPoint.x - client.x) / CARD_ROTATION_RATE}deg)`
        }
    }

    // set card side value by offset including dead zone
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
        }
    }

    // set action for card by offset
    const actionByOffset = (offset: CardOffset) => {
        if (cardRef.current) {
            if (offset.y > VERTICAL_ACTION_ZONE && offset.x < DEAD_ZONE && offset.x > -DEAD_ZONE) {
                // DEV!
                console.log('delete')
                cardRef.current.remove()
                return
            }
            else if (offset.x > HORIZONTAL_ACTION_ZONE) {
                // DEV!
                console.log('got it')
                cardRef.current.remove()
            } else if (offset.x < -HORIZONTAL_ACTION_ZONE) {
                // DEV!
                console.log('study')
                cardRef.current.remove()
            }
        }
    }

    const getCardStyle = (): string => {
        const flipStyles = isFlipAnimationActive ? [styles.Card_inactive, styles.Card_flipped].join(SPACE) : ''
        const droppedNoActionStyles = !isMouseDown ? styles.Card_deadZoneDropped : ''
        return [flipStyles, droppedNoActionStyles, styles.Card].join(SPACE)
    }

    const onCardClickHandler = () => {
        if (isFrontSide)
            setIsFlipAnimationActive(true)
    }

    const onMouseMoveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown && isMouseOver && !isFrontSide) {
            rotateCard(event)
            moveCard(event)
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

    const onMouseEnterHandler = () => {
        setIsMouseOver(true)
    }

    const onMouseLeaveHandler = () => {
        setIsMouseOver(false)
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
        }
    }

    useEffect(() => {
        if (isFlipAnimationActive) {
            setTimeout(() => {
                setIsFrontSide(false)
                setTimeout(() => {
                    setIsFlipAnimationActive(false)
                }, FLIP_ANIMATION_TIME / 2)
            }, FLIP_ANIMATION_TIME / 2)
        }
    }, [isFlipAnimationActive])

    return (
        <div className={getCardStyle()}
            ref={cardRef}
            // events
            onMouseMove={onMouseMoveHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onCardClickHandler}
            // mobile events
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}>
            { /* content */}
            <div className={styles.Card__content}>
                {
                    isFrontSide ?
                        <div className={styles.FrontContent} ref={frontContentRef}>
                            <img className={styles.CardContent__picture /*extended*/} src={testImgSrc} />
                            <h1 className={styles.CardContent__word /*extended*/}>Apple</h1>
                            <p className={styles.FrontContent__example}>I like to eat apples and bananas</p>
                        </div>
                        :
                        <div className={styles.BackContent} ref={backContentRef}>
                            <img className={styles.CardContent__picture} src={testImgSrc} />
                            <p className={styles.BackContent__translate}>Яблуко</p>
                            <div className={styles.BackContent__wordBlock}>
                                <div className={styles.BackContent__playButton}>
                                    <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
                                </div>
                                <h1 className={styles.BackContent__word}>Apple</h1>
                            </div>
                            <hr className={styles.BackContent__divider} />
                            <div className={styles.BackContent__exampleBlock}>
                                <div className={styles.BackContent__playButton}>
                                    <PlayButton iconSrc={playSvgSrc} size='20px' onClick={() => { }} />
                                </div>
                                <p className={styles.BackContent__exampleText}>
                                    I like to eat apples and bananas
                                </p>
                            </div>
                        </div>
                }
            </div>
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
                color={red} />
            <HintLabel
                conditionText="If you were right"
                hintText='swipe right'
                top='20px'
                right='7%'
                color={green}
                iconRotation='180deg' />
        </div >
    )
}

export default Card