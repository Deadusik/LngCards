import { CardState, InfoModifier } from "../utils/enum"

export const useLearnInfoModifier = (modifierType: CardState, styles: CSSModuleClasses): InfoModifier => {
    switch (modifierType) {
        case CardState.toLearn: {
            return {
                text: 'To learn',
                style: styles.mainBlock_toLearn,
                iconStyle: styles.icon_toLearn
            }
        }
        case CardState.known: {
            return {
                text: 'Known',
                style: styles.mainBlock_known,
                iconStyle: styles.icon_known
            }
        }
        case CardState.learned: {
            return {
                text: 'Learned',
                style: styles.mainBlock_learned,
                iconStyle: styles.icon_learned
            }
        }
        default:
            return {
                text: '',
                style: '',
                iconStyle: ''
            }
    }
}