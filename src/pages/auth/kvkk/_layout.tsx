import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FormError, PrimaryButton } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Kvkk = () => {
    const { t } = useTranslation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isError, setIsError] = useState(false);
    const navigation = useNavigation<any>();

    return <SafeAreaView className="flex flex-1">
        <View className="p-5 items-center">
            <Text className="font-bold text-xl my-2">{t('aboutSenstiveData')}</Text>
            <Text className="text-start font-medium">{t('thanksForUsingApp')}</Text>
            <Text className="my-3 text-gray-700">{t('dataDesc')}</Text>

            <View className={`flex-row items-center ${isError ? 'mb-0' : 'mb-3'}`}>
                <CheckBox
                    onAnimationType="stroke"
                    offAnimationType="fade"
                    boxType="square"
                    style={{ height: 24, width: 24, }}
                    lineWidth={1}
                    tintColor="grey"
                    onCheckColor="grey"
                    onTintColor="grey"
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <View className="px-2" />
                <Text className="text-gray-500 ">{t('acceptChecboxlabel')}.</Text>
            </View>
            {isError && <View className="justify-center items-start w-full">
                <FormError error={t('checBoxError')} /></View>}
            <PrimaryButton
                onPress={() => {
                    if (toggleCheckBox) { navigation.navigate('Home') }
                    else { setIsError(true) }
                }}
                title={t('continue')} />
        </View>
    </SafeAreaView>
}

export default Kvkk;