import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { AnketCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { LocalStorage } from "../../core";
import { LocalStorageSaveKeys } from "../../constants";
import questions from '../../utils/questions.json';

const Profile = () => {
    const localStorage = new LocalStorage();
    const navigation = useNavigation<any>();
    const [finishedQuestionsId, setFinishedQuestionsId] = useState<string[]>([]);
    const [newQuestions, setNewQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ totalTest: "", totalPoint: 0 });
    var filteredId = localStorage.get(LocalStorageSaveKeys.finishedQuestionsId);


    function takeQuestions() {
        if (filteredId) {
            const newQuestionsArray: any[] = [];
            filteredId.forEach((x: any) => {
                const data = questions.filter((y: any) => y.id === x);
                if (data) {
                    data.forEach((question: any) => {
                        const soru = localStorage.get(question.title);
                        if (soru) {
                            newQuestionsArray.push(...soru);
                            soru.forEach((item: any) => {
                                setStats(prevState => ({ ...prevState, totalPoint: prevState.totalPoint + parseInt(item.averagePoint) }));
                            });
                        } else {
                            console.warn('Veri bulunamadı.');
                        }
                    });
                }
            });
            setNewQuestions(newQuestionsArray);
            setStats(prevState => ({ ...prevState, totalTest: newQuestionsArray.length.toString() }));
            setIsLoading(false);
        }
    }

    useEffect(() => {
        takeQuestions();
        if (filteredId) {
            setFinishedQuestionsId(filteredId);
        }
    }, []);

    useEffect(() => {
        takeQuestions();
        navigation.addListener('focus', () => {
            const storedFinishedQuestionsId = filteredId
            if (storedFinishedQuestionsId) {
                setFinishedQuestionsId(storedFinishedQuestionsId);
            }
        });
    }, [navigation]);

    if (isLoading) {
        return <ActivityIndicator color={'grey'} className="flex flex-1 items-center" />
    }

    function headerComponent() {
        return <View className="p-5">
            <View className="flex-row justify-between py-5">
                <InformationCol title="Puan" value={stats.totalPoint.toString() ?? "asdasd"} />
                <View className="w-0.5 bg-gray-500 h-16" />
                <InformationCol title="Toplam" value={stats.totalTest} />
            </View>
        </View>
    }

    const renderItem = ({ item }: { item: any }) => (
        <AnketCard
            key={item.index}
            title={item.title}
            time={item.totalTime}
            date={new Date(item.updatedDate).toLocaleDateString()}
            onPress={() => { }}
            point={item.averagePoint}
        />
    );

    return (
        <SafeAreaView className="flex flex-1">
            {filteredId != null ? (
                <View className="flex flex-1 p-5">
                    {newQuestions.length > 0 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={newQuestions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item: any) => renderItem(item)}
                            ListHeaderComponent={headerComponent}
                        />)
                        : (
                            <View className="flex flex-1 justify-center items-center">
                                <Text className="text-xl font-bold text-gray-400">Henüz Herhangi Bir Test Çözmediniz</Text>
                            </View>
                        )}
                </View>
            ) : null}
        </SafeAreaView>
    );
}

export default Profile;

const InformationCol: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return <View className="items-center">
        <Text className="font-medium text-3xl">{value}</Text>
        <Text className="font-medium text-2xl">{title}</Text>
    </View>
}