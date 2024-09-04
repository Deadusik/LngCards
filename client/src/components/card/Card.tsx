import { useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import { SPACE } from '../../utils/constants'
import { isOffset } from '../../utils/type'
import { getProgreesFromRange } from '../../utils/math'

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

const Card: React.FC = () => {
    // event states
    const [isFrontSide, setIsFrontSide] = useState(true)
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
    // constats
    const DEAD_ZONE = 50
    const GOT_IT = 100 + DEAD_ZONE
    const STUDY_AGAIN = -100 - DEAD_ZONE
    const DELETE_OFFSET = 300 + DEAD_ZONE
    const MIN_OPACITY = '0'

    const rotateCard = (event: MouseEvent) => {
        if (cardRef.current) {
            cardRef.current.style.transform = `rotate(${(primaryCursorPoint.x - event.clientX) / 10}deg)`
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

        // DEV!
        //console.log(cardDirection.toString())
    }

    const moveCard = (event: MouseEvent) => {
        if (cardRef.current) {
            const offsetX = event.clientX - primaryCursorPoint.x
            const offsetY = event.clientY - primaryCursorPoint.y
            cardRef.current.style.left = `${offsetX}px`
            cardRef.current.style.top = `${offsetY}px`

            const offset = {
                x: offsetX,
                y: offsetY
            } as CardOffset

            setMoveOffset(offset)
            setCardSideByOffset(offset)

            // DEV!
            //console.log('offset:', offset) 
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
        // DEV!
        //console.log('opacity x:', gotItLabelRef.current.style.opacity = offsetToOpacity(moveOffset.x))

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
        const MAX_OFFSET = 100 + DEAD_ZONE
        const MIN_OFFSET = DEAD_ZONE


        // got it && study again labels opacity controller
        if (typeof cardOffset === 'number') {
            const positiveOffset = Math.abs(cardOffset);
            return getProgreesFromRange(MIN_OFFSET, MAX_OFFSET, positiveOffset).toFixed(1)
        } else if (isOffset(cardOffset)) { // delete label opacity controller
            const positiveOffset = { x: Math.abs(cardOffset.x), y: Math.abs(cardOffset.y) }

            const yOpacity = getProgreesFromRange(MIN_OFFSET, MAX_OFFSET, positiveOffset.y)
            const xOpacity = getProgreesFromRange(DEAD_ZONE, 0, positiveOffset.x)
            const opacity = yOpacity * xOpacity
            console.log('opacity', opacity.toFixed(1))
            return opacity.toFixed(1)
        }

        return MIN_OPACITY
    }



    const onCardClickHandler = () => {
        setIsFrontSide(false)
    }

    const onMouseMoveHandler = (event: MouseEvent) => {
        if (isMouseDown && isMouseOver && !isFrontSide && cardRef.current) {
            rotateCard(event)
            moveCard(event)
        }
    }

    const onMouseDownHandler = (event: MouseEvent) => {
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

    return (
        <div className={
            isFrontSide ?
                styles.Card
                :
                [styles.Card, styles.Card_active].join(SPACE)}
            ref={cardRef}
            onMouseMove={onMouseMoveHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onCardClickHandler}>
            { /* content */}
            <div className={styles.Card__content}>
                {
                    isFrontSide ?
                        <div className={styles.FrontContent}>
                            <img className={styles.CardContent__picture /*extended*/} src={testImgSrc} />
                            <h1 className={styles.CardContent__name /*extended*/}>Багато часу тому</h1>
                            <p className={styles.FrontContent__example}>In a galaxy, far away...</p>
                        </div>
                        :
                        <div className={styles.BackContent}>
                            <img className={styles.CardContent__picture} src={testImgSrc} />
                            <p className={styles.BackContent__translated}>Багато часу тому</p>
                            <h1 className={styles.BackContent__translation}>Long time ago</h1>
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
        </div >
    )
}

export default Card