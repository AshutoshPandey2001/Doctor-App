import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { GlobalStyle } from '../globalStyle';
import Icon from 'react-native-easy-icon';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';

// import { Barcode } from 'react-native-barcode-builder';
// import { Table, Row } from 'react-native-table-component';

interface State {
    paymentStatus: string;
    diagnosis: string;
    followup: string;
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
}

const DummyData: State = {
    pid: '123456',
    pName: 'John Doe',
    page: 30,
    pGender: 'Male',
    pAddress: '123 Main St',
    pMobileNo: '123-456-7890',
    consultingDate: '2023-11-08',
    drName: 'Dr. Smith',
    opdCaseNo: 'OPD123',
    opduid: 'UID456',
    paymentStatus: 'Pending',
    diagnosis: '',
    followup: '',
    generalInstruction: '',
    advice: {
        medicine: '',
        frequency: {
            M: false,
            A: false,
            E: false,
            N: false,
        },
        days: 0,
        total: 0,
        advice: '',
    },
    prescription: [],
    patientsHistory: [
        {
            diagnosis: 'Common cold',
            followup: '2023-11-15',
            prescription: [
                {
                    medicine: 'Medicine A',
                    frequency: { M: true, A: false, E: true, N: false },
                    days: 7,
                    total: 28,
                    advice: 'Take with meals',
                },
            ],
        },
        {
            diagnosis: 'Fever',
            followup: '2023-11-22',
            prescription: [
                {
                    medicine: 'Medicine B',
                    frequency: { M: true, A: true, E: false, N: true },
                    days: 5,
                    total: 15,
                    advice: 'Drink plenty of water',
                },
            ],
        },
    ],
};

const DoctorPriscription = () => {
    const [state, setState] = useState<State>({ ...DummyData });
    const [showModal, setShowModal] = useState(false);
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
                // Add more prescription items as needed
            ],
        },
    ];

    // Now you can use these two dummy data entries in your component

    const openHistory = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const printPrescription = (data: State) => {
        // Implement your print functionality
    };

    const savePrescription = () => {
        // Implement your save functionality
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
    console.log(prescription, 'prescription');

    const cancelAdvice = (item: any) => {
        setPrescription(prescription.filter((medicine: any) => medicine.id !== item.id))

        // Implement your cancelAdvice function logic here
    };
    const renderItem = ({ item }: { item: any }) => (
        <View style={GlobalStyle.card}>
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
            <View style={[GlobalStyle.rightSide, { alignItems: 'center', justifyContent: 'center' }]}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable onPress={() => cancelAdvice(item)}>
                        <Icon type="entypo" name="cross" color="gray" size={25} />
                    </Pressable>
                </View>
            </View>
        </View>
    );

    const [activeSections, setActiveSections] = useState([]);

    const renderSectionTitle = (section: any) => (
        <View>
            <Text>{section.consultingDate}</Text>
        </View>
    );

    const renderHeader = (section: any) => (
        <View>
            <Text>{section.consultingDate}</Text>
        </View>
    );

    const renderContent = (section: any) => (
        <View>
            <Text>Diagnosis:-{section.diagnosis}</Text>
            <Text>Followup{section.followup}</Text>
            <Text style={styles.subHeading}>RX(Advice on OPD):</Text>
            <GestureHandlerRootView>
                <FlatList
                    data={section.prescription}
                    renderItem={renderItem}
                    keyExtractor={(item: any, i: number) => item.id}
                    onEndReachedThreshold={0.1}
                />
            </GestureHandlerRootView>
        </View>
    );

    const updateSections = (updatedSections: any) => {
        setActiveSections(updatedSections);
    };

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: 100 }}>
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ display: 'none' }}>
                        {/* Render PrintButton here */}
                    </View>
                    {state.paymentStatus === 'Pending' ? (
                        <>
                            <View >
                                {/* <Pressable onPress={() => openHistory()}><Text>Open History</Text></Pressable> */}
                                <Text style={styles.heading}>Patient Information</Text>
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
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter follow-up Details"
                                        value={state.followup}
                                        onChangeText={(text) => setState({ ...state, followup: text })}
                                        placeholderTextColor={'gray'}
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
                                    <GestureHandlerRootView>
                                        <FlatList
                                            data={prescription}
                                            renderItem={renderItem}
                                            keyExtractor={(item: any, i: number) => item.id}
                                            onEndReachedThreshold={0.1}
                                        />
                                    </GestureHandlerRootView>


                                    {/* <ScrollView>
                                        {prescription.map((item: any, i) => (
                                            <View key={i} style={styles.prescriptionItem}>
                                                <Text>Medicine Name: {item.medicine}</Text>
                                                <Text>
                                                    Frequency: {item.frequency.M} - {item.frequency.A} - {item.frequency.E} - {item.frequency.N}
                                                </Text>
                                                <Text>Days: {item.days}</Text>
                                                <Text>Total: {item.total}</Text>
                                                <Text>Advice: {item.advice}</Text>
                                                <Button title="Cancel" onPress={() => cancelAdvice(i)} />
                                            </View>
                                        ))}
                                    </ScrollView> */}
                                </View>
                                <View style={styles.section}>
                                    <Text style={styles.subHeading}>General instructions:</Text>
                                    <TextInput
                                        style={[styles.input, { height: 100 }]}
                                        placeholder="Enter general instructions"
                                        value={state.generalInstruction}
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={(text) => setState({ ...state, generalInstruction: text })}
                                        placeholderTextColor={'gray'}
                                    />
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button title="Print" onPress={() => printPrescription} />
                                    <Button title="Save" onPress={() => savePrescription} />
                                </View>


                            </View>
                        </>
                    ) : (
                        <View><Text>hello</Text></View>
                        // <View>
                        //     <View style={{ alignItems: 'center' }}>
                        //         <Text style={styles.textcolor}>Patient Information</Text>
                        //         <Text>Name: {state.pName}</Text>
                        //         <Text>Age/Sex: {state.page}/{state.pGender}</Text>
                        //         <Text>Address: {state.pAddress}</Text>
                        //         <Text>Mobile No: {state.pMobileNo}</Text>
                        //         <Text>Consulting Dr.: {state.drName}</Text>
                        //     </View>
                        //     <Button title="History" onPress={() => openHistory()} />
                        // </View>
                    )}
                    <Modal visible={showModal} transparent={false} animationType="slide">
                        <View style={{ margin: 20 }}>
                            <Accordion
                                sections={historydummyDataArray}
                                activeSections={activeSections}
                                renderSectionTitle={renderSectionTitle}
                                renderHeader={renderHeader}
                                renderContent={renderContent}
                                onChange={updateSections}
                            />
                            {/* Render Patient History */}
                            <Button title="Close" onPress={() => handleClose()} />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
// const styles = StyleSheet.create({

//     textcolor: {
//         color: '#000',
//         fontSize: 18,
//         fontWeight: 'bold'
//     },

// });

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
