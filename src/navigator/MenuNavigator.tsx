import React from 'react';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { Image } from 'react-native';
import Icon from 'react-native-easy-icon';

const Tabs = ({ navigation }: any) => {
  // const navigation = useNavigation();

  const tabs = [
    {
      name: 'Home',
      activeIcon: <Icon type="feather" name="home" color="green" size={30} />,
      inactiveIcon: <Icon type="feather" name="home" color="#CCCCCC" size={30} />,
    },
    {
      name: 'TodayPatients',
      activeIcon: <Icon type="fontisto" name="person" color="green" size={30} />,
      inactiveIcon: <Icon type="fontisto" name="person" color="#CCCCCC" size={30} />,

    },
    {
      name: 'AllPatients',
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
      labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11, display: 'none' }}
      onTabChange={(tab) => navigation.navigate(tab.name)}
    />
  );
};

export default Tabs;
