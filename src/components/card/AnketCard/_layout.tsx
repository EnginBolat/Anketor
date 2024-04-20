import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IcCalendar, IcClock, IcStar } from "../../../assets";

const AnketCard: React.FC<{ title: string, date?: string, time?: string, onPress: () => void, testId?: string, point?: string }> = ({
    title,
    date,
    time,
    onPress,
    testId,
    point
}) => {
    return <TouchableOpacity testID={testId} onPress={onPress} className="w-full my-1 rounded-lg py-4 px-3 border border-gray-200 bg-white">
        <View className="flex-row justify-between">
            <Text className="font-medium text-base">{title}</Text>
            <Text className="text-gray-400 text-xs underline">Daha Fazla</Text>
        </View>
        <View className="flex-row  justify-between items-center">
            <View className="flex-row mt-2 items-center justify-center">
                {date && <View className="flex-row ">
                    <IcCalendar height={18} width={18} />
                    <Text className="ml-1 mr-2">{date}</Text>
                </View>}
                {time && <View className="flex-row items-center justify-center">
                    <IcClock height={18} width={18} />
                    <Text className="ml-1">{time}</Text>
                </View>}
            </View>
            {point && <View className="flex-row items-center justify-center">
                <IcStar height={18} width={18} />
                <Text className="ml-1">{point}</Text>
            </View>}
        </View>
    </TouchableOpacity>
}

export default AnketCard;