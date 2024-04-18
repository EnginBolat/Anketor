interface ScaleQuestionModel {
    id: number;
    question: string;
    questionType: 'scale';
    scale: {
        min: number;
        max: number;
        label_left: string;
        label_right: string;
    };
    correctAnswer: string; // veya boş bırakılabilir, scale tipinde doğru cevap yoktur
}

export default ScaleQuestionModel;