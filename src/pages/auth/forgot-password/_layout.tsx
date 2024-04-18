import React, { useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { PrimaryButton, PrimaryInput } from '../../../components';

const ForgotPassword = () => {
    const [showChangesSaved, setShowChangesSaved] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    function startAnimated() {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(3000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowChangesSaved(false);
        });
        setShowChangesSaved(true);
    }

    async function handleButton() {
        startAnimated();
    }

    const DisplayingErrorMessagesSchema = yup.object().shape({
        email: yup.string().email('Invalid Email Adress').required('Required'),
    });

    return (
        <SafeAreaView className='flex flex-1'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ flex: 1 }}>
                <View className='flex flex-1 p-5'>
                    <Text className='text-black text-2xl font-Merriweather leading-8 font-normal'>Reset Password</Text>
                    <Text className='text-gray-700 font-Inter text-sm leading-6 mt-2'>
                        Enter the email address associated with your account, and we'll send
                        you a link to reset your password.
                    </Text>
                    <Formik
                        initialValues={{ email: '', }}
                        onSubmit={values => { handleButton() }}
                        validationSchema={DisplayingErrorMessagesSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className='mt-5'>
                                <PrimaryInput
                                    value={values.email}
                                    setValue={handleChange('email')}
                                    placeholder="email"
                                />
                                {errors.email && touched.email ? <Text className='text-red-600 text-xs items-start text-left w-full pb-3'>{errors.email}
                                </Text> : null}
                                <PrimaryButton
                                    title="Devam Et"
                                    onPress={handleSubmit}
                                    titleStyle={{ fontWeight: '600' }}
                                />
                            </View>
                        )}
                    </Formik>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }} />
                    {showChangesSaved && (
                        <Animated.View
                            className="w-full p-3 rounded-xl border justify-center items-center mb-3"
                            style={{
                                backgroundColor: 'rgba(0, 151, 103, 0.05)',
                                borderColor: 'rgba(0, 151.08, 103.45, 0.10)',

                            }}>
                            <Text
                                className='text-sm font-Inter font-medium leading-6'
                                style={{
                                    color: '#009767',
                                }}>
                                Şifre sıfırlama maili gönderildi
                            </Text>
                        </Animated.View>
                    )}
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};

export default ForgotPassword;
