import MultipleChoiceQuestionModel from "./multiple.choice.question.model";

interface MultipleChoiceQuestionSaveModel {

    id: number;
    question: MultipleChoiceQuestionModel;
    answer: string;
    time: string;
    date: string;
}

export default MultipleChoiceQuestionSaveModel;