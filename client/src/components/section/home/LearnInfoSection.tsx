import { FC } from 'react'
import styles from '../../../styles/components/section/home/LearnInfoSection.module.scss'
import { CardState } from '../../../utils/enum'
import LearnInfo from '../../ui/info/LearnInfo'

interface Props {
    setDialogType: React.Dispatch<React.SetStateAction<CardState>>
    setDialogVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const LearnInfoSection: FC<Props> = ({ setDialogType, setDialogVisibility }) => {
    const ToLearnHandler = () => {
        setDialogType(CardState.toLearn)
        setDialogVisibility(true)
    }

    const KnownHandler = () => {
        setDialogType(CardState.known)
        setDialogVisibility(true)
    }

    const LearnedHandler = () => {
        setDialogType(CardState.learned)
        setDialogVisibility(true)
    }

    return (
        <div className={styles.mainBlock}>
            <LearnInfo modifierType={CardState.toLearn}
                onClick={ToLearnHandler} />
            <LearnInfo modifierType={CardState.known}
                onClick={KnownHandler} />
            <LearnInfo modifierType={CardState.learned}
                onClick={LearnedHandler} />
        </div>
    )
}

export default LearnInfoSection