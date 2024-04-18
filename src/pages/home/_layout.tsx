import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { LocalStorage } from "../../core";
import { LocalStorageSaveKeys } from "../../constants";
import { AnketCard } from "../../components";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const localStorage = new LocalStorage();
    const nickname = localStorage.get(LocalStorageSaveKeys.nickname);
    const navigation = useNavigation<any>();

    return <SafeAreaView className="flex flex-1 ">
        <View className="flex flex-1 p-5 ">
            <Text className="my-1 font-semibold text-xl">{`Hoşgeldin, ${nickname}`}</Text>
            <Text className="my-1 font-semibold text-lg pt-5">{`Anketler`}</Text>
            <FlatList
                className="flex flex-1"
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => {
                    return <AnketCard
                        title={`Anket ${item.index + 1}`}
                        time="11:22"
                        date="18.04.2024"
                        onPress={() => { navigation.navigate('Question')}}
                    />
                }}
            />
        </View>

    </SafeAreaView>
}

export default Home;