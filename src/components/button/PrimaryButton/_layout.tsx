import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

const PrimaryButton: React.FC<{
    title: string;
    onPress: () => void,
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>,
    isLoading?: boolean;
    isWhite?: boolean;
    LeadingIcon?: any;
}> = ({
    title,
    onPress,
    style,
    titleStyle,
    isLoading = false,
    isWhite = false,
    LeadingIcon,
}) => {
        return <TouchableOpacity onPress={onPress} style={style} className={`w-full ${isWhite ? 'bg-white' : 'bg-black'} py-5 px-4 rounded-xl items-center justify-center border border-gray-200`}>
            {!isLoading && <View className="flex-row">
                {LeadingIcon && <LeadingIcon />}
                <Text className={`${!isWhite ? 'text-white' : 'text-black'}`} style={titleStyle}>{title}</Text></View>}
            {isLoading && <ActivityIndicator color={'white'} />}
        </TouchableOpacity>
    }

export default PrimaryButton;