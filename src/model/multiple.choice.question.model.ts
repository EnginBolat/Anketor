interface MultipleChoiceQuestionModel {
    id: number;
    question: string;
    questionType: 'multiple_choice';
    answers: string[];
    correctAnswer: string;
}

export default MultipleChoiceQuestionModel;