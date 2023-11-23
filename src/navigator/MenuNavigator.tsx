import React from 'react';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { Dimensions, Image } from 'react-native';
import Icon from 'react-native-easy-icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCurrrentTabindex } from '../redux/action/UiSlice';

const Tabs = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const { currenttabIndex } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch()
  const tabs = [
    {
      id: 0,
      name: 'Home',
      activeIcon: <Icon type="fontisto" name="home" color="#2a7fba" size={35} />,
      inactiveIcon: <Icon type="fontisto" name="home" color="#4d4d4d" size={30} />,
    },
    {
      id: 1,
      name: 'Today',
      activeIcon: <Icon type="fontisto" name="person" color="#2a7fba" size={35} />,
      inactiveIcon: <Icon type="fontisto" name="person" color="#4d4d4d" size={30} />,

    },
    {
      id: 2,
      name: 'All',
      activeIcon: <Icon type="fontisto" name="persons" color="#2a7fba" size={35} />,
      inactiveIcon: <Icon type="fontisto" name="persons" color="#4d4d4d" size={30} />,

    },

  ];
  const onTabChange = (tab: any) => {
    // dispatch(setCurrrentTabindex(tab.id))
    navigation.navigate(tab.name)
  }
  return (
    <Tabbar
      tabs={tabs}
      // defaultActiveTabIndex={currenttabIndex}
      tabBarContainerBackground='#e5e5e5'
      tabBarBackground='#fff'
      activeTabBackground='#e5e5e5'
      containerBottomSpace={30}
      containerWidth={Dimensions.get('window').width - 20}
      containerTopLeftRadius={10}
      containerBottomLeftRadius={30}
      containerBottomRightRadius={30}
      containerTopRightRadius={10}
      transitionSpeed={1}
      labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11, display: 'none', borderWidth: 20, }}
      onTabChange={(tab) => onTabChange(tab)}
    />
  );
};

export default Tabs;
