import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-easy-icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GlobalStyle} from '../globalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../redux/action/UiSlice';
import {printDescription} from '../component/Print';
import {RootState} from '../redux/store';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {useFormik} from 'formik';
import * as yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import CustomSearchAutocomplete from '../component/CustomSearchAutocomplete';
import {setLastPatient, setPatients} from '../redux/action/PatientsSlice';
import {formatDateDDMMYYY} from '../services/dateFormate';

const adUnitId: any =
  Platform.OS === 'ios'
    ? 'ca-app-pub-9665448244735411/5347441233'
    : 'ca-app-pub-8691082301379909/8658058910';

const TodayPatients = ({navigation}: any) => {
  const user: any = useSelector((state: RootState) => state.user);
  if (!user) {
    return;
  }
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Add 1 to month since it is zero-based
  const day = String(currentDate.getUTCDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}Z`;
  // const [data, setData] = useState<any>([]);
  const [todayPatients, setTodaypatients] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [showActions, setShowActions] = useState<any | null>(); // Track the selected card's ID
  const [showSmallPopup, setShowSmallPopup] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]); // Initial data with first 10 items
  const [page, setPage] = useState(1);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    const subscribe = firestore()
      .collection('opdPatients')
      .doc('m5JHl3l4zhaBCa8Vihcb')
      .collection('opdPatient')
      .where('hospitaluid', '==', user.user.hospitaluid)
      .where('deleted', '==', 0)
      .where('druid', '==', user.user.druid)
      .where('consultingDate', '==', formattedDate)
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          try {
            if (!snapshot.empty) {
              const newData: any = [];
              snapshot.forEach(doc => {
                newData.push(doc.data());
              });
              setTodaypatients(newData);
              setData(newData.slice(0, 10));
              console.log(
                'newData-------------------------------------',
                newData,
              );
            } else {
              setTodaypatients([]);
              setData([]);
              console.log('Snapshot is empty');
            }
          } catch (error: any) {
            Alert.alert('Error', error.message);

            console.error('Error processing snapshot data:', error);
          }
        },
        error => {
          Alert.alert('Error', error.message);
          console.error('Error fetching data:', error);
        },
      );

    return () => {
      subscribe();
    };
  }, []);

  const selectCard = (item: number) => {
    setisVisible(true);
    setShowActions(item);
  };
  const onClose = () => {
    setisVisible(false);
    setShowActions(null);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    if (index % 3 === 2 && index !== 0) {
      // Display ad banner after every 2 cards (excluding the first card)
      return (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
          <View
            style={[
              GlobalStyle.card,
              {width: Dimensions.get('window').width - 25, marginLeft: 3},
            ]}>
            <View style={GlobalStyle.leftSide}>
              <Text style={GlobalStyle.label}>Date:</Text>
              <Text style={GlobalStyle.label}>Name:</Text>
              <Text style={GlobalStyle.label}>Mobile No:</Text>
              <Text style={GlobalStyle.label}>Address:</Text>
            </View>
            <View style={GlobalStyle.middleSide}>
              <Text
                style={GlobalStyle.textcolor}
                numberOfLines={1}
                ellipsizeMode="tail">
                {formatDateDDMMYYY(item.consultingDate)}
              </Text>
              <Text
                style={GlobalStyle.textcolor}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.pName}
              </Text>
              <Text
                style={GlobalStyle.textcolor}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.pMobileNo}
              </Text>
              <Text
                style={GlobalStyle.textcolor}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.pAddress}
              </Text>
            </View>
            <View style={GlobalStyle.rightSide}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Pressable onPress={() => selectCard(item)}>
                  <Icon
                    type="feather"
                    name="more-vertical"
                    color="gray"
                    size={30}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </>
      );
    }

    return (
      <View
        style={[
          GlobalStyle.card,
          {width: Dimensions.get('window').width - 25, marginLeft: 3},
        ]}>
        <View style={GlobalStyle.leftSide}>
          <Text style={GlobalStyle.label}>Date:</Text>
          <Text style={GlobalStyle.label}>Name:</Text>
          <Text style={GlobalStyle.label}>Mobile No:</Text>
          <Text style={GlobalStyle.label}>Address:</Text>
        </View>
        <View style={GlobalStyle.middleSide}>
          <Text
            style={GlobalStyle.textcolor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {formatDateDDMMYYY(item.consultingDate)}
          </Text>
          <Text
            style={GlobalStyle.textcolor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.pName}
          </Text>
          <Text
            style={GlobalStyle.textcolor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.pMobileNo}
          </Text>
          <Text
            style={GlobalStyle.textcolor}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.pAddress}
          </Text>
        </View>
        <View style={GlobalStyle.rightSide}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable onPress={() => selectCard(item)}>
              <Icon
                type="feather"
                name="more-vertical"
                color="gray"
                size={30}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const loadMoreData = () => {
    dispatch(setLoading(true));
    const start = page * 10;
    const end = start + 10;
    setData([...data, ...todayPatients.slice(start, end)]);
    setPage(page + 1);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  };

  const printHTML = async (patientData: any) => {
    printDescription(patientData, user);
  };

  // const formatDate = (date: any) => {
  //   const dateObject = new Date(date);
  //   const day = String(dateObject.getDate()).padStart(2, '0');
  //   const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  //   const year = dateObject.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };
  const handleItemSelect = (item: any) => {
    console.log('Selected item:', item);
    // Do something with the selected item
  };
  const deleteOpdPatients = async (item: any) => {
    try {
      dispatch(setLoading(true));
      // Execute the query to get document references
      const querySnapshot = await firestore()
        .collection('opdPatients')
        .doc('m5JHl3l4zhaBCa8Vihcb')
        .collection('opdPatient')
        .where('hospitaluid', '==', item.hospitaluid)
        .where('deleted', '==', 0)
        .where('druid', '==', item.druid)
        .where('opduid', '==', item.opduid)
        .get();

      // Update data for each document in the query results
      querySnapshot.forEach(async doc => {
        try {
          // Update specific fields in the document
          await doc.ref.update({
            ...item,
            deleted: 1,
          });
          console.log(`Document with ID ${doc.id} successfully updated.`);
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));

          console.error(`Error updating document with ID ${doc.id}:`, error);
        }
      });

      console.log('All documents updated successfully.');
    } catch (error) {
      dispatch(setLoading(false));

      console.error('Error querying documents:', error);
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', marginBottom: 100}}>
      <View style={{flex: 1, padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#000',
            }}>
            Today's patients
          </Text>
          {/* {user?.user?.permissions?.find((permission: any) => permission.module === "PATIENTS") &&
                        <Pressable style={{ height: 'auto' }} onPress={() => addPatients()}><Icon type="feather" name="plus" color="#2a7fba" size={35} /></Pressable>
                    } */}
        </View>
        {/* <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>Today patients</Text> */}
        {data?.length === 0 ? (
          <>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'gray'}}>No patient's available</Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 10,
                  marginHorizontal: 30,
                }}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
              </View>
            </View>
          </>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.opduid.toString()}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
      {isVisible && (
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={onClose}
          onPointerDown={onClose}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onTouchEnd={onClose}>
            <View
              style={{
                height:
                  showActions && showActions?.prescription ? '25%' : '18%',
                width: '100%',
                marginTop: 'auto',
                backgroundColor: 'white',
                elevation: 5,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              {showActions && showActions?.prescription ? (
                <>
                  <TouchableOpacity
                    onPress={() => printHTML(showActions)}
                    style={GlobalStyle.btn}>
                    <Icon
                      type="feather"
                      name="printer"
                      color="gray"
                      size={25}
                    />
                    <Text
                      style={{
                        color: 'gray',
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Print
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('History', showActions)}
                    style={GlobalStyle.btn}>
                    <Icon type="feather" name="eye" color="gray" size={25} />
                    <Text
                      style={{
                        color: 'gray',
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DoctorPriscription', showActions)
                  }
                  style={[GlobalStyle.btn, {borderRadius: 15}]}>
                  <Icon type="feather" name="edit" color="gray" size={25} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Add Priscription
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => deleteOpdPatients(showActions)}
                style={[GlobalStyle.btn, {borderRadius: 15}]}>
                <Icon type="antdesign" name="delete" color="gray" size={25} />
                <Text
                  style={{
                    color: 'gray',
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={GlobalStyle.btn}>
                <Icon type="entypo" name="cross" color="gray" size={25} />
                <Text
                  style={{
                    color: 'gray',
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
  },
  section: {
    marginVertical: 10,
  },
  subHeading: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000',
    zIndex: -1,
    elevation: -1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  prescriptionItem: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});
export default TodayPatients;
