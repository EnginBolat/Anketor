import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";

import { FormError, PrimaryButton, PrimaryInput } from "../../../components";
import { LocalStorage, LoginService } from "../../../core";
import { LocalStorageSaveKeys } from "../../../constants";
import { HttpStatusCode } from "axios";
import DatePicker from "react-native-date-picker";

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const [serviceError, setServiceErrorText] = useState('')
    const localStorage = new LocalStorage();
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('December 18, 1980');
    const [openPicker, setOpenPicker] = useState(false);

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
            } else {
                setServiceErrorText('Kullanıcı Önceden Kayıtlı!');
            }
        } catch (error: any) {
            if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
                await LoginService(values.nickname, values.password);
                localStorage.save(LocalStorageSaveKeys.nickname, values.nickname);
                console.log('Hadik siktir git');
                localStorage.save(LocalStorageSaveKeys.password, values.password);
            } else {
                setServiceErrorText('Şu anda servislerimize bakım yapılıyor. Lütfen daha sonra tekrar deneyin.');
            }
        } finally {
            setLoading(false);
        }
    }

    return <SafeAreaView className="flex p-5">
        <View className="flex justify-center">
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ nickname: 'mor_2314', password: '83r5^_', email: '', }}
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
                            title="Kayıt Ol"
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