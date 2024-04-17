import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const PrimaryButton: React.FC<{
    title: string;
    onPress: () => void,
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>,
    isLoading?: boolean;
}> = ({
    title,
    onPress,
    style,
    titleStyle,
    isLoading = false,
}) => {
        return <TouchableOpacity onPress={onPress} style={style} className={`w-full bg-black py-5 px-4 rounded-xl items-center justify-center`}>
            {!isLoading && <Text className="text-white" style={titleStyle}>{title}</Text>}
            {isLoading && <ActivityIndicator color={'white'} />}
        </TouchableOpacity>
    }

export default PrimaryButton;