import React from 'react';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import Icon from 'react-native-easy-icon';
import { Image } from 'react-native';

const Tabs = () => {
  const tabs = [
    {
      name: 'Home',
      activeIcon: <Image source={require('../assets/icons8-home-green.png')} />,
      inactiveIcon: <Image source={require('../assets/icons8-home-384.png')} />
    },
    {
      name: 'List',
      activeIcon: <Image source={require('../assets/icons8-list-100.png')} />,
      inactiveIcon: <Image source={require('../assets/icons8-list-100 (1).png')} />
    },
    // {
    //   name: 'Camera',
    //   activeIcon: <Icon type="feather" name="camera" color="#fff" size={25} />,
    //   inactiveIcon: <Icon type="feather" name="camera" color="#4d4d4d" size={25} />
    // },
    // {
    //   name: 'Notification',
    //   activeIcon: <Icon type="feather" name="bell" color="#fff" size={25} />,
    //   inactiveIcon: <Icon type="feather" name="bell" color="#4d4d4d" size={25} />
    // },
    // {
    //   name: 'Profile',
    //   activeIcon: <Icon type="feather" name="user" color="#fff" size={25} />,
    //   inactiveIcon: <Icon type="feather" name="user" color="#4d4d4d" size={25} />
    // },
  ];

  return (
    <Tabbar
      tabs={tabs}
      tabBarContainerBackground='#6699ff'
      tabBarBackground='#fff'
      activeTabBackground='#6699ff'
      labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11 }}
      onTabChange={() => console.log('Tab changed')}
    />
  );
};

export default Tabs;
