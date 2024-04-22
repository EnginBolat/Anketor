import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';

import questions from '../../utils/questions.json';
import { PrimaryButton, PrimaryInput } from '../../components';
import { MultipleChoiceQuestionModel, SaveAnswersModel, ScaleQuestionModel, OpenEndedQuestionModel } from '../../model';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { LocalStorage } from '../../core';
import { IcClock } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageSaveKeys } from '../../constants';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface RouteParams {
    testId: number;
}

const QuestionPage = (props: any) => {
    const { t } = useTranslation();
    const { height, width } = Dimensions.get('window');
    const localStorage = new LocalStorage();
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { testId } = route.params as RouteParams;
    var mainQuestion = questions.filter((x: any) => x.id === Number(testId))

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    const updatedSeconds = prevSeconds + 1;
                    if (updatedSeconds === 60) {
                        setMinutes(prevMinutes => prevMinutes + 1);
                        return 0;
                    }
                    if (minutes === 60) {
                        setHours(prevHour => prevHour + 1)
                        return 0;
                    }
                    return updatedSeconds;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [seconds, isRunning]);

    const formatTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <View className='flex-row items-center'>
                <IcClock width={16} height={16} />
                <Text className='ml-1'>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</Text>
            </View>
        });
    }, [seconds, props.navigation]);



    //! FlatList Controls
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const flatlistRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleNextButton = () => {
        if (activeIndex < mainQuestion[0].quesions.length - 1) {
            const nextIndex = activeIndex + 1;
            setActiveIndex(nextIndex);
            flatlistRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        }
    };

    const handlePrevButton = () => {
        if (activeIndex > 0) {
            const prevIndex = activeIndex - 1;
            setActiveIndex(prevIndex);
            flatlistRef.current?.scrollToIndex({ animated: true, index: prevIndex });
        }
    };

    const handleAnswer = (answer: string) => {
        console.log(answer);
        const questionId = mainQuestion[0].quesions[activeIndex].id;
        setSelectedAnswers(prevState => ({ ...prevState, [questionId]: answer }));
        handleNextButton();
    };

    const handleFinishButton = () => {
        try {
            // Timer'ı Durdur
            setIsRunning(prevState => !prevState);

            // Kaydedilecek verinin modelini oluştur
            var random = (Math.floor(Math.random() * (100 - 50 + 1)) + 50).toString();
            var point = random.toString();
            const saveModels: SaveAnswersModel[] = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
                questionId: parseInt(questionId),
                title: questions.filter((x) => x.id === testId)[0].title,
                answers: answer,
                totalTime: `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toString(),
                averagePoint: point,
                test: mainQuestion
            }));

            // Kaydedilen Testin Idsini kaydet
            var idList = localStorage.get(LocalStorageSaveKeys.finishedQuestionsId);
            if (!idList) { idList = []; }
            idList.push(testId)
            localStorage.save(LocalStorageSaveKeys.finishedQuestionsId, idList)

            // Kaydedilen Testin Modelini Kaydet
            localStorage.saveModel(questions.filter((x) => x.id === testId)[0].title, saveModels);
            // Geliştiriciyi ve Kullanıcıyı bilgilendirecek logları göster
            if (__DEV__) {
                console.warn(`Veri tabanına kaydedilen başlık:${questions.filter((x) => x.id === testId)[0].title}`)
                console.warn(`Veri tabanına kaydedilen içerik:${saveModels}`)
                console.log('Cevaplar başarıyla localStorage\'a kaydedildi.');
            }

            Alert.alert(`${t('answersSaved')} ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`)
            navigation.pop();
        } catch (error) {
            if (__DEV__) { console.error('LocalStorage\'a cevapları kaydetme hatası:', error); }
            Alert.alert(`Cevaplarınız Kaydedilirken bir sorun ile karşılaşıldı`)
        }
    };


    //! Indicators
    const renderIndicator = ({ index }: { index: number }) => (
        <View className={`h-6 w-8 rounded-md ${index === activeIndex ? 'bg-gray-100' : 'bg-gray-200'} mr-0.5 justify-center items-center`}>
            <Text style={{ padding: 2 }}>{index + 1}</Text>
        </View>
    );

    //! Body

    return (
        <View className='flex flex-1 bg-white'>

            {/* Question Control Mechanism */}
            <FlatList
                ref={flatlistRef}
                pagingEnabled
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={mainQuestion[0].quesions}
                keyExtractor={(item, index) => index.toString()}
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
                onScroll={(event) => {
                    const { x } = event.nativeEvent.contentOffset;
                    const currentIndex = Math.round(x / width);
                    setActiveIndex(currentIndex);
                }}
            />

            {/* Control Buttons */}
            <ControlButtons
                activeIndex={activeIndex}
                handleFinishButton={handleFinishButton}
                handleNextButton={handleNextButton}
                handlePrevButton={handlePrevButton}
            />

            {/* Indicators Body */}
            <View className='flex-row h-14' >
                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flex: 1,
                    }}
                    horizontal
                    data={mainQuestion[0].quesions}
                    renderItem={renderIndicator}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </View>
    );
}


const ControlButtons: React.FC<{ handlePrevButton: () => void, handleNextButton: () => void, handleFinishButton: () => void, activeIndex: number }> = ({
    handlePrevButton,
    handleNextButton,
    handleFinishButton,
    activeIndex,
}) => {
    const { t } = useTranslation();

    return <View className='justify-between flex-row p-5'>
        <PrimaryButton
            title={t('back')}
            onPress={handlePrevButton}
            style={{ width: Dimensions.get('window').width * 0.45 }}
            isWhite={true}
        />
        <View className='mr-1' />
        <PrimaryButton
            title={activeIndex >= 9 ? t('finish') : t('next')}
            onPress={() => {
                activeIndex >= 9 ? handleFinishButton() : handleNextButton()
            }}
            style={{ width: Dimensions.get('window').width * 0.45 }}
            isWhite={true}
        />
    </View>
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
    const [answer2, setAnswer2] = useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, width: Dimensions.get('window').width }}>
            <Text className='font-semibold text-lg text-center mb-5'>{question2.question}</Text>
            <PrimaryInput
                placeholder='Cevabınızı buraya yazın'
                setValue={(text: any) => {
                    setAnswer2(text);
                    handleAnswer(answer2);
                }}
                value={answer2}
                maxLength={200}
            />
        </View>
    );
};

const ScaleQuestionPage: React.FC<{ question2: ScaleQuestionModel, handleAnswer: (answer: string) => void }> = ({ question2, handleAnswer }) => {
    const progress = useSharedValue(3);
    const thumbScaleValue = useSharedValue(1);
    const min = useSharedValue(0);
    const max = useSharedValue(5);
    const cache = useSharedValue(0);
    const isScrubbing = useRef(true);

    const onSlidingComplete = (e: number) => {
        console.log('onSlidingComplete', parseInt(e.toString(), 10));
        isScrubbing.current = false;
        handleAnswer(parseInt(e.toString(), 10).toString())
    };

    const onSlidingStart = () => {
        console.log('onSlidingStart');
        isScrubbing.current = true;
    };

    return (
        <View className='flex flex-1 justify-center items-center bg-white p-5' style={{ width: Dimensions.get('window').width }}>
            <Text className='font-semibold text-lg text-center mb-5'>{question2.question}</Text>
            <Slider
                theme={{
                    disableMinTrackTintColor: '#fff',
                    maximumTrackTintColor: 'rgba(0,0,0,0.10)',
                    minimumTrackTintColor: '#000',
                    cacheTrackTintColor: '#333',
                    bubbleBackgroundColor: '#666',
                    heartbeatColor: '#999',
                }}
                style={{ width: "100%" }}
                progress={progress}
                onSlidingComplete={onSlidingComplete}
                onSlidingStart={onSlidingStart}
                minimumValue={min}
                maximumValue={max}
                cache={cache}
                thumbScaleValue={thumbScaleValue}
            />
        </View >
    );
};

export default QuestionPage;