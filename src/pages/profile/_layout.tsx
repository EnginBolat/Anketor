import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AnketCard, PrimaryButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { LocalStorage } from "../../core";
import { LocalStorageSaveKeys } from "../../constants";
import questions from '../../utils/questions.json';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import DatePicker from "react-native-date-picker";
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from "react-i18next";

const Profile = () => {
    const localStorage = new LocalStorage();
    const navigation = useNavigation<any>();
    const [finishedQuestionsId, setFinishedQuestionsId] = useState<string[]>([]);
    const [newQuestions, setNewQuestions] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalTest: "0", totalPoint: 0 });
    const [user, setUser] = useState({
        nickname: "",
        email: "",
        birhDate: "",
        gender: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessOngoing, setIsProcessOngoing] = useState(false);
    var filteredId = localStorage.get(LocalStorageSaveKeys.finishedQuestionsId);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '75%'], []);
    const handlePresentModalPress = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);
    const handleSheetChanges = useCallback((index: number) => { console.log('handleSheetChanges', index); }, []);
    const [dateString, setDateString] = useState(user.birhDate);
    const [openPicker, setOpenPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = () => {
        if (i18n.language == "tr") {
            i18n.changeLanguage("en")
        } else {
            i18n.changeLanguage("tr")
        }
    }



    const genders = [
        { label: t('male'), value: t('male') },
        { label: t('woman'), value: t('woman') },
    ];

    function getUser() {
        var nickname = localStorage.get(LocalStorageSaveKeys.nickname);
        var email = localStorage.get(LocalStorageSaveKeys.email);
        var birhDate = localStorage.get(LocalStorageSaveKeys.birhDate);
        var gender = localStorage.get(LocalStorageSaveKeys.gender);
        var password = localStorage.get(LocalStorageSaveKeys.password);
        setUser(({
            nickname: nickname,
            email: email,
            birhDate: birhDate,
            gender: gender,
            password: password,
        }));
        setDateString(user.birhDate);
    }

    function takeQuestions() {
        if (filteredId) {
            const newQuestionsArray: any[] = [];
            const uniqueQuestions: { [key: string]: boolean } = {};
            filteredId.forEach((x: any) => {
                const data = questions.filter((y: any) => y.id === x);
                if (data.length > 0) {
                    data.forEach((question: any) => {
                        const soru = localStorage.get(question.title);
                        if (soru) {
                            soru.forEach((item: any) => {
                                // Eğer soru daha önce eklenmediyse, uniqueQuestions objesine ekleyerek tekrar edenleri engelliyoruz
                                if (!uniqueQuestions[item.title]) {
                                    uniqueQuestions[item.title] = true;
                                    newQuestionsArray.push(item);
                                    setStats(prevState => ({ ...prevState, totalPoint: prevState.totalPoint + parseInt(item.averagePoint) }));
                                }
                            });
                        } else {
                            console.warn('Veri bulunamadı.');
                        }
                    });
                }
            });
            setNewQuestions(newQuestionsArray);
            setStats(prevState => ({ ...prevState, totalTest: newQuestionsArray.length.toString() }));
        }
        setIsLoading(false);
    }

    useEffect(() => {
        takeQuestions();
        getUser();
        if (filteredId) {
            setFinishedQuestionsId(filteredId);
        }
    }, []);

    useEffect(() => {
        getUser();
        navigation.addListener('focus', () => {
            const storedFinishedQuestionsId = filteredId
            if (storedFinishedQuestionsId) {
                setFinishedQuestionsId(storedFinishedQuestionsId);
            }
            takeQuestions();
        });
    }, [navigation]);

    if (isLoading) {
        return <ActivityIndicator color={'grey'} className="flex flex-1 items-center" />
    }

    async function handleBottomSheetSaveButton() {
        setIsProcessOngoing(true);
        try {
            localStorage.save(LocalStorageSaveKeys.nickname, user.nickname);
            localStorage.save(LocalStorageSaveKeys.email, user.email);
            localStorage.save(LocalStorageSaveKeys.birhDate, user.birhDate);
            localStorage.save(LocalStorageSaveKeys.gender, user.gender);
            localStorage.save(LocalStorageSaveKeys.password, user.password);
        } catch (error) {
            Alert.alert(t('someThingsHappenedPleaseTryAgain'))
        }
        setIsProcessOngoing(false);
    }

    function headerComponent() {
        return <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
                <View className="rounded-full bg-black h-28 w-28 items-center justify-center">
                    <Text className="text-4xl text-white font-bold">{user.nickname.substring(0, 2).toUpperCase()}</Text>
                </View>
                <View>
                    <Text className="ml-2 text-lg">{user.nickname.length > 9 ? user.nickname.substring(0, 8) + '...' : user.nickname}</Text>
                    <TouchableOpacity onPress={handlePresentModalPress}>
                        <Text className="ml-2 text-sm underline">{t('editProfile')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row justify-between py-5">
                <InformationCol title={t('point')} value={stats.totalPoint.toString() ?? "0"} />
                <View className="w-0.5 mx-3 bg-gray-500 h-13" />
                <InformationCol title={t('total')} value={stats.totalTest} />
            </View>
        </View>
    }

    const renderItem = ({ item }: { item: any }) => (
        <AnketCard
            key={item.index}
            title={item.title}
            time={item.totalTime}
            date={new Date(item.updatedDate).toLocaleDateString()}
            onPress={() => { }}
            point={item.averagePoint}
        />
    );

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex flex-1">
                {filteredId != null ? (
                    <View className="flex flex-1 p-5">
                        {newQuestions.length > 0 ? (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={newQuestions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item: any) => renderItem(item)}
                                ListHeaderComponent={headerComponent}
                            />)
                            : (
                                <View className="flex flex-1 justify-center items-center">
                                    <Text className="text-xl font-bold text-gray-400">{t('haventsolvedPoll')}</Text>
                                </View>
                            )}
                    </View>
                ) : <View className="flex flex-1 p-5">
                    {headerComponent()}
                    <View className="flex flex-1 justify-center items-center">
                        <Text className="text-xl font-bold text-gray-400">{t('haventsolvedPoll')}</Text>
                    </View>
                </View>}
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    containerStyle={styles.bottomSheetContainerStyle}
                >
                    <BottomSheetView style={styles.bottomSheetContentContainerStyle}>
                        <ScrollView
                            contentContainerStyle={{ height: "100%" }}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text className="text-xl font-bold color-black mb-2">{t('profileInformations')}</Text>
                            <BottomSheetInput
                                initialValue={user.nickname}
                                placeHolder="Nickname"
                                setData={setUser}
                                updatedField="nickname"
                            />
                            <BottomSheetInput
                                initialValue={user.email}
                                placeHolder="Email"
                                setData={setUser}
                                updatedField="email"
                            />
                            <Dropdown
                                style={[styles.dropdDownStyle, isFocus && { borderColor: 'blue' }, Platform.OS === 'ios' ? { paddingVertical: 1, } : { paddingVertical: 6 }]}
                                itemTextStyle={{ fontSize: 12, }}
                                data={genders}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? user.gender : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={(item: any) => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                    console.log(item)
                                    setUser((prevState: any) => ({ ...prevState, gender: item.value }));
                                }}
                            />
                            <TouchableOpacity onPress={() => setOpenPicker(true)} className="rounded-lg border border-gray-300 p-3 my-1 bg-white">
                                <Text>{user.birhDate}</Text>
                            </TouchableOpacity >
                            <DatePicker
                                modal
                                mode="date"
                                open={openPicker}
                                date={date}
                                minimumDate={new Date(1920, 1, 1)}
                                maximumDate={new Date(Date.now())}
                                onConfirm={date => {
                                    setOpenPicker(false);
                                    const formattedDate = date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    });
                                    setDateString(formattedDate);
                                    setDate(date);
                                    setUser((prevState: any) => ({ ...prevState, birhDate: dateString }));
                                }}
                                onCancel={() => {
                                    setOpenPicker(false);
                                }}
                            />
                            <View className="my-2" />
                            <PrimaryButton onPress={handleBottomSheetSaveButton} title="Güncelle" isLoading={isProcessOngoing} />
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheetModal>
            </SafeAreaView>
        </BottomSheetModalProvider >
    );
}

export default Profile;


const BottomSheetInput: React.FC<{
    setData: any,
    initialValue: string;
    placeHolder: string;
    updatedField: string;
}> = ({ setData, initialValue, placeHolder, updatedField }) => {
    return (
        <TextInput
            placeholder={placeHolder}
            className="rounded-lg border border-gray-300 p-3 my-1 bg-white"
            value={initialValue}
            onChangeText={(value: string) => {
                setData((prevState: any) => ({ ...prevState, [updatedField]: value }));
            }}
        />
    );
}

const styles = StyleSheet.create({
    dropdDownStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.10)',
        backgroundColor: 'white',
        paddingHorizontal: 12,
    },
    bottomSheetContentContainerStyle: {
        padding: 20,
    },
    bottomSheetContainerStyle: {
        backgroundColor: 'rgba(0,0,0,0.30)'
    }
})

const InformationCol: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return <View className="items-center">
        <Text className="font-medium text-2xl">{value}</Text>
        <Text className="font-medium text-1xl">{title}</Text>
    </View>
}