import { AnyAction } from "redux";
import { TYPES } from "../actions/action-types";
import { Action, IQuizListItem } from "../models/index";

export interface IQuizInitialSate {
	quizListItem: IQuizListItem[],
	currentQuizItemIndex: number,
	score: number
}

const quizInitialSate: IQuizInitialSate = {
	quizListItem: [],
	currentQuizItemIndex: 0,
	score: 0
}
export const QuizReducer = (state = quizInitialSate, action: AnyAction): IQuizInitialSate => {
	switch (action.type) {
		case TYPES.getQuizListItems:
			return {
				...state,
				quizListItem: (action as Action<IQuizListItem[]>).payload
			}
		case TYPES.incrementScrore:
			return {
				...state,
				score: state.score + 1
			}
		case TYPES.setNextQuestion:
			return {
				...state,
				currentQuizItemIndex: state.currentQuizItemIndex + 1
			}
		case TYPES.restart:
			return {
				...state,
				currentQuizItemIndex: 0,
				score: 0
			}


		default:
			return state
	}
}