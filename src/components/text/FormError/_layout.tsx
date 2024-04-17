import React from "react"
import { Text } from "react-native"

const FormError: React.FC<{ error: string }> = ({ error }) => {
    return <Text className="my-2 text-red-800 font-medium">{error}</Text>
}

export default FormError;