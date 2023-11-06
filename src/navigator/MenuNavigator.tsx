import React from 'react';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-easy-icon';
import { useNavigation } from '@react-navigation/native';

const Tabs = () => {
  const navigation = useNavigation();

  const tabs = [
    {
      name: 'Home',
      activeIcon: <Icon type="feather" name="home" color="green" size={30} />,
      inactiveIcon: <Icon type="feather" name="home" color="#CCCCCC" size={30} />,
    },
    {
      name: 'Today Patients',
      activeIcon: <Icon type="fontisto" name="person" color="green" size={30} />,
      inactiveIcon: <Icon type="fontisto" name="person" color="#CCCCCC" size={30} />,
    },
    {
      name: 'All Patients',
      activeIcon: <Icon type="fontisto" name="persons" color="green" size={30} />,
      inactiveIcon: <Icon type="fontisto" name="persons" color="#CCCCCC" size={30} />,
    },

  ];

  return (
    <Tabbar
      tabs={tabs}
      tabBarContainerBackground='gray'
      tabBarBackground='#fff'
      activeTabBackground='gray'
      labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11 }}
      onTabChange={(tab) => console.log('Tab changed', tab)}
    />
  );
};

export default Tabs;
