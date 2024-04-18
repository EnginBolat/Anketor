import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import questions from '../../utils/questions.json';
import MultipleChoiceQuestionModel from '../../model/multiple.choice.question.model';
import OpenEndedQuestionModel from '../../model/open.ended.question';
import ScaleQuestionModel from '../../model/scale.question.model';
import { PrimaryButton } from '../../components';

const QuestionPage = () => {
    const { width } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const flatlistRef = useRef<FlatList>(null);
    const navigation = useNavigation<any>();

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
        console.log('Seçilen cevap:', answer);
        handleNextButton();
    };

    const renderIndicator = ({ index }: { index: number }) => (
        <View style={{
            height: 24,
            width: 32,
            borderRadius: 4,
            backgroundColor:
                index === activeIndex
                    ? 'rgba(0,0,0,0.10)'
                    : 'rgba(0,0,0,0.30)',
            marginRight: 2,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
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
                    title='İleri'
                    onPress={handleNextButton}
                    style={{ width: Dimensions.get('window').width * 0.45 }}
                />
                <PrimaryButton
                    title='Geri'
                    onPress={handlePrevButton}
                    style={{ width: Dimensions.get('window').width * 0.45 }}
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
                            onPress={() => handleAnswer(answer)}
                        >
                            <Text>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };


const OpenEndedQuestionPage: React.FC<{ question2: OpenEndedQuestionModel, handleAnswer: (answer: string) => void }> = ({ question2, handleAnswer }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, width: Dimensions.get('window').width }}>
            <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
            <Text>{question2.question}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            </View>
        </View >
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