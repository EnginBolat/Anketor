import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { LocalStorage } from "../../core";
import { LocalStorageSaveKeys } from "../../constants";
import { AnketCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import questions from '../../utils/questions.json';

const Home = () => {
    const localStorage = new LocalStorage();
    const nickname = localStorage.get(LocalStorageSaveKeys.nickname);
    const navigation = useNavigation<any>();
    const [finishedQuestionsId, setFinishedQuestionsId] = useState<string[]>([]);

    useEffect(() => {
        const storedFinishedQuestionsId = localStorage.get(LocalStorageSaveKeys.finishedQuestionsId);
        if (storedFinishedQuestionsId) {
            setFinishedQuestionsId(storedFinishedQuestionsId);
        }
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => {
            const storedFinishedQuestionsId = localStorage.get(LocalStorageSaveKeys.finishedQuestionsId);
            if (storedFinishedQuestionsId) {
                setFinishedQuestionsId(storedFinishedQuestionsId);
            }
        });
    }, [navigation]);

    const filterQuestionsById = (questions: any) => {
        return questions.filter((question: any) => {
            var data = localStorage.get(question.title);
            console.log(data);
            for (const id of finishedQuestionsId) {
                if (question.id === id) {
                    return false;
                }
            }
            return true;
        });
    };

    return (
        <SafeAreaView className="flex flex-1 ">
            <View className="flex flex-1 p-5 ">
                <Text className="my-1 font-semibold text-xl">{`Hoşgeldin ${nickname ? `,${nickname}` : ""}`}</Text>
                <Text className="my-1 font-semibold text-lg pt-5">{`Anketler`}</Text>
                <FlatList
                    className="flex flex-1"
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    data={finishedQuestionsId ? filterQuestionsById(questions) : questions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <AnketCard
                            title={item.title}
                            onPress={() => { navigation.navigate('Question', { testId: item.id }) }}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

export default Home;
