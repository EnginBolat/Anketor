import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";
import axios, { HttpStatusCode } from "axios";

import { PrimaryButton, PrimaryInput } from "../../../components";
import LocalStorage from "../../../core/service/local-storage/local.storage.service";
import { LocalStorageSaveKeys } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const [serviceError, setServiceErrorText] = useState('')
    const localStorage = new LocalStorage();
    const navigation = useNavigation<any>();

    const SignupSchema = Yup.object().shape({
        nickname: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    async function handleSubmit(nickname: string, password: string) {
        setLoading(true);
        try {
            axios.post('https://fakestoreapi.com/auth/login', {
                username: nickname,
                password: password,
            })
                .then(response => {
                    switch (response.status) {
                        case HttpStatusCode.Ok:
                            localStorage.save(LocalStorageSaveKeys.nickname, nickname);
                            localStorage.save(LocalStorageSaveKeys.password, password);
                            console.log('Girdin Kral Hadi Bakim');
                            navigation.navigate('Home')
                            break;
                    }
                    setLoading(false);
                })
                .catch(error => {
                    if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
                        setServiceErrorText('Kullanıcı adı veya parola hatalı.');
                    } else {
                        setServiceErrorText('Şu anda servislerimize bakım yapılıyor. Lütfen daha sonra tekrar deneyin.');
                    }
                    setLoading(false);
                });
        } catch (error) {
            setServiceErrorText('Şu anda servislerimize bakım yapılıyor. Lütfen daha sonra tekrar deneyin.')
        }
    }

    async function handleNavigationToSignIn() {
        Alert.alert(`Navigation...`)
    }

    return <SafeAreaView className="flex flex-1 p-5">
        <View className="flex flex-1 justify-center">
            <Text className="justify-start items-center font-semibold text-2xl mb-2 px-5">Hoşgeldiniz</Text>
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ nickname: 'mor_2314', password: '83r5^_', }}
                onSubmit={values => handleSubmit(values.nickname, values.password)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="p-5">
                        <PrimaryInput
                            value={values.nickname}
                            setValue={handleChange('nickname')}
                            placeholder="Nickname"
                        />
                        {errors.nickname && touched.nickname ? (<FormError error={errors.nickname} />) : null}
                        <PrimaryInput
                            value={values.password}
                            setValue={handleChange('password')}
                            placeholder="Password"
                            secureTextEnty={true}
                        />
                        {errors.password && touched.password ? (<FormError error={errors.password} />) : null}
                        <PrimaryButton
                            title="Giriş Yap"
                            onPress={handleSubmit}
                            isLoading={loading}
                            titleStyle={{ fontWeight: '600' }}
                        />
                        <FormError error={serviceError} />
                        <View className="w-full flex-row mt-4 justify-center items-center">
                            <Text>Üye Değil misiniz?</Text>
                            <TouchableOpacity onPress={handleNavigationToSignIn}>
                                <Text className="font-semibold"> Hesap Oluştur</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    </SafeAreaView>
}

export default SignIn;


const FormError: React.FC<{ error: string }> = ({ error }) => {
    return <Text className="my-2 text-red-800 font-medium">{error}</Text>
}