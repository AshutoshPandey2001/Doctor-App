import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle } from '../globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/action/UiSlice';
import { printDescription } from '../component/Print';
import { RootState } from '../redux/store';
import firestore from '@react-native-firebase/firestore';

interface Patient {
    id: number;
    name: string;
    address: string;
    date: string;
    mobileNumber: string;
}
const AllPatients = ({ navigation }: any) => {
    const user: any = useSelector((state: RootState) => state.user)
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Add 1 to month since it is zero-based
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}Z`;
    // const [data, setData] = useState<any>([]);
    const [todayPatients, setTodaypatients] = useState([])

    const [showActions, setShowActions] = useState<any | null>(null); // Track the selected card's ID
    const [showSmallPopup, setShowSmallPopup] = useState(false);
    const dispatch = useDispatch()
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
            .where('paymentStatus', "==", "Completed")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                const newData: any = [];
                const existingPids = new Set(); // Maintain a set to track existing pids
                snapshot.forEach((doc) => {
                    const patientData = doc.data();
                    const pid = patientData.pid;
                    if (!existingPids.has(pid)) {
                        // Check if the pid is not already present
                        newData.push(patientData);
                        existingPids.add(pid); // Add the pid to the set
                    }
                });
                setTodaypatients(newData)
                setData(newData.slice(0, 10))
                console.log('newData-------------------------------------', newData);

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
    const renderItem = ({ item }: { item: any }) => (
        <View style={GlobalStyle.card}>
            <View style={GlobalStyle.leftSide}>
                <Text style={GlobalStyle.label}>Date:</Text>
                <Text style={GlobalStyle.label}>Patient Name:</Text>
                <Text style={GlobalStyle.label}>Address:</Text>
                <Text style={GlobalStyle.label}>Mobile No:</Text>
            </View>
            <View style={GlobalStyle.middleSide}>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.consultingDate}</Text>
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
    const printHTML = async (patientData: any) => {
        printDescription(patientData, user)
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom: 100 }}>
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>All patients</Text>
                {data.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No content to display.</Text>
                    </View>
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
            <Modal visible={isVisible} animationType="slide"
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

                        <TouchableOpacity onPress={() => navigation.navigate('History', showActions)} style={[GlobalStyle.btn, { borderRadius: 15 }]}>
                            <Icon type="feather" name="eye" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>View</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={onClose} style={GlobalStyle.btn}>
                            <Icon type="entypo" name="cross" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default AllPatients