import React, { useState } from "react";
import { Image, Text, View, SafeAreaView, ScrollView } from "react-native";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { SegmentedControl } from "../../components";
import { useTranslation } from 'react-i18next';

const Auth = () => {
    const { t } = useTranslation();
    const [selectedOption, setselectedOption] = useState(t('signIn'));
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <SafeAreaView className="flex flex-1 justify-center items-center bg-white">
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: 'center' }}>
                <Text className="justify-start items-center font-semibold text-2xl my-5 px-5">{t('authGreetings')}</Text>
                <SegmentedControl
                    options={[t('signIn'), t('signUp'),]}
                    selectedOption={selectedOption}
                    onOptionPress={(value: any) => {
                        setselectedOption(value);
                        value === t('signUp') ? setIsSignIn(false) : setIsSignIn(true);
                    }} />
                {selectedOption === t('signUp')
                    ? <Image source={require("../../assets/images/img_3d_label.png")} style={{ height: 192, width: 192, marginVertical: 6 }} />
                    : <Image source={require("../../assets/images/img_3d_world.png")} style={{ height: 192, width: 192, marginVertical: 6 }} />}
                <View className="py-1" />
                {isSignIn ? <SignIn /> : <SignUp />}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Auth;