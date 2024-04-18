import React from "react";
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IcCalendar, IcClock } from "../../assets";
import { AnketCard } from "../../components";

const Profile = () => {
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
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => {
                        return <AnketCard
                            title={`Anket ${item.index + 1}`}
                            time="11:22"
                            date="18.04.2024"
                            onPress={() => { console.log(`Id:${item.index + 1}`); }}
                        />
                    }}
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

