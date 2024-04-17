import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const PrimaryButton: React.FC<{
    title: string;
    onPress: () => void,
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>,
}> = ({
    title,
    onPress,
    style,
    titleStyle,
}) => {
        return <TouchableOpacity onPress={onPress} style={style} className={`w-full bg-black py-5 px-4 rounded-xl items-center justify-center`}>
            <Text className="text-white" style={titleStyle}>{title}</Text>
        </TouchableOpacity>
    }

export default PrimaryButton;