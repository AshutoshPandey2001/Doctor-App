import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { GlobalStyle } from '../globalStyle';
import Icon from 'react-native-easy-icon';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import RNPrint from 'react-native-print';
import { printDescription } from '../component/Print';
import { getFocusedRouteNameFromRoute, useIsFocused, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import { setLoading } from '../redux/action/UiSlice';

interface State {
    paymentStatus: string;
    diagnosis: string;
    followup: any;
    generalInstruction: string;
    advice: {
        medicine: string;
        frequency: {
            M: boolean;
            A: boolean;
            E: boolean;
            N: boolean;
        };
        days: number;
        total: number;
        advice: string;
    };
    prescription: any[]; // You can define a proper type for prescription items
    patientsHistory: any[]; // You can define a proper type for patient history items
    pid: string;
    pName: string;
    page: number;
    pGender: string;
    pAddress: string;
    pMobileNo: string;
    consultingDate: string;
    drName: string;
    opdCaseNo: string;
    opduid: string;
    timestamp: {
        seconds: number,
        nanoseconds: number
    };
}


const DoctorPriscription = ({ navigation, route }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [routeName, setRouteName] = useState<any>();
    const user: any = useSelector((state: RootState) => state.user)
    const patientData = route.params
    const [state, setState] = useState<State>({ ...patientData });
    const [advice, setAdvice] = useState({
        id: Math.floor(1000 + Math.random() * 9000),
        medicine: '',
        frequency: { M: 0, A: 0, E: 0, N: 0 },
        days: '',
        total: '',
        advice: '',
    });
    const [checkboxValues, setCheckboxValues] = useState({
        M: false,
        A: false,
        E: false,
        N: false,
    });
    const [prescription, setPrescription] = useState<any>([]);
    const [history, setHistory] = useState<any>([])
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setselectedDate] = useState<any>();
    const focus = useIsFocused();
    const dispatch = useDispatch()

    const historydummyDataArray = [
        {
            consultingDate: "2023-01-15", // Replace with your desired default consultingDate
            diagnosis: "Lorem Ipsum Diagnosis 1",
            followup: "2023-01-20", // Replace with your desired default followup date
            prescription: [
                {
                    id: 1,
                    medicine: "Dummy Medicine 1",
                    frequency: { M: "Morning", A: "Afternoon", E: "Evening", N: "Night" },
                    days: 7,
                    total: 14,
                    advice: "Lorem Ipsum Advice 1",
                },
                // Add more prescription items as needed
            ],
        },
        {
            consultingDate: "2023-02-05", // Replace with your desired default consultingDate
            diagnosis: "Lorem Ipsum Diagnosis 2",
            followup: "2023-02-10", // Replace with your desired default followup date
            prescription: [
                {
                    id: 1,
                    medicine: "Dummy Medicine 2",
                    frequency: { M: "Morning", A: "Afternoon", E: "Evening", N: "Night" },
                    days: 10,
                    total: 20,
                    advice: "Lorem Ipsum Advice 2",
                },
                {
                    id: 2,
                    medicine: "Dummy Medicine 2",
                    frequency: { M: "Morning", A: "Afternoon", E: "Evening", N: "Night" },
                    days: 10,
                    total: 20,
                    advice: "Lorem Ipsum Advice 2",
                },
                // Add more prescription items as needed
            ],
        },
        {
            consultingDate: "2023-07-05", // Replace with your desired default consultingDate
            diagnosis: "Lorem Ipsum Diagnosis 2",
            followup: "2023-02-10", // Replace with your desired default followup date
            prescription: [
                {
                    id: 1,
                    medicine: "Dummy Medicine 2",
                    frequency: { M: "Morning", A: "Afternoon", E: "Evening", N: "Night" },
                    days: 10,
                    total: 20,
                    advice: "Lorem Ipsum Advice 2",
                },
                {
                    id: 2,
                    medicine: "Dummy Medicine 2",
                    frequency: { M: "Morning", A: "Afternoon", E: "Evening", N: "Night" },
                    days: 10,
                    total: 20,
                    advice: "Lorem Ipsum Advice 2",
                },
                // Add more prescription items as needed
            ],
        },
    ];
    // const patientData = {
    //     pid: '123456789', // Patient ID
    //     pName: 'John Doe', // Patient Name
    //     page: 30, // Patient Age
    //     pGender: 'Male', // Patient Gender
    //     pAddress: '123 Main St, City', // Patient Address
    //     pMobileNo: '123-456-7890', // Patient Mobile Number
    //     opdCaseNo: 'OPD123', // OPD Case Number
    //     opduid: 'UID456', // OPD ID
    //     consultingDate: "22/11/2023", // Consulting Date (JavaScript Date object)
    //     drName: 'Dr. Smith', // Consulting Doctor's Name
    //     diagnosis: 'Fever', // Diagnosis
    //     followup: "29/11/2023", // Follow-up Date (JavaScript Date object)
    //     prescription: [
    //         {
    //             medicine: 'Medicine A', // Medicine Name
    //             frequency: { M: 1, A: 1, E: 0, N: 1 }, // Frequency
    //             days: 5, // Number of Days
    //             total: 20, // Total
    //             advice: 'After meal', // Advice
    //         },
    //         {
    //             medicine: 'Medicine B', // Medicine Name
    //             frequency: { M: 1, A: 0, E: 1, N: 1 }, // Frequency
    //             days: 5, // Number of Days
    //             total: 20, // Total
    //             advice: 'After meal', // Advice
    //         },
    //         // Add more prescription items as needed in the same format
    //     ],
    //     generalInstruction: `Avoid exposure to cold weather.\nTake plenty of rest.`, // General Instructions
    // };
    // Now you can use these two dummy data entries in your component
    const printHTML = async () => {
        printDescription(patientData, user)
    };
    useLayoutEffect(() => {
        if (route.name === "History") {
            setRouteName(false)
        } else {
            setRouteName(true)
        }
    }, [route])
    useEffect(() => {
        if (focus) {
            dispatch(setLoading(true))
            const subscribe = firestore()
                .collection('opdPatients')
                .doc('m5JHl3l4zhaBCa8Vihcb')
                .collection('opdPatient')
                .where('hospitaluid', '==', user.user.hospitaluid)
                .where('deleted', '==', 0)
                .where('druid', '==', user.user.druid)
                .where('pid', "==", state.pid)
                .where('paymentStatus', "==", "Completed")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    const newData: any = [];
                    snapshot.forEach((doc) => {
                        newData.push(doc.data());
                    });
                    setHistory(newData)
                    console.log('newData-------------------------------------', newData);

                });
            dispatch(setLoading(false))

            return () => {
                subscribe();
            };
        }
    }, [focus]);
    const openHistory = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };

    const printPrescription = (data: State) => {
        // Implement your print functionality
    };

    const savePrescription = async () => {
        dispatch(setLoading(true))

        const querySnapshot = await firestore()
            .collection('opdPatients')
            .doc('m5JHl3l4zhaBCa8Vihcb')
            .collection('opdPatient')
            .where('hospitaluid', '==', user.user.hospitaluid)
            .where('opduid', '==', state.opduid)
            .get();

        querySnapshot.forEach(async (doc) => {
            try {
                // Update the document with new data
                await doc.ref.update({
                    ...state,
                    prescription,
                    timestamp: new Date(state.timestamp.seconds * 1000 + Math.floor(state.timestamp.nanoseconds / 1e6))
                });
                dispatch(setLoading(false))
                navigation.goBack()

                console.log('Document successfully updated!');
            } catch (error) {
                dispatch(setLoading(false))
                console.error('Error updating document: ', error);
            }
        });
    };

    const handleCheckboxChange = (e: keyof typeof checkboxValues) => {
        setCheckboxValues({ ...checkboxValues, [e]: !checkboxValues[e] });
        setAdvice((prevAdvice) => ({
            ...prevAdvice,
            frequency: {
                ...prevAdvice.frequency,
                [e]: 1,
            },
        }));
    };
    const pushAdvice = () => {
        if (!advice) {
            return;
        }
        console.log('advice', advice);
        setPrescription([...prescription, advice]);
        setAdvice({
            id: Math.floor(1000 + Math.random() * 9000),
            medicine: '',
            frequency: {
                M: 0,
                A: 0,
                E: 0,
                N: 0,
            },
            total: '',
            days: '',
            advice: ''
        });
        setCheckboxValues({
            M: false,
            A: false,
            E: false,
            N: false,
        })
        // Implement your pushAdvice function logic here
    };

    const cancelAdvice = (item: any) => {
        setPrescription(prescription.filter((medicine: any) => medicine.id !== item.id))

        // Implement your cancelAdvice function logic here
    };
    const renderItem = ({ item }: { item: any }) => (
        <View style={[GlobalStyle.card, { width: Dimensions.get('window').width - 50, }]}>
            <View style={GlobalStyle.leftSide}>
                <Text style={GlobalStyle.label}>Medicine:</Text>
                <Text style={GlobalStyle.label}>Freuency:</Text>
                <Text style={GlobalStyle.label}>Days:</Text>
                <Text style={GlobalStyle.label}>Total:</Text>
                <Text style={GlobalStyle.label}>Advice:</Text>
            </View>
            <View style={GlobalStyle.middleSide}>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.medicine}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.frequency.M} - {item.frequency.A} - {item.frequency.E} - {item.frequency.N}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.days}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.total}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.advice}</Text>

            </View>
            {!showModal ?
                <View style={[GlobalStyle.rightSide, { alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable onPress={() => cancelAdvice(item)}>
                            <Icon type="entypo" name="cross" color="gray" size={25} />
                        </Pressable>
                    </View>
                </View> : null
            }
        </View>
    );
    const [activeSections, setActiveSections] = useState([0]);
    const renderHeader = (section: any, isActive: number) => (

        <View style={[GlobalStyle.card, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={{ color: '#000', fontSize: 16 }}>Consulting Date :-{section.consultingDate}</Text>
            <View>
                {isActive === activeSections[0] ?
                    <Icon type="feather" name="chevron-down" color="gray" size={25} />
                    :
                    <Icon type="feather" name="chevron-right" color="gray" size={25} />}
            </View>
        </View>
    );

    const renderContent = (section: any) => (
        <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Diagnosis:</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>{section.diagnosis}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Followup:-</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>{section.followup}</Text>
            </View>
            <Text style={styles.subHeading}>RX(Advice on OPD):</Text>
            {section.prescription?.map((item: any, i: any) => (
                <View key={i} style={[GlobalStyle.card, { width: Dimensions.get('window').width - 50, }]}>
                    <View style={GlobalStyle.leftSide}>
                        <Text style={GlobalStyle.label}>Medicine:</Text>
                        <Text style={GlobalStyle.label}>Freuency:</Text>
                        <Text style={GlobalStyle.label}>Days:</Text>
                        <Text style={GlobalStyle.label}>Total:</Text>
                        <Text style={GlobalStyle.label}>Advice:</Text>
                    </View>
                    <View style={GlobalStyle.middleSide}>
                        <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.medicine}</Text>
                        <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.frequency.M} - {item.frequency.A} - {item.frequency.E} - {item.frequency.N}</Text>
                        <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.days}</Text>
                        <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.total}</Text>
                        <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.advice}</Text>

                    </View>
                    {!showModal ?
                        <View style={[GlobalStyle.rightSide, { alignItems: 'center', justifyContent: 'center' }]}>
                            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Pressable onPress={() => cancelAdvice(item)}>
                                    <Icon type="entypo" name="cross" color="gray" size={25} />
                                </Pressable>
                            </View>
                        </View> : null
                    }
                </View>
            ))}
            {/* <GestureHandlerRootView>
                <FlatList
                    data={section.prescription}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    onEndReachedThreshold={0.1}
                />
            </GestureHandlerRootView> */}
        </View>
    );

    const updateSections = (updatedSections: any) => {
        setActiveSections(updatedSections);
    };
    const Prescription = () => {
        return (
            <View>
                {prescription?.map((item: any, i: any) => (
                    <View key={i} style={[GlobalStyle.card, { width: Dimensions.get('window').width - 50, }]}>
                        <View style={GlobalStyle.leftSide}>
                            <Text style={GlobalStyle.label}>Medicine:</Text>
                            <Text style={GlobalStyle.label}>Freuency:</Text>
                            <Text style={GlobalStyle.label}>Days:</Text>
                            <Text style={GlobalStyle.label}>Total:</Text>
                            <Text style={GlobalStyle.label}>Advice:</Text>
                        </View>
                        <View style={GlobalStyle.middleSide}>
                            <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.medicine}</Text>
                            <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.frequency.M} - {item.frequency.A} - {item.frequency.E} - {item.frequency.N}</Text>
                            <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.days}</Text>
                            <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.total}</Text>
                            <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.advice}</Text>

                        </View>
                        {!showModal ?
                            <View style={[GlobalStyle.rightSide, { alignItems: 'center', justifyContent: 'center' }]}>
                                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Pressable onPress={() => cancelAdvice(item)}>
                                        <Icon type="entypo" name="cross" color="gray" size={25} />
                                    </Pressable>
                                </View>
                            </View> : null
                        }
                    </View>
                ))}
            </View>
            // <GestureHandlerRootView>
            //     <FlatList
            //         data={prescription}
            //         renderItem={renderItem}
            //         keyExtractor={(item: any, i: number) => item.id}
            //         onEndReachedThreshold={0.1}
            //     />
            // </GestureHandlerRootView>
        )
    }
    const openDatePicker = () => {
        setDatePickerVisible(true);
    };
    const formatDate = (date: any) => {
        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleDateChange = (date: any) => {
        setselectedDate(date)
        setState({ ...state, followup: formatDate(date) })
        setDatePickerVisible(false)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 15 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon type="feather" name="arrow-left" color='#000' size={35} />
                </Pressable>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: -35 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold' }}>{routeName ? 'Prescription' : 'History'}</Text>
                </View>
            </View>
            <ScrollView nestedScrollEnabled={true}>
                <View style={{ margin: 20 }}>
                    <View style={{ display: 'none' }}>
                        {/* Render PrintButton here */}
                    </View>
                    {routeName ? (
                        <>
                            <View >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.heading}>Patient Information</Text>
                                    <Pressable style={{ backgroundColor: '#2a7fba', height: 30, padding: 6, borderRadius: 15, paddingHorizontal: 10 }} onPress={() => openHistory()}><Text style={{ color: '#fff', fontWeight: 'bold' }}>Open History</Text></Pressable>
                                </View>
                                <View style={GlobalStyle.card}>
                                    <View style={GlobalStyle.leftSide}>
                                        <Text style={GlobalStyle.label}>Name: </Text>
                                        <Text style={GlobalStyle.label}>Age/Sex: </Text>
                                        <Text style={GlobalStyle.label}>Address: </Text>
                                        <Text style={GlobalStyle.label}>Mobile No: </Text>
                                        <Text style={GlobalStyle.label}>Consulting Dr.: </Text>
                                    </View>
                                    <View style={GlobalStyle.middleSide}>
                                        <Text style={GlobalStyle.textcolor}>{state.pName}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.page}/{state.pGender}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.pAddress}</Text>
                                        <Text style={GlobalStyle.textcolor}> {state.pMobileNo}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.drName}</Text>
                                    </View>
                                </View>

                                <View style={styles.section}>

                                    <Text style={styles.subHeading}>Diagnosis:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter diagnosis"
                                        value={state.diagnosis}
                                        onChangeText={(text) => setState({ ...state, diagnosis: text })}
                                        placeholderTextColor={'gray'}
                                    />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.subHeading}>Follow-up:</Text>
                                    <View
                                        style={{
                                            borderColor: 'lightgray',
                                            paddingHorizontal: 5,
                                            // marginLeft: 5,
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            height: 50
                                        }}
                                    >
                                        <Text style={{ width: '100%', fontSize: 14, color: 'gray' }} onPress={() => openDatePicker()}>{state.followup ? state.followup : 'Select follow-up Date'}</Text>

                                    </View>
                                    {/* <View >
                                        <Text onPress={() => console.log('clickked')}
                                        ></Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter follow-up Details"
                                            editable={false}
                                            value={state.followup}
                                            onChangeText={(text) => setState({ ...state, followup: text })}
                                            placeholderTextColor={'gray'}
                                        />
                                    </View> */}
                                    <DatePicker
                                        modal
                                        open={datePickerVisible}
                                        date={selectedDate || new Date()}
                                        mode='date'
                                        onConfirm={(date) => {
                                            handleDateChange(date)
                                        }}
                                        onCancel={() => {
                                            setDatePickerVisible(false)
                                        }}
                                    />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.heading}>Prescription</Text>
                                    <Text style={styles.subHeading}>Medicine:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Medicine"
                                        value={advice.medicine}
                                        onChangeText={(text) => setAdvice({ ...advice, medicine: text })}
                                        placeholderTextColor={'gray'}
                                    />

                                    <Text style={styles.subHeading}>Frequency:</Text>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBox
                                            value={checkboxValues.M}
                                            onValueChange={() => handleCheckboxChange('M')}
                                        />
                                        <Text style={{ color: 'gray', fontSize: 20, margin: 5, marginHorizontal: 5 }}>M</Text>

                                        <CheckBox
                                            value={checkboxValues.A}
                                            onValueChange={() => handleCheckboxChange('A')}
                                        />
                                        <Text style={{ color: 'gray', fontSize: 20, margin: 5, marginHorizontal: 5 }}>A</Text>

                                        <CheckBox
                                            value={checkboxValues.E}
                                            onValueChange={() => handleCheckboxChange('E')}
                                        />
                                        <Text style={{ color: 'gray', fontSize: 20, margin: 5, marginHorizontal: 5 }}>E</Text>

                                        <CheckBox
                                            value={checkboxValues.N}
                                            onValueChange={() => handleCheckboxChange('N')}
                                        />
                                        <Text style={{ color: 'gray', fontSize: 20, margin: 5, marginHorizontal: 5 }}>N</Text>

                                    </View>


                                    <Text style={styles.subHeading}>Advice:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter advice"
                                        value={advice.advice}
                                        onChangeText={(text) => setAdvice({ ...advice, advice: text })}
                                        placeholderTextColor={'gray'}
                                    />
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={styles.subHeading}>Days:</Text>
                                            <TextInput
                                                style={[styles.input, { width: 150 }]}
                                                placeholder="Enter days"
                                                value={advice.days}
                                                keyboardType='numeric'
                                                onChangeText={(text) => setAdvice({ ...advice, days: text })}
                                                placeholderTextColor={'gray'}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.subHeading}>Total:</Text>
                                            <TextInput
                                                style={[styles.input, { width: 150 }]}
                                                placeholder="Enter total"
                                                value={advice.total}
                                                keyboardType='numeric'
                                                onChangeText={(text) => setAdvice({ ...advice, total: text })}
                                                placeholderTextColor={'gray'}
                                            />
                                        </View>
                                    </View>
                                    {/* Continue with the rest of the UI elements... */}
                                    <View style={{ display: 'flex', alignItems: 'center' }}>
                                        <Pressable onPress={() => pushAdvice()} style={{ justifyContent: 'center', width: 150, borderRadius: 20, height: 40, backgroundColor: '#2a7fba' }}>
                                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Add Medicine</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <Text style={styles.subHeading}>RX(Advice on OPD):</Text>
                                    <ScrollView horizontal={true} style={{ width: '100%' }}>

                                        <Prescription />
                                    </ScrollView>
                                </View>
                                <View style={styles.section}>
                                    <Text style={styles.subHeading}>General instructions:</Text>
                                    <TextInput
                                        style={[{ ...styles.input }, { height: 100 }]}
                                        placeholder="Enter general instructions"
                                        value={state.generalInstruction}
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={(text) => setState({ ...state, generalInstruction: text })}
                                        placeholderTextColor={'gray'}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Pressable onPress={() => printHTML()}>
                                        <Icon type="feather" name="printer" color="red" size={35} />
                                    </Pressable>
                                    <Pressable onPress={() => savePrescription()}>
                                        <Icon type="feather" name="save" color="green" size={35} />
                                    </Pressable>
                                </View>
                            </View>
                        </>
                    ) : (
                        <View>
                            {/* <ScrollView> */}
                            <View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.heading}>Patient Information</Text>
                                </View>
                                <View style={GlobalStyle.card}>
                                    <View style={GlobalStyle.leftSide}>
                                        <Text style={GlobalStyle.label}>Name: </Text>
                                        <Text style={GlobalStyle.label}>Age/Sex: </Text>
                                        <Text style={GlobalStyle.label}>Address: </Text>
                                        <Text style={GlobalStyle.label}>Mobile No: </Text>
                                        <Text style={GlobalStyle.label}>Consulting Dr.: </Text>
                                    </View>
                                    <View style={GlobalStyle.middleSide}>
                                        <Text style={GlobalStyle.textcolor}>{state.pName}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.page}/{state.pGender}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.pAddress}</Text>
                                        <Text style={GlobalStyle.textcolor}> {state.pMobileNo}</Text>
                                        <Text style={GlobalStyle.textcolor}>{state.drName}</Text>
                                    </View>
                                </View>
                                {history.length > 0 ?
                                    <Accordion
                                        align={'center'}
                                        sections={history}
                                        activeSections={activeSections}
                                        renderHeader={(section, isActive) => renderHeader(section, isActive)}
                                        renderContent={renderContent}
                                        keyExtractor={(item, index) => index}
                                        onChange={updateSections}
                                        underlayColor={'transparenet'}
                                    /> :
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', fontWeight: 'bold' }}>There are no history to display</Text>}
                            </View>

                            {/* </ScrollView> */}
                        </View>
                    )}
                    <Modal visible={showModal} transparent={false} animationType="slide">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, marginVertical: Platform.OS === "ios" ? 30 : 0 }}>
                            <View style={{ margin: 20, flex: 1, width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'black', fontSize: 20 }}>Patient History</Text>
                                    <TouchableOpacity onPress={() => handleClose()} >
                                        <Icon type="entypo" name="cross" color="black" size={35} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    {history.length > 0 ?
                                        <Accordion
                                            align={'center'}
                                            sections={history}
                                            activeSections={activeSections}
                                            renderHeader={(section, isActive) => renderHeader(section, isActive)}
                                            renderContent={renderContent}
                                            keyExtractor={(item, index) => index}
                                            onChange={updateSections}
                                            underlayColor={'transparenet'}
                                        /> :
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', fontWeight: 'bold' }}>There are no history to display</Text>}
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
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
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    prescriptionItem: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    },
});
export default DoctorPriscription;
