import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";

import { FormError, PrimaryButton, PrimaryInput } from "../../../components";
import { LocalStorage, LoginService } from "../../../core";
import { LocalStorageSaveKeys } from "../../../constants";
import { HttpStatusCode } from "axios";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native"; import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const { t } = useTranslation();
    const { height, width } = Dimensions.get('window');
    const [loading, setLoading] = useState(false)
    const [serviceError, setServiceErrorText] = useState('')
    const localStorage = new LocalStorage();
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('December 18, 1980');
    const [openPicker, setOpenPicker] = useState(false);
    const [selectedGender, setselectedGender] = useState('');
    const navigation = useNavigation<any>();

    const SignupSchema = Yup.object().shape({
        nickname: Yup.string()
            .required('Bu Alan Boş Geçilemez'),
        password: Yup.string()
            .required('Bu Alan Boş Geçilemez'),
        email: Yup.string()
            .email()
            .required('Bu Alan Boş Geçilemez')
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            var response = await LoginService(values.nickname, values.password);
            if (!response) {
                localStorage.save(LocalStorageSaveKeys.nickname, values.nickname);
                localStorage.save(LocalStorageSaveKeys.password, values.password);
                localStorage.save(LocalStorageSaveKeys.email, values.email);
                localStorage.save(LocalStorageSaveKeys.birhDate, dateString);
                localStorage.save(LocalStorageSaveKeys.gender, selectedGender);
                navigation.navigate('KvkkPage');
            } else {
                setServiceErrorText(t('userNamePreRegistered'));
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

    return <SafeAreaView className="flex p-5">
        <View className="flex justify-center">
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ nickname: __DEV__ ? 'mor_2314' : "", password: __DEV__ ? '83r5^_' : "", email: '', }}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="p-5">
                        <View className="w-full justify-between flex-row mb-2">
                            <View style={{ width: width * 0.45 }}>
                                <PrimaryButton onPress={() => { setselectedGender(t('woman')) }}
                                    title={t('woman')}
                                    isWhite={true}
                                    style={selectedGender == t('woman') ? { backgroundColor: 'pink' } : { backgroundColor: 'white' }}
                                    titleStyle={selectedGender == t('woman') ? { color: 'white' } : { color: 'black' }}
                                />
                            </View>
                            <View style={{ width: width * 0.45 }}>
                                <PrimaryButton onPress={() => { setselectedGender(t('male')) }}
                                    title={t('male')}
                                    isWhite={true}
                                    style={selectedGender == t('male') ? { backgroundColor: '#4aabff' } : { backgroundColor: 'white' }}
                                    titleStyle={selectedGender == t('male') ? { color: 'white' } : { color: 'black' }}
                                />

                            </View>
                        </View>
                        <PrimaryInput
                            value={values.nickname}
                            setValue={handleChange('nickname')}
                            placeholder="Nickname"
                        />
                        {errors.nickname && touched.nickname ? (<FormError error={errors.nickname} />) : null}
                        <PrimaryInput
                            value={values.email}
                            setValue={handleChange('email')}
                            placeholder="Email"
                        />
                        {errors.email && touched.email ? (<FormError error={errors.email} />) : null}
                        <PrimaryInput
                            value={values.password}
                            setValue={handleChange('password')}
                            placeholder="Password"
                            secureTextEnty={true}
                        />
                        {errors.password && touched.password ? (<FormError error={errors.password} />) : null}
                        <TouchableOpacity onPress={() => setOpenPicker(true)} className="px-5 bg-white py-5 w-full flex-row justify-start items-center rounded-lg border border-gray-400 my-2">
                            <Text>{dateString}</Text>
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
                            }}
                            onCancel={() => {
                                setOpenPicker(false);
                            }}
                        />
                        <PrimaryButton
                            title={t('signUp')}
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

export default SignUp;