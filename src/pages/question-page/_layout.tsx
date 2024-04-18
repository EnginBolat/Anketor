import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StatusBar, Dimensions, TouchableOpacity, TextInput } from 'react-native';

import questions from '../../utils/questions.json';
import { PrimaryButton, PrimaryInput } from '../../components';
import { MultipleChoiceQuestionModel, MultipleChoiceQuestionSaveModel, ScaleQuestionModel, OpenEndedQuestionModel } from '../../model';

const QuestionPage = () => {
    const { height, width } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const flatlistRef = useRef<FlatList>(null);

    const handleNextButton = () => {
        if (activeIndex < questions.length - 1) {
            setActiveIndex(activeIndex + 1);
            flatlistRef.current?.scrollToIndex({ animated: true, index: activeIndex + 1 });
        }
    };

    const handlePrevButton = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            flatlistRef.current?.scrollToIndex({ animated: true, index: activeIndex - 1 });
        }
    };

    const handleAnswer = (answer: string) => {
        const questionId = questions[activeIndex].id;
        setSelectedAnswers(prevState => ({ ...prevState, [questionId]: answer }));
        handleNextButton();
    };

    const handleFinishButton = async () => {
        console.log('Test bitirildi');
        try {
            // await AsyncStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
            // Navigation or any other action after saving to localStorage
        } catch (error) {
            console.error('Error saving selected answers to AsyncStorage:', error);
        }
    };


    const renderIndicator = ({ index }: { index: number }) => (
        <View
            className={`h-6 w-8 rounded-md ${index === activeIndex ? 'bg-gray-100' : 'bg-gray-200'} mr-0.5 justify-center items-center`}
        >
            <Text style={{ padding: 2 }}>{index + 1}</Text>
        </View>
    );

    return (
        <View className='flex flex-1 bg-white'>
            < FlatList
                ref={flatlistRef}
                pagingEnabled
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={questions}
                renderItem={({ item }: { item: any }) => {
                    switch (item.questionType) {
                        case 'multiple_choice':
                            return <MultipleChoicePage question2={item} key={item.id} handleAnswer={handleAnswer} />;
                        case 'open-ended':
                            return <OpenEndedQuestionPage handleAnswer={handleAnswer} question2={item} key={item.id} />;
                        case 'scale':
                            return <ScaleQuestionPage handleAnswer={handleAnswer} question2={item} key={item.id} />;
                        default:
                            return null;
                    }
                }}
                keyExtractor={(item) => item.id.toString()}
                onScroll={(event) => {
                    const { x } = event.nativeEvent.contentOffset;
                    const currentIndex = Math.round(x / width);
                    setActiveIndex(currentIndex);
                }}
            />
            <View className='justify-between flex-row p-5'>
                <PrimaryButton
                    title='Geri'
                    onPress={handlePrevButton}
                    style={{ width: Dimensions.get('window').width * 0.45 }}
                    isWhite={true}
                />
                <View className='mr-1' />
                <PrimaryButton
                    title={activeIndex >= 9 ? 'Bitir' : 'İler'}
                    onPress={() => {
                        activeIndex >= 9 ? handleFinishButton() : handleNextButton()
                    }}
                    style={{ width: Dimensions.get('window').width * 0.45 }}
                    isWhite={true}
                />

            </View>
            <View className='flex-row h-14' >
                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flex: 1,
                    }}
                    horizontal
                    data={questions}
                    renderItem={renderIndicator}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const MultipleChoicePage: React.FC<{
    question2: MultipleChoiceQuestionModel,
    handleAnswer: (answer: string) => void
}> = ({
    question2,
    handleAnswer
}) => {
        const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

        const handleSelectAnswer = (answer: string) => {
            setSelectedAnswer(answer);
            handleAnswer(answer);
        };

        const groupedAnswers = [];
        for (let i = 0; i < question2.answers.length; i += 2) {
            groupedAnswers.push(question2.answers.slice(i, i + 2));
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, width: Dimensions.get('window').width }}>
                <Text className='font-semibold text-lg text-center'>{question2.question}</Text>
                <View style={{ marginTop: 20 }}>
                    {question2.answers.map((answer, index) => (
                        <TouchableOpacity
                            className='justify-center items-center my-2 px-3 rounded-xl py-3 bg-white border border-gray-200 flex h-14'
                            key={index}
                            onPress={() => handleSelectAnswer(answer)}
                            style={selectedAnswer === answer ? { backgroundColor: 'green' } : null}
                        >
                            <Text className={`${selectedAnswer === answer ? 'text-white' : 'text-black'}`}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };


const OpenEndedQuestionPage: React.FC<{ question2: OpenEndedQuestionModel, handleAnswer: (answer: string) => void }> = ({ question2, handleAnswer }) => {
    const [answer, setAnswer] = useState('');

    const handleNextButton = () => {
        // Do any validation or processing of the answer here if needed
        handleAnswer(answer);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, width: Dimensions.get('window').width }}>
            <Text className='font-semibold text-lg text-center mb-5'>{question2.question}</Text>
            <PrimaryInput
                placeholder='Cevabınızı buraya yazın'
                setValue={(text: any) => setAnswer(text)}
                value={answer}
                maxLength={200}
            />
        </View>
    );
};


const ScaleQuestionPage: React.FC<{ question2: ScaleQuestionModel, handleAnswer: (answer: string) => void }> = ({ question2, handleAnswer }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, width: Dimensions.get('window').width }}>
            <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
            <Text>{question2.question}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            </View>
        </View >
    );
};

export default QuestionPage;