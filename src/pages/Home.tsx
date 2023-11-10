import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }: any) {
    // const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>

            </View>

        </SafeAreaView>
    );
}

export default Home;