import React, { useState } from "react";
import { Image, Text, View, SafeAreaView, ScrollView } from "react-native";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { SegmentedControl } from "../../components";

const Auth = () => {
    const [selectedOption, setselectedOption] = useState('Giriş Yap');
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <SafeAreaView className="flex flex-1 justify-center items-center bg-white">
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: 'center' }}>
                <Text className="justify-start items-center font-semibold text-2xl my-5 px-5">Hoşgeldiniz</Text>
                <SegmentedControl
                    options={['Giriş Yap', 'Kayıt Ol',]}
                    selectedOption={selectedOption}
                    onOptionPress={(value: any) => {
                        setselectedOption(value);
                        value === "Kayıt Ol" ? setIsSignIn(false) : setIsSignIn(true);
                    }} />
                {selectedOption === "Kayıt Ol"
                    ? <Image source={require("../../assets/images/img_3d_label.png")} style={{ height: 192, width: 192, marginVertical: 6 }} />
                    : <Image source={require("../../assets/images/img_3d_world.png")} style={{ height: 192, width: 192, marginVertical: 6 }} />}
                <View className="py-1" />
                {isSignIn ? <SignIn /> : <SignUp />}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Auth;