import { useRef, useState } from 'react'
import styles from '../../styles/components/card/Card.module.scss'
import testImgSrc from '../../assets/imgs/test/avatar.png'
import { SPACE } from '../../utils/constants'
import useNormilize from '../../hooks/useNormalize'

const Card: React.FC = () => {
    const [isFrontSide, setIsFrontSide] = useState(true)

    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const [primaryCursorPoint, setPrimaryCursorPoint] = useState({ x: 0, y: 0 })
    const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 })
    const [labelOpacity, setLabelOpacity] = useState(0)

    const cardRef = useRef<HTMLDivElement>(null)
    const gotItLabelRef = useRef<HTMLDivElement>(null)
    const studyAgainLabelRef = useRef<HTMLDivElement>(null)
    const deleteLabelRef = useRef<HTMLDivElement>(null)

    const GOT_IT = 100
    const STUDY_AGAIN = -100
    const DELETE_OFFSET = 100

    const rotateCard = (event: MouseEvent) => {
        if (cardRef.current) {
            cardRef.current.style.transform = `rotate(${(primaryCursorPoint.x - event.clientX) / 10}deg)`
        }
    }

    const moveCard = (event: MouseEvent) => {
        if (cardRef.current) {
            const offsetX = event.clientX - primaryCursorPoint.x
            const offsetY = event.clientY - primaryCursorPoint.y
            cardRef.current.style.left = `${offsetX}px`
            cardRef.current.style.top = `${offsetY}px`

            setMoveOffset({
                x: offsetX,
                y: offsetY
            })
        }

        appearByOffset()
    }

    const resetCard = () => {
        if (cardRef.current) {
            cardRef.current.style.left = '0px'
            cardRef.current.style.top = '0px'
            cardRef.current.style.transform = 'rotate(0deg)'
            setPrimaryCursorPoint({ x: 0, y: 0 })
        }
    }

    const actionByOffset = () => {
        if (cardRef) {
            if (moveOffset.x > GOT_IT) {
                cardRef.current?.style.opacity
            } else if (moveOffset.x < STUDY_AGAIN) {
                cardRef.current?.remove()
            }

            if (moveOffset.y > DELETE_OFFSET) {
                cardRef.current?.remove()
            }
        }
    }

    const appearByOffset = () => {
        if (moveOffset.x > GOT_IT && gotItLabelRef.current) {
            gotItLabelRef.current.style.opacity = normalize(moveOffset.x, GOT_IT, 0).toString()
            console.log('normalized', normalize(moveOffset.x, GOT_IT, 0).toString())
        } else if (moveOffset.x < STUDY_AGAIN && studyAgainLabelRef.current) {
            studyAgainLabelRef.current
        }

        if (moveOffset.y > DELETE_OFFSET && deleteLabelRef.current) {
            deleteLabelRef.current
        }
    }

    const normalize = (value: number, max: number, min: number): number => {
        return (value - min) / (max - min)
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
        actionByOffset()
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