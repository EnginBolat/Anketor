import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { AnketCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { LocalStorage } from "../../core";
import { LocalStorageSaveKeys } from "../../constants";
import questions from '../../utils/questions.json';


const Profile = () => {
    const localStorage = new LocalStorage();
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
            for (const id of finishedQuestionsId) {
                if (question.id === id) {
                    console.log(question.id);
                    return true;
                }
            }
            return false;
        });
    };
    return <SafeAreaView className="flex flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-1 p-5">
                <View className="flex-row justify-between py-5">
                    <InformationCol title="Puan" value="30" />
                    <View className="w-0.5 bg-gray-500 h-16" />
                    <InformationCol title="Toplam" value="7" />
                    <View className="w-0.5 bg-gray-500 h-16" />
                    <InformationCol title="Bugün" value="2" />
                </View>
                <FlatList
                    className="flex flex-1"
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    data={finishedQuestionsId ? filterQuestionsById(questions) : questions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <AnketCard
                            title={item.title}
                            time={item.createdDate}
                            date={item.createdDate}
                            onPress={() => { navigation.navigate('Question', { testId: item.id }) }}
                        />
                    )}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Profile;


const InformationCol: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return <View className="items-center">
        <Text className="font-medium text-3xl">{value}</Text>
        <Text className="font-medium text-2xl">{title}</Text>
    </View>
}

