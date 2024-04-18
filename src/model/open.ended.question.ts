interface OpenEndedQuestionModel {
    id: number;
    question: string;
    questionType: 'open-ended';
    correctAnswer: string; // veya boş bırakılabilir, açık uçlu sorularda doğru cevap yoktur
}

export default OpenEndedQuestionModel;