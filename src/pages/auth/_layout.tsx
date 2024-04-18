import React, { useState } from "react";
import { Text, View } from "react-native";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { SegmentedControl } from "../../components";

const Auth = () => {
    const [selectedOption, setselectedOption] = useState('Giriş Yap');
    const [isSignIn, setIsSignIn] = useState(true);

    return <View className="flex flex-1 justify-center items-center">
        <Text className="justify-start items-center font-semibold text-2xl my-5 px-5">Hoşgeldiniz</Text>
        <SegmentedControl
            options={['Giriş Yap', 'Kayıt Ol',]}
            selectedOption={selectedOption}
            onOptionPress={(value: any) => {
                setselectedOption(value);
                value === "Kayıt Ol" ? setIsSignIn(false) : setIsSignIn(true);
            }} />
        <View className="py-1" />
        {isSignIn ? <SignIn /> : <SignUp />}
    </View>
}

export default Auth;