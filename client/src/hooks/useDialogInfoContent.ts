import { FC } from "react";
import ToLearnDialogContent from "../components/dialog/learn_info/ToLearnDialogContent";
import { CardState } from "../utils/enum";
import KnownDialogContent from "../components/dialog/learn_info/KnownDialogContent";
import LearnedDialogContent from "../components/dialog/learn_info/LearnedDialogContent";


export const useDialogInfoContent = (state: CardState): FC => {
    switch (state) {
        case CardState.toLearn: {
            return ToLearnDialogContent
        }
        case CardState.known: {
            return KnownDialogContent
        }
        case CardState.learned: {
            return LearnedDialogContent
        }
        default: {
            return ToLearnDialogContent
        }
    }
}