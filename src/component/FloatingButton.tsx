import {useFormik} from 'formik';
import React, {useState} from 'react';
import Icon from 'react-native-easy-icon';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {setLastPatient, setPatients} from '../redux/action/PatientsSlice';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomSearchAutocomplete from './CustomSearchAutocomplete';
import SelectDropdown from 'react-native-select-dropdown';
import {setLoading} from '../redux/action/UiSlice';
import NetInfo from '@react-native-community/netinfo';

interface InitialFormValues {
  pid: string;
  pName: string;
  page: string;
  age: string;
  duration: string;
  pGender: string;
  pAddress: string;
  pMobileNo: string;
  consultingDate: string;
  drName: string;
  druid: string;
  consultingCharge: string;
  opduid: number;
  opdCaseNo: string;
  paymentStatus: 'Pending';
  advices: [];
  hospitaluid: string;
  deleted: number;
}
const FloatingButton = ({navigation}: any) => {
  const user: any = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Add 1 to month since it is zero-based
  const day = String(currentDate.getUTCDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}Z`;
  const dispatch = useDispatch();
  const allPatients: any = useSelector((state: RootState) => state.patients);

  const [initialFormValues, setInitialFormValues] = useState<InitialFormValues>(
    {
      pid: '',
      pName: '',
      page: '',
      age: '',
      duration: 'Years',
      pGender: '',
      pAddress: '',
      pMobileNo: '',
      consultingDate: formattedDate,
      drName: user.user?.doctorName,
      druid: user.user?.druid,
      consultingCharge: '',
      opduid: 0,
      opdCaseNo: '',
      paymentStatus: 'Pending',
      advices: [],
      hospitaluid: user.user?.hospitaluid,
      deleted: 0,
    },
  );
  const patientSchema = yup.object({
    pName: yup.string().required('Patient Name is Required'),
    pGender: yup.string().required('Gendre is Required'),
    age: yup.string().required('Age is Required'),
    drName: yup.string().required('Doctor Name is Required'),
    consultingCharge: yup.number().required('Consulting Charge is Required'),
    pMobileNo: yup
      .string()
      .min(10, 'Mobile Number must be at least 10 digits')
      .matches(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'),
  });
  const formik = useFormik<InitialFormValues>({
    initialValues: initialFormValues,
    validationSchema: patientSchema,
    onSubmit: async (values: any) => {
      const isConnected = await NetInfo.fetch().then(
        state => state.isConnected,
      );
      if (!isConnected) {
        handleClose();
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
        );
        return;
      }
      dispatch(setLoading(true));

      const timestamp = new Date();
      const opduid = Math.floor(2000 + Math.random() * 9000);
      values.age = Number(values.age);
      const commonData = {
        pName: values.pName,
        age: values.age,
        pGender: values.pGender,
        pAddress: values.pAddress,
        pMobileNo: values.pMobileNo,
        drName: values.drName,
        hospitaluid: values.hospitaluid,
        deleted: 0,
        timestamp,
      };

      if (values.pid) {
        const opdData = {
          pid: values.pid,
          page: `${values.age} ${values.duration}`,
          consultingDate: values.consultingDate,
          druid: values.druid,
          consultingCharge: Number(values.consultingCharge),
          opduid,
          opdCaseNo: values.opdCaseNo,
          paymentStatus: values.paymentStatus,
          advices: [],
          ...commonData,
        };

        const opdRef = firestore()
          .collection('opdPatients')
          .doc('m5JHl3l4zhaBCa8Vihcb')
          .collection('opdPatient');

        const batch = firestore().batch();
        const opdDocRef = opdRef.doc();
        batch.set(opdDocRef, opdData);

        try {
          await batch.commit();
          const newPatients = await opdDocRef.get();
          console.log('newPatients----------------', newPatients.data());
          // navigation.navigate('DoctorPriscription', newPatients.data())
          handleClose();
          dispatch(setLoading(false));
        } catch (error: any) {
          console.error('Error sending message: ', error.message);
          Alert.alert('Error', error.message);
          handleClose();
          dispatch(setLoading(false));
        }
      } else {
        const pid = Math.floor(Math.random() + timestamp.getTime());
        const patienstData = {
          pid,
          page: `${values.age} ${values.duration}`,
          ...commonData,
        };

        const opdData = {
          pid,
          page: `${values.age} ${values.duration}`,
          consultingDate: values.consultingDate,
          druid: values.druid,
          consultingCharge: Number(values.consultingCharge),
          opduid,
          opdCaseNo: values.opdCaseNo,
          paymentStatus: values.paymentStatus,
          advices: [],
          ...commonData,
        };

        const patientsRef = firestore()
          .collection('Patients')
          .doc('fBoxFLrzXexT8WNBzGGh')
          .collection('patients');

        const opdRef = firestore()
          .collection('opdPatients')
          .doc('m5JHl3l4zhaBCa8Vihcb')
          .collection('opdPatient');

        const batch = firestore().batch();
        const patientsDocRef = patientsRef.doc(); // Get reference to the new patient document
        const opdDocRef = opdRef.doc(); // Get reference to the new opd document
        batch.set(patientsDocRef, patienstData);
        batch.set(opdDocRef, opdData);
        try {
          await batch.commit();
          const newPatients = await opdDocRef.get();
          console.log('newPatients----------------', newPatients.data());
          // navigation.navigate('DoctorPriscription', newPatients.data())
          handleClose();
          dispatch(setLoading(false));
        } catch (error: any) {
          dispatch(setLoading(false));
          Alert.alert('Error', error.message);
          handleClose();
          console.error('Error sending message: ', error);
        }
      }
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    setFieldValue,
    resetForm,
  } = formik;
  const getAllPatients = async () => {
    try {
      let query = await firestore()
        .collection('Patients')
        .doc('fBoxFLrzXexT8WNBzGGh')
        .collection('patients')
        .where('hospitaluid', '==', user?.user?.hospitaluid || '')
        .where('deleted', '==', 0);

      if (allPatients?.lastPatients?.timestamp) {
        // console.log('allPatients?.lastPatients?.timestamp', JSON.parse(allPatients?.lastPatients?.timestamp));
        const {seconds, nanoseconds} = allPatients?.lastPatients?.timestamp;
        console.log('seconds, nanoseconds', seconds, nanoseconds);

        // const { seconds, nanoseconds } = JSON.parse(allPatients?.lastPatients?.timestamp);
        const timestamp = new firestore.Timestamp(seconds, nanoseconds);
        console.log('Timestamp:', timestamp);
        query = query.where('timestamp', '>', timestamp);
      }

      const querySnapshot = await query.get();
      const tempData = querySnapshot.docs.map(doc => doc.data());
      console.log('All patients list:', tempData);

      // Get the last visible document for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      const lastPatientData = lastVisibleDoc
        ? lastVisibleDoc.data()
        : {
            ...allPatients?.lastPatients,
            timestamp: allPatients?.lastPatients?.timestamp,
          };

      // Dispatch both patients and last patient in one action
      dispatch(setPatients(tempData));
      dispatch(setLastPatient(lastPatientData));
    } catch (error: any) {
      Alert.alert('Error', error.message);
      console.error('Error fetching patients:', error);
      // Handle the error as needed
    }
  };
  const addPatients = () => {
    getAllPatients();
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };
  const handleItemSelect = (item: any) => {
    setFieldValue('pid', item.pid);
    setFieldValue('pName', item.pName);
    setFieldValue('pMobileNo', item.pMobileNo);
    setFieldValue('pGender', item.pGender);
    setFieldValue('page', item.page);
    setFieldValue('age', item.age ? item.age : item.page);
    setFieldValue('duration', item.duration ? item.duration : 'Years');
    setFieldValue('pAddress', item.pAddress);
    setFieldValue('hospitaluid', item.hospitaluid);
  };
  const setValue = (item: any, key: any) => {
    setFieldValue(key, item);
  };

  return (
    <>
      <Pressable
        style={{
          position: 'absolute',
          bottom: 100,
          right: 16,
          backgroundColor: '#2a7fba',
          padding: 16,
          borderRadius: 50,
        }}
        onPress={() => addPatients()}>
        <Icon type="feather" name="plus" color="white" size={35} />
      </Pressable>
      {showModal && (
        <Modal visible={showModal} transparent={false} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              marginVertical: Platform.OS === 'ios' ? 30 : 0,
              zIndex: 0,
            }}>
            <View style={{margin: 20, flex: 1, width: '100%'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontSize: 20}}>Add Patient</Text>
                <Pressable onPress={() => handleClose()}>
                  <Icon type="entypo" name="cross" color="black" size={35} />
                </Pressable>
              </View>
              <GestureHandlerRootView>
                <ScrollView>
                  <View>
                    <View style={styles.section}>
                      <Text style={styles.subHeading}>OPD Case No:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Opd case number"
                        value={values.opdCaseNo}
                        onChangeText={handleChange('opdCaseNo')}
                        placeholderTextColor={'gray'}
                      />
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.subHeading}>Patient Name:</Text>

                      <View
                        style={[
                          {flex: 1, flexDirection: 'row', alignItems: 'center'},
                        ]}>
                        <CustomSearchAutocomplete
                          data={allPatients.patients}
                          searchKey="pName"
                          onSelect={handleItemSelect}
                          placeHolder={'Enter Patient Name'}
                          value={values.pName}
                          setValue={setValue}
                        />
                      </View>

                      {errors.pName && touched.pName && (
                        <Text style={styles.errorMsg}>{errors.pName}</Text>
                      )}
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.subHeading}>Mobile No:</Text>
                      <View
                        style={[
                          {flex: 1, flexDirection: 'row', alignItems: 'center'},
                          Platform.select({ios: {zIndex: 1}}),
                        ]}>
                        <CustomSearchAutocomplete
                          data={allPatients.patients}
                          searchKey="pMobileNo"
                          onSelect={handleItemSelect}
                          placeHolder={'Enter Mobile Number'}
                          value={values.pMobileNo}
                          setValue={setValue}
                        />
                      </View>
                      {errors.pMobileNo && touched.pMobileNo && (
                        <Text style={styles.errorMsg}>{errors.pMobileNo}</Text>
                      )}
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View style={{width: '55%'}}>
                        <Text style={styles.subHeading}>Age:</Text>
                        <TextInput
                          style={[styles.input]}
                          placeholder="Enter age"
                          keyboardType="numeric"
                          onChangeText={handleChange('age')}
                          placeholderTextColor={'gray'}
                          defaultValue={
                            values.age
                              ? values.age.toString()
                              : values.page.toString()
                          }
                        />
                        {errors.age && touched.age && (
                          <Text style={styles.errorMsg}>{errors.age}</Text>
                        )}
                      </View>
                      <View style={{width: '40%'}}>
                        <Text style={styles.subHeading}>Duration:</Text>
                        <SelectDropdown
                          data={['Years', 'Months', 'Days']}
                          onSelect={(selectedItem: any, index: number) => {
                            setFieldValue('duration', selectedItem);
                          }}
                          defaultValue={values.duration}
                          defaultButtonText={'Select Duration'}
                          buttonTextAfterSelection={(
                            selectedItem: any,
                            index: number,
                          ) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item: any, index: number) => {
                            return item;
                          }}
                          buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'lightgray',
                            paddingHorizontal: 5,
                            width: 'auto',
                            borderWidth: 1,
                            height: 50,
                            borderRadius: 6,
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.subHeading}>Address:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter patient address"
                        value={values.pAddress}
                        onChangeText={handleChange('pAddress')}
                        placeholderTextColor={'gray'}
                      />
                      {errors.pAddress && touched.pAddress && (
                        <Text style={styles.errorMsg}>{errors.pAddress}</Text>
                      )}
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={styles.subHeading}>Gender:</Text>
                        <SelectDropdown
                          data={['Male', 'Others', 'Female']}
                          onSelect={(selectedItem: any, index: number) => {
                            setFieldValue('pGender', selectedItem);
                          }}
                          defaultButtonText={'Select Gender'}
                          defaultValue={values.pGender}
                          buttonTextAfterSelection={(
                            selectedItem: any,
                            index: number,
                          ) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item: any, index: number) => {
                            return item;
                          }}
                          buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'lightgray',
                            paddingHorizontal: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            height: 50,
                            width: 150,
                            borderRadius: 6,
                          }}
                        />
                        {errors.pGender && touched.pGender && (
                          <Text style={styles.errorMsg}>{errors.pGender}</Text>
                        )}
                      </View>
                      <View>
                        <Text style={styles.subHeading}>
                          Consulting Charges:
                        </Text>
                        <SelectDropdown
                          data={[...user.user?.consultingCharges]}
                          onSelect={(selectedItem: any, index: number) => {
                            setFieldValue(
                              'consultingCharge',
                              selectedItem.charge,
                            );
                          }}
                          buttonTextAfterSelection={(
                            selectedItem: any,
                            index: number,
                          ) => {
                            return `${selectedItem?.visit} - ${selectedItem?.charge}`;
                          }}
                          defaultValue={values.consultingCharge}
                          rowTextForSelection={(item: any, index: number) => {
                            return `${item?.visit} - ${item?.charge}`;
                          }}
                          defaultButtonText={
                            values.consultingCharge
                              ? values.consultingCharge
                              : 'Select Consulting Charges'
                          }
                          buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'lightgray',
                            paddingHorizontal: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            height: 50,
                            borderRadius: 6,
                          }}
                        />
                        {errors.consultingCharge &&
                          touched.consultingCharge && (
                            <Text style={styles.errorMsg}>
                              {errors.consultingCharge}
                            </Text>
                          )}
                      </View>
                    </View>

                    <View style={styles.buttonContainer}>
                      <Pressable
                        onPress={() => handleSubmit()}
                        style={{
                          backgroundColor: 'blue',
                          padding: 10,
                          paddingHorizontal: 20,
                          borderRadius: 25,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}>
                          Submit
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </ScrollView>
              </GestureHandlerRootView>
            </View>
          </View>
        </Modal>
      )}
    </>
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
export default FloatingButton;
