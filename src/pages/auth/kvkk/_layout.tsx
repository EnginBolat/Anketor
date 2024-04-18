import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FormError, PrimaryButton } from "../../../components";
import { useNavigation } from "@react-navigation/native";

const Kvkk = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isError, setIsError] = useState(false);
    const navigation = useNavigation<any>();

    return <SafeAreaView className="flex flex-1">
        <View className="p-5 items-center">
            <Text className="font-bold text-xl my-2">Hassas Veriler Hakkında</Text>
            <Text className="text-start font-medium">Uygulamamıza katılımınız için teşekkür ederiz. Kişisel verilerinizin gizliliği ve güvenliği bizim için önemlidir. Lütfen, topladığımız bilgilerin nasıl kullanıldığı ve korunduğu hakkında aşağıdaki bilgilere göz atınız.</Text>
            <Text className="my-3 text-gray-700">{`
Veri Kullanımı: Topladığımız kişisel veriler, sadece bu anketin sonuçlarını derlemek ve analiz etmek amacıyla kullanılacaktır. Verilerinizin hiçbir şekilde üçüncü şahıslarla paylaşılması veya ticari amaçlarla kullanılması söz konusu değildir\n
Veri Güvenliği:Kişisel verileriniz, güvenli bir şekilde saklanacak ve yasalara uygun bir şekilde işlenecektir. Verilerinizin yetkisiz erişim, değişiklik veya ifşa edilme riskini en aza indirmek için gerekli önlemler alınacaktır.
Veri Saklama Süresi: Anket sonuçları analiz edildikten sonra, kişisel verileriniz silinecek ve herhangi bir şekilde saklanmayacaktır.\n
Haklarınız: KVKK kapsamında, kişisel verileriniz üzerinde belirli haklara sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.\n
Anketimize gösterdiğiniz ilgi için tekrar teşekkür ederiz. Herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.\n
Saygılarımızla,`}</Text>

            <View className={`flex-row items-center justify-between ${isError ? 'mb-0' : 'mb-3'}`}>
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
                <Text className="text-gray-500">Yukarıda belirtilen şartları kabul etmiş olursunuz.</Text>
            </View>
            {isError && <View className="justify-center items-start w-full">
                <FormError error={"Lütfen ilerlemek için kutucuğu işaretleyiniz"} /></View>}
            <PrimaryButton
                onPress={() => {
                    if (toggleCheckBox) { navigation.navigate('Home') }
                    else { setIsError(true) }
                }}
                title="Devam Et" />
        </View>
    </SafeAreaView>
}

export default Kvkk;