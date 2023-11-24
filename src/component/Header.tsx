import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-easy-icon';
import { Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/action/UserSlice';

function Header({ navigation }: any) {
    // const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            dispatch(setUser(null))
            // await auth().signOut();
            // User has signed out
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, padding: 0, alignItems: 'center', backgroundColor: '#e5e5e5' }}>
            <View>
                <Image
                    resizeMode='contain'
                    source={require('../assets/hospitalerp.png')}
                    style={{ width: 100, height: 70 }}
                />
            </View>
            <Pressable onPress={() => handleLogout()}>
                <Icon type="feather" name="log-out" color="#2a7fba" size={30} />
            </Pressable>
        </View>
    );
}

export default Header;