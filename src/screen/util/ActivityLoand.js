import { View, ActivityIndicator } from "react-native";

export const ActivityLoand = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}
