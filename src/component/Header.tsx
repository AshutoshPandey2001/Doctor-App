import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-easy-icon';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/action/UserSlice';

function Header({ navigation }: any) {
    // const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            dispatch(setUser(null))
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