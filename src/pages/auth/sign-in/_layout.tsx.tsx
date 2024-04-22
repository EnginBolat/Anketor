import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";
import axios, { HttpStatusCode } from "axios";

import { FormError, PrimaryButton, PrimaryInput } from "../../../components";
import LocalStorage from "../../../core/service/local-storage/local.storage.service";
import { LocalStorageSaveKeys } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';


const SignIn = () => {
    const { t } = useTranslation();
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
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username: values.nickname,
                password: values.password,
            });
            if (response.status == 200) {
                localStorage.save(LocalStorageSaveKeys.nickname, values.nickname);
                localStorage.save(LocalStorageSaveKeys.password, values.password);
                localStorage.save(LocalStorageSaveKeys.email, "test@gmail.com");
                localStorage.save(LocalStorageSaveKeys.birhDate, "19.04.1972");
                localStorage.save(LocalStorageSaveKeys.gender, "Erkek");
                navigation.navigate('Home');
            } else {
                setServiceErrorText(t('usernamePasswordError'));
            }
        } catch (error: any) {
            if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
                setServiceErrorText(t('usernamePasswordError'));
            } else {
                setServiceErrorText(t('internalServerError'));
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
                initialValues={{ nickname: __DEV__ ? 'mor_2314' : "", password: __DEV__ ? '83r5^_' : "", }}
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
                                <Text className="underline text-gray-600">{t("forgotPassword")}</Text>
                            </TouchableOpacity>
                        </View>
                        <PrimaryButton
                            title={t('signIn')}
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