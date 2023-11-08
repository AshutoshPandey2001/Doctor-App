import React from 'react';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { Image } from 'react-native';
import Icon from 'react-native-easy-icon';

const Tabs = ({ navigation }: any) => {
  // const navigation = useNavigation();

  const tabs = [
    {
      name: 'Home',
      activeIcon: <Icon type="feather" name="home" color="blue" size={30} />,
      inactiveIcon: <Icon type="feather" name="home" color="#4d4d4d" size={30} />,
    },
    {
      name: 'TodayPatients',
      activeIcon: <Icon type="fontisto" name="person" color="blue" size={30} />,
      inactiveIcon: <Icon type="fontisto" name="person" color="#4d4d4d" size={30} />,

    },
    {
      name: 'AllPatients',
      activeIcon: <Icon type="fontisto" name="persons" color="blue" size={30} />,
      inactiveIcon: <Icon type="fontisto" name="persons" color="#4d4d4d" size={30} />,

    },

  ];

  return (
    <Tabbar
      tabs={tabs}
      tabBarContainerBackground='#e5e5e5'
      tabBarBackground='#fff'
      activeTabBackground='#d5d5d5'
      labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11, display: 'none' }}
      onTabChange={(tab) => navigation.navigate(tab.name)}
    />
  );
};

export default Tabs;
