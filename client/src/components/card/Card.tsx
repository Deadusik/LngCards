import { FC, useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import playSvgSrc from '../../assets/svgs/sound.svg'
import { SPACE } from '../../utils/constants'
import { isOffset } from '../../utils/type'
import { getProgreesFromRange } from '../../utils/math'
import PlayButton from '../ui/button/PlayButton'
import ActionLabel from './ActionLabel'

enum CardDirection {
    ToStudy = 'study way',
    ToGotIt = 'gotit way',
    ToDelete = 'delete way',
    Deadzone = 'deadzone'
}

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
    const gotItLabelRef = useRef<HTMLDivElement>(null)
    const studyAgainLabelRef = useRef<HTMLDivElement>(null)
    const deleteLabelRef = useRef<HTMLDivElement>(null)
    const frontContentRef = useRef<HTMLDivElement>(null)
    const backContentRef = useRef<HTMLDivElement>(null)
    // constats
    const ACTION_MULTIPLIER = getActionMultiplier()
    const DEAD_ZONE = 50 * ACTION_MULTIPLIER
    const GOT_IT = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
    const STUDY_AGAIN = (-100 - DEAD_ZONE) * ACTION_MULTIPLIER
    const DELETE_OFFSET = (150 + DEAD_ZONE) * ACTION_MULTIPLIER
    const MIN_OPACITY = '0'
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

        appearByOffset()
    }

    const resetLabelsOpacity = () => {
        if (gotItLabelRef.current && studyAgainLabelRef.current && deleteLabelRef.current) {
            gotItLabelRef.current.style.opacity = MIN_OPACITY
            studyAgainLabelRef.current.style.opacity = MIN_OPACITY
            deleteLabelRef.current.style.opacity = MIN_OPACITY
        }
    }

    const resetCard = () => {
        if (cardRef.current) {
            cardRef.current.style.left = '0px'
            cardRef.current.style.top = '0px'
            cardRef.current.style.transform = 'rotate(0deg)'
            setPrimaryCursorPoint({ x: 0, y: 0 })
        }

        resetLabelsOpacity()
    }

    // set action for card by offset
    const actionByOffset = (offset: CardOffset) => {
        if (cardRef.current) {
            if (offset.y > DELETE_OFFSET && offset.x < DEAD_ZONE && offset.x > -DEAD_ZONE) {
                // DEV!
                console.log('delete')
                cardRef.current.remove()
                return
            }
            else if (offset.x > GOT_IT) {
                // DEV!
                console.log('got it')
                cardRef.current.remove()
            } else if (offset.x < STUDY_AGAIN) {
                // DEV!
                console.log('study')
                cardRef.current.remove()
            }
        }
    }

    // set opacity for label by card offset
    const appearByOffset = () => {
        if (gotItLabelRef.current && studyAgainLabelRef.current && deleteLabelRef.current) {
            switch (cardDirection) {
                case CardDirection.ToGotIt: {
                    gotItLabelRef.current.style.opacity = offsetToOpacity(moveOffset.x)
                    studyAgainLabelRef.current.style.opacity = MIN_OPACITY
                    deleteLabelRef.current.style.opacity = MIN_OPACITY
                    break
                }
                case CardDirection.ToStudy: {
                    studyAgainLabelRef.current.style.opacity = offsetToOpacity(moveOffset.x)
                    gotItLabelRef.current.style.opacity = MIN_OPACITY
                    deleteLabelRef.current.style.opacity = MIN_OPACITY
                    break
                }
                case CardDirection.ToDelete: {
                    deleteLabelRef.current.style.opacity = offsetToOpacity(moveOffset)
                    gotItLabelRef.current.style.opacity = MIN_OPACITY
                    studyAgainLabelRef.current.style.opacity = MIN_OPACITY
                    break
                }
                default: {
                    resetLabelsOpacity()
                }
            }
        }
    }

    function offsetToOpacity(cardOffset: number): string
    function offsetToOpacity(cardOffset: { x: number, y: number }): string

    // converting card offset to label opacity
    function offsetToOpacity(cardOffset: any): string {
        const MAX_OFFSET = (100 + DEAD_ZONE) * ACTION_MULTIPLIER
        const MIN_OFFSET = DEAD_ZONE

        // got it && study again labels opacity controller
        if (typeof cardOffset === 'number') {
            const positiveOffset = Math.abs(cardOffset);
            return getProgreesFromRange(MIN_OFFSET, MAX_OFFSET, positiveOffset).toFixed(1)
        } else if (isOffset(cardOffset)) { // delete label opacity controller
            const positiveOffset = { x: Math.abs(cardOffset.x), y: Math.abs(cardOffset.y) }
            const yOpacity = getProgreesFromRange(MIN_OFFSET, DELETE_OFFSET, positiveOffset.y)
            const xOpacity = getProgreesFromRange(DEAD_ZONE, 0, positiveOffset.x)
            const opacity = yOpacity * xOpacity
            return opacity.toFixed(1)
        }

        return MIN_OPACITY
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
            { /* got it */}
            <div className={styles.GotItLabel}
                ref={gotItLabelRef}>
                <h2 className={styles.ActionLabel__text}>Got it</h2>
            </div>
            { /* study again */}
            <div className={styles.StudyAgainLabel}
                ref={studyAgainLabelRef}>
                <h2 className={styles.ActionLabel__text}>Study again</h2>
            </div>
            { /* delete */}
            <div className={styles.DeleteLabel}
                ref={deleteLabelRef}>
                <h2 className={styles.ActionLabel__text}>Delete</h2>
            </div>
            <ActionLabel text='Got It' left='20px' top='20px' rotaiton='-20deg' />
        </div >
    )
}

export default Card