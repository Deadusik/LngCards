import { FC } from "react";
import ToLearnDialogContent from "../components/dialog/learn_info/ToLearnDialogContent";
import { CardState } from "../utils/enum";


export const useDialogInfoContent = (state: CardState): FC => {
    switch (state) {
        case CardState.toLearn: {
            return ToLearnDialogContent
        }
        default: {
            return ToLearnDialogContent
        }
    }
}