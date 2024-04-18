import React, { Dispatch, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { IcEye } from "../../../assets";

const PrimaryInput: React.FC<{
    value: string;
    setValue: any;
    placeholder: string;
    secureTextEnty?: boolean;
    onEndEditing?: any;
}> = ({
    value,
    setValue,
    placeholder,
    secureTextEnty = false,
    onEndEditing,
}) => {
        const [isSecureText, setIsSecureText] = useState(true)

        return <View className={`${secureTextEnty ? "px-6" : "px-3"} bg-white  py-5 w-full flex-row justify-center items-center rounded-lg border border-gray-400 my-2`}>
            <TextInput
                className="w-full"
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEnty ? isSecureText : false}
                onChangeText={(text) => {
                    setValue(text);
                }}
                onEndEditing={onEndEditing}
            />
            {secureTextEnty && <TouchableOpacity onPress={() => {
                var value = !isSecureText;
                setIsSecureText(value);
            }}>
                <IcEye />
            </TouchableOpacity>}
        </View>
    }


export default PrimaryInput;