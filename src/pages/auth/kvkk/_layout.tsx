import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { SafeAreaView, Switch, Text, View } from "react-native";

const Kvkk = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return <SafeAreaView className="flex flex-1">
        <View className="p-5 items-center">
            <Text className="font-bold text-xl my-2">Hassas Veriler Hakkında</Text>
            <Text className="text-center font-medium">Uygulamamıza katılımınız için teşekkür ederiz. Kişisel verilerinizin gizliliği ve güvenliği bizim için önemlidir. Lütfen, topladığımız bilgilerin nasıl kullanıldığı ve korunduğu hakkında aşağıdaki bilgilere göz atınız.</Text>
            <Text className="my-3 text-gray-700">{`
Veri Kullanımı: Topladığımız kişisel veriler, sadece bu anketin sonuçlarını derlemek ve analiz etmek amacıyla kullanılacaktır. Verilerinizin hiçbir şekilde üçüncü şahıslarla paylaşılması veya ticari amaçlarla kullanılması söz konusu değildir\n
Veri Güvenliği:Kişisel verileriniz, güvenli bir şekilde saklanacak ve yasalara uygun bir şekilde işlenecektir. Verilerinizin yetkisiz erişim, değişiklik veya ifşa edilme riskini en aza indirmek için gerekli önlemler alınacaktır.
Veri Saklama Süresi: Anket sonuçları analiz edildikten sonra, kişisel verileriniz silinecek ve herhangi bir şekilde saklanmayacaktır.\n
Haklarınız: KVKK kapsamında, kişisel verileriniz üzerinde belirli haklara sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.\n
Anketimize gösterdiğiniz ilgi için tekrar teşekkür ederiz. Herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.\n
Saygılarımızla,`}</Text>

            <View className="flex-row justify-between">
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </View>
        </View>
    </SafeAreaView>
}

export default Kvkk;


const QuestionRow: React.FC<{
    question: string;
    value: boolean;
    setValue: any;
}> = ({ question, value, setValue }) => {
    return <View className="justify-between items-center flex-row p-5">
        {/* <Switch
            value={value}
            onChange={(data) => { setValue(data) }}
            onValueChange={(data) => { setValue(data) }}
            className="mr-2"
        /> */}
        <Text>{question}</Text>
    </View>
}