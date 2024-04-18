import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";
import axios, { HttpStatusCode } from "axios";

import { FormError, PrimaryButton, PrimaryInput } from "../../../components";
import LocalStorage from "../../../core/service/local-storage/local.storage.service";
import { LocalStorageSaveKeys } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { LoginService } from "../../../core";

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

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await LoginService(values.nickname, values.password);
            localStorage.save(LocalStorageSaveKeys.nickname, values.nickname);
            localStorage.save(LocalStorageSaveKeys.password, values.password);
            navigation.navigate('Home');
        } catch (error: any) {
            if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
                setServiceErrorText('Kullanıcı adı veya parola hatalı.');
            } else {
                setServiceErrorText('Şu anda servislerimize bakım yapılıyor. Lütfen daha sonra tekrar deneyin.');
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleForgetPassword() {
        navigation.navigate('ForgotPasswordPage')
    }

    return <SafeAreaView className="flex p-5">
        <View className="flex justify-center">
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ nickname: 'mor_2314', password: '83r5^_', }}
                onSubmit={values => handleSubmit(values)}
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
                        <View className="w-full justify-between flex-row items-center">
                            {errors.password && touched.password ? (<FormError error={errors.password} />) : <View />}

                            <TouchableOpacity onPress={handleForgetPassword} className={`${errors.password ? 'py-0' : 'p-2'}`}>
                                <Text className="underline text-gray-600">Şifremi Unuttum</Text>
                            </TouchableOpacity>
                        </View>
                        <PrimaryButton
                            title="Giriş Yap"
                            onPress={handleSubmit}
                            isLoading={loading}
                            titleStyle={{ fontWeight: '600' }}
                        />
                        <FormError error={serviceError} />
                    </View>
                )}
            </Formik>
        </View>
    </SafeAreaView>
}

export default SignIn;