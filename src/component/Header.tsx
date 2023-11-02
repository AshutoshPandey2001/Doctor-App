import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

function Header({ navigation }: any) {
    // const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginLeft: 15 }}
        >
            <Text>Menu</Text>
        </TouchableOpacity>
    );
}

export default Header;