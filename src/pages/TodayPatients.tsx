import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle } from '../globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/action/UiSlice';
import { printDescription } from '../component/Print';
import { RootState } from '../redux/store';
import firestore from '@react-native-firebase/firestore';
import { formatDateDDMMYYY } from '../services/dateFormate';
import DatePicker from 'react-native-date-picker';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik'
import * as yup from "yup"
import SelectDropdown from 'react-native-select-dropdown';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



const adUnitId: any = 'ca-app-pub-8691082301379909/8658058910';
interface InitialFormValues {
    pid: string,
    pName: string,
    page: string,
    age: number,
    duration: string,
    pGender: string,
    pAddress: string,
    pMobileNo: string,
    consultingDate: string,
    drName: string,
    druid: string,
    consultingCharge: number,
    opduid: number,
    opdCaseNo: string,
    paymentStatus: 'Pending',
    advices: [],
    hospitaluid: string,
    deleted: number,
}
const TodayPatients = ({ navigation }: any) => {
    const user: any = useSelector((state: RootState) => state.user)
    if (!user) {
        return
    }
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Add 1 to month since it is zero-based
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}Z`;
    // const [data, setData] = useState<any>([]);
    const [todayPatients, setTodaypatients] = useState<any>()
    const [showModal, setShowModal] = useState(false);
    const [showActions, setShowActions] = useState<any | null>(); // Track the selected card's ID
    const [showSmallPopup, setShowSmallPopup] = useState(false);
    const dispatch = useDispatch()
    const [data, setData] = useState<any>([]); // Initial data with first 10 items
    const [page, setPage] = useState(1);
    const [isVisible, setisVisible] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState<InitialFormValues>({
        pid: '',
        pName: '',
        page: '',
        age: 0,
        duration: 'Years',
        pGender: '',
        pAddress: '',
        pMobileNo: '',
        consultingDate: formattedDate,
        drName: user.user?.doctorName,
        druid: user.user?.druid,
        consultingCharge: 0,
        opduid: 0,
        opdCaseNo: '',
        paymentStatus: 'Pending',
        advices: [],
        hospitaluid: user.user?.hospitaluid,
        deleted: 0
    });
    const patientSchema = yup.object({
        pName: yup.string().required("Patient Name is Required"),
        pGender: yup.string().required("Gendre is Required"),
        age: yup.string().required("Age is Required"),
        drName: yup.string().required("Doctor Name is Required"),
        consultingCharge: yup.number().required("Consulting Charge is Required"),
    })
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
            .onSnapshot((snapshot) => {
                if (!snapshot.empty) { // Check if the snapshot is not empty
                    const newData: any = [];
                    snapshot.forEach((doc) => {
                        newData.push(doc.data());
                    });
                    setTodaypatients(newData);
                    setData(newData.slice(0, 10));
                    console.log('newData-------------------------------------', newData);
                } else {
                    console.log('Snapshot is empty');
                }
            });

        return () => {
            subscribe();
        };
    }, []);
    const selectCard = (item: number) => {
        setisVisible(true)
        setShowActions(item);
    };
    const onClose = () => {
        setisVisible(false)
        setShowActions(null);

    }
    const formik = useFormik<InitialFormValues>({
        initialValues: initialFormValues,
        validationSchema: patientSchema,
        onSubmit: (async (values: any) => {
            let timestamp = new Date().getTime();
            values.page = values.age + " " + values.duration
            values.pid = Math.floor(Math.random() + timestamp)
            values.opduid = Math.floor(2000 + Math.random() * 9000)
            const patienstData = {
                pid: values.pid,
                pName: values.pName,
                page: values.page,
                age: values.age,
                duration: values.duration,
                pGender: values.pGender,
                pAddress: values.pAddress,
                pMobileNo: values.pMobileNo,
                drName: values.drName,
                hospitaluid: values.hospitaluid,
                deleted: 0,
                timestamp: new Date()
            }
            const opdData = {
                pid: values.pid,
                pName: values.pName,
                page: values.page,
                age: values.age,
                pGender: values.pGender,
                pAddress: values.pAddress,
                pMobileNo: values.pMobileNo,
                drName: values.drName,
                hospitaluid: values.hospitaluid,
                consultingDate: values.consultingDate,
                druid: values.druid,
                consultingCharge: Number(values.consultingCharge),
                opduid: values.opduid,
                opdCaseNo: values.opdCaseNo,
                paymentStatus: values.paymentStatus,
                advices: [],
                deleted: 0,
                timestamp: new Date()

            }
            const patientsRef = firestore()
                .collection('Patients')
                .doc(`fBoxFLrzXexT8WNBzGGh`) // sender id
                .collection('patients')


            const opdref = firestore()
                .collection('opdPatients')
                .doc(`m5JHl3l4zhaBCa8Vihcb`) // reciver id
                .collection('opdPatient')
            console.log('patienstData-------------------', patienstData);
            console.log('opdData--------------', opdData);
            const batch = firestore().batch();

            batch.set(patientsRef.doc(), patienstData);
            batch.set(opdref.doc(), opdData);

            try {
                await batch.commit();
                setShowModal(false)
            } catch (error: any) {

                console.error('Error sending message: ', error);
            }
        }),
    });
    const { handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldValue } = formik

    // const renderItem = ({ item }: { item: any }) => (
    //     <View style={GlobalStyle.card}>
    //         <View style={GlobalStyle.leftSide}>
    //             <Text style={GlobalStyle.label}>Date:</Text>
    //             <Text style={GlobalStyle.label}>Patient Name:</Text>
    //             <Text style={GlobalStyle.label}>Address:</Text>
    //             <Text style={GlobalStyle.label}>Mobile No:</Text>
    //         </View>
    //         <View style={GlobalStyle.middleSide}>
    //             <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{formatDateDDMMYYY(item.consultingDate)}</Text>
    //             <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pName}</Text>
    //             <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pAddress}</Text>
    //             <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pMobileNo}</Text>

    //         </View>
    //         <View style={GlobalStyle.rightSide}>
    //             <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    //                 <Pressable onPress={() => selectCard(item)}>
    //                     <Icon type="feather" name="more-vertical" color="gray" size={30} />
    //                 </Pressable>
    //             </View>
    //         </View>
    //     </View>
    // );
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        if (index % 3 === 2 && index !== 0) {
            // Display ad banner after every 2 cards (excluding the first card)
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 10 }}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    />
                </View>
            );
        }

        return (
            <View style={GlobalStyle.card}>
                <View style={GlobalStyle.leftSide}>
                    {/* <Text style={GlobalStyle.label}>Date:</Text> */}
                    <Text style={GlobalStyle.label}>Patient Name:</Text>
                    <Text style={GlobalStyle.label}>Address:</Text>
                    <Text style={GlobalStyle.label}>Mobile No:</Text>
                </View>
                <View style={GlobalStyle.middleSide}>
                    {/* <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.consultingDate}</Text> */}
                    <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pName}</Text>
                    <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pAddress}</Text>
                    <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pMobileNo}</Text>

                </View>
                <View style={GlobalStyle.rightSide}>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable onPress={() => selectCard(item)}>
                            <Icon type="feather" name="more-vertical" color="gray" size={30} />
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    };
    // const renderItem = ({ item, index }: { item: any, index: number }) => {
    //     if (index % 3 === 0) {
    //         return (
    //             <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
    //                 <BannerAd
    //                     unitId={adUnitId}
    //                     size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    //                 />
    //             </View>
    //         );

    //     }
    //     return (
    //         <View style={GlobalStyle.card}>
    //             <View style={GlobalStyle.leftSide}>
    //                 <Text style={GlobalStyle.label}>Date:</Text>
    //                 <Text style={GlobalStyle.label}>Patient Name:</Text>
    //                 <Text style={GlobalStyle.label}>Address:</Text>
    //                 <Text style={GlobalStyle.label}>Mobile No:</Text>
    //             </View>
    //             <View style={GlobalStyle.middleSide}>
    //                 <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{formatDateDDMMYYY(item.consultingDate)}</Text>
    //                 <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pName}</Text>
    //                 <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pAddress}</Text>
    //                 <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.pMobileNo}</Text>

    //             </View>
    //             <View style={GlobalStyle.rightSide}>
    //                 <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    //                     <Pressable onPress={() => selectCard(item)}>
    //                         <Icon type="feather" name="more-vertical" color="gray" size={30} />
    //                     </Pressable>
    //                 </View>
    //             </View>
    //         </View>
    //     )

    // }
    const loadMoreData = () => {
        dispatch(setLoading(true))
        const start = page * 10;
        const end = start + 10;
        setData([...data, ...todayPatients.slice(start, end)]);
        setPage(page + 1);
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 2000);

    };

    const printHTML = async (patientData: any) => {
        printDescription(patientData, user)
    };
    const handleClose = () => {
        setShowModal(false);
    };
    const addPatients = () => {
        setShowModal(true);
    };
    const formatDate = (date: any) => {
        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom: 100 }}>
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}>Today's patients</Text>
                    {user?.user?.permissions?.find((permission: any) => permission.module === "PATIENTS") &&
                        <Pressable style={{ backgroundColor: '#2a7fba', height: 30, padding: 6, borderRadius: 15, paddingHorizontal: 10 }} onPress={() => addPatients()}><Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Patient</Text></Pressable>
                    }
                </View>
                {/* <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>Today patients</Text> */}
                {data?.length === 0 ? (
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No content to display.</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 30 }}>
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
                        keyExtractor={(item) => item.pid.toString()}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
            {isVisible && <Modal visible={isVisible} animationType="slide"
                transparent={true} onRequestClose={onClose} onPointerDown={onClose}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} onTouchEnd={onClose}>
                    <View style={{
                        height: "15%",
                        width: "100%",
                        marginTop: 'auto',
                        backgroundColor: 'white',
                        elevation: 5,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}>
                        {showActions && showActions?.prescription ?
                            <TouchableOpacity onPress={() => printHTML(showActions)} style={GlobalStyle.btn}>
                                <Icon type="feather" name="printer" color="gray" size={25} />
                                <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Print</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => navigation.navigate('DoctorPriscription', showActions)} style={[GlobalStyle.btn, { borderRadius: 15 }]}>
                                <Icon type="feather" name="edit" color="gray" size={25} />
                                <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Edit</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={onClose} style={GlobalStyle.btn}>
                            <Icon type="entypo" name="cross" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            {showModal &&
                <Modal visible={showModal} transparent={false} animationType="slide">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, marginVertical: Platform.OS === "ios" ? 30 : 0 }}>
                        <View style={{ margin: 20, flex: 1, width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>Patient History</Text>
                                <TouchableOpacity onPress={() => handleClose()} >
                                    <Icon type="entypo" name="cross" color="black" size={35} />
                                </TouchableOpacity>
                            </View>
                            <GestureHandlerRootView>
                                <ScrollView>
                                    <View>
                                        <View style={styles.section}>

                                            <Text style={styles.subHeading}>Patient Name:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Enter patient name"
                                                value={values.pName}
                                                onChangeText={handleChange('pName')}
                                                placeholderTextColor={'gray'}
                                            />
                                            {errors.pName && touched.pName &&
                                                <Text style={styles.errorMsg}>{errors.pName}</Text>
                                            }
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: 150 }}>
                                                <Text style={styles.subHeading}>Age:</Text>
                                                <TextInput
                                                    style={[styles.input, { width: 150 }]}
                                                    placeholder="Enter age"
                                                    keyboardType='numeric'
                                                    onChangeText={handleChange('age')}
                                                    placeholderTextColor={'gray'}
                                                />
                                                {errors.age && touched.age &&
                                                    <Text style={styles.errorMsg}>{errors.age}</Text>
                                                }
                                            </View>
                                            <View>
                                                <Text style={styles.subHeading}>Duration:</Text>
                                                <SelectDropdown
                                                    data={['Years', 'Months', 'Days']}
                                                    onSelect={(selectedItem: any, index: number) => {
                                                        setFieldValue('duration', selectedItem)
                                                    }}
                                                    defaultValue={values.duration}
                                                    defaultButtonText={'Select Duration'}
                                                    buttonTextAfterSelection={(selectedItem: any, index: number) => {
                                                        return selectedItem
                                                    }}
                                                    rowTextForSelection={(item: any, index: number) => {
                                                        return item
                                                    }}
                                                    buttonStyle={{
                                                        backgroundColor: 'transparent', borderColor: 'lightgray',
                                                        paddingHorizontal: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
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
                                            {errors.pAddress && touched.pAddress &&
                                                <Text style={styles.errorMsg}>{errors.pAddress}</Text>
                                            }
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View >
                                                <Text style={styles.subHeading}>Gender:</Text>
                                                <SelectDropdown
                                                    data={['Male', 'Others', 'Female']}
                                                    onSelect={(selectedItem: any, index: number) => {
                                                        setFieldValue('pGender', selectedItem)
                                                    }}
                                                    defaultButtonText={'Select Gender'}
                                                    defaultValue={values.pGender}
                                                    buttonTextAfterSelection={(selectedItem: any, index: number) => {
                                                        return selectedItem
                                                    }}
                                                    rowTextForSelection={(item: any, index: number) => {
                                                        return item
                                                    }}
                                                    buttonStyle={{
                                                        backgroundColor: 'transparent', borderColor: 'lightgray',
                                                        paddingHorizontal: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        height: 50,
                                                        width: 150,
                                                        borderRadius: 6,
                                                    }}
                                                />
                                                {errors.pGender && touched.pGender &&
                                                    <Text style={styles.errorMsg}>{errors.pGender}</Text>
                                                }
                                            </View>
                                            <View >
                                                <Text style={styles.subHeading}>Consulting Charges:</Text>
                                                <SelectDropdown
                                                    data={[...user.user?.consultingCharges]}
                                                    onSelect={(selectedItem: any, index: number) => {
                                                        setFieldValue('consultingCharge', selectedItem.charge)
                                                    }}
                                                    buttonTextAfterSelection={(selectedItem: any, index: number) => {
                                                        return `${selectedItem?.visit} - ${selectedItem?.charge}`
                                                    }}
                                                    defaultValue={values.consultingCharge}
                                                    rowTextForSelection={(item: any, index: number) => {
                                                        return `${item?.visit} - ${item?.charge}`;
                                                    }}
                                                    defaultButtonText={'Select Consulting Charges'}
                                                    buttonStyle={{
                                                        backgroundColor: 'transparent', borderColor: 'lightgray',
                                                        paddingHorizontal: 5,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        height: 50,
                                                        borderRadius: 6,
                                                    }}
                                                />
                                                {errors.consultingCharge && touched.consultingCharge &&
                                                    <Text style={styles.errorMsg}>{errors.consultingCharge}</Text>
                                                }
                                            </View>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.subHeading}>Mobile No:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Enter patient mobile no"
                                                value={values.pMobileNo}
                                                onChangeText={handleChange('pMobileNo')}
                                                placeholderTextColor={'gray'}
                                            />
                                            {errors.pMobileNo && touched.pMobileNo &&
                                                <Text style={styles.errorMsg}>{errors.pMobileNo}</Text>
                                            }
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.subHeading}>OPD Case No:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Enter patient mobile no"
                                                value={values.opdCaseNo}
                                                onChangeText={handleChange('opdCaseNo')}
                                                placeholderTextColor={'gray'}
                                            />
                                        </View>
                                        <View style={styles.buttonContainer}>
                                            <Pressable onPress={() => handleSubmit()} style={{ backgroundColor: 'blue', padding: 10, paddingHorizontal: 20, borderRadius: 25 }}>
                                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Submit</Text>
                                            </Pressable>

                                        </View>
                                    </View>
                                </ScrollView>
                            </GestureHandlerRootView>
                        </View>
                    </View>
                </Modal>}

        </SafeAreaView>
    )
}
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
        fontSize: 14
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
export default TodayPatients