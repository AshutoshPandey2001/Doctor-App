import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
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
    const [advice, setAdvice] = useState({
        medicine: '',
        frequency: { M: false, A: false, E: false, N: false },
        days: '',
        total: '',
        advice: '',
    });
    const [prescription, setPrescription] = useState([]);

    const handleCheckboxChange = (name: any) => {
        setAdvice({
            ...advice,
            //   frequency: {
            //     ...advice.frequency,
            //     [name]: !advice.frequency[name],
            //   },
        });
    };

    const pushAdvice = () => {
        // Implement your pushAdvice function logic here
    };

    const cancelAdvice = () => {
        // Implement your cancelAdvice function logic here
    };

    return (
        <SafeAreaView>

            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ display: 'none' }}>
                        {/* Render PrintButton here */}
                    </View>
                    {state.paymentStatus === 'Pending' ? (
                        <>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.textcolor, { textAlign: 'center' }]}>Patient Information</Text>
                                <Text>Name: {state.pName}</Text>
                                <Text>Age/Sex: {state.page}/{state.pGender}</Text>
                                <Text>Address: {state.pAddress}</Text>
                                <Text>Mobile No: {state.pMobileNo}</Text>
                                <Text>Consulting Dr.: {state.drName}</Text>
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={styles.textcolor}>Diagnosis:</Text>
                                <TextInput
                                    placeholder="Enter diagnosis"
                                    value={state.diagnosis}
                                    onChangeText={(text) => setState({ ...state, diagnosis: text })}
                                />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={styles.textcolor}>Follow-up:</Text>
                                <TextInput
                                    placeholder="Enter follow-up Details"
                                    value={state.followup}
                                    onChangeText={(text) => setState({ ...state, followup: text })}
                                />
                            </View>
                            <View style={{ margin: 10 }}>


                                <View style={{ padding: 20 }}>
                                    <View>
                                        <Text style={styles.textcolor}>Medicine:</Text>
                                        <TextInput
                                            placeholder="Enter Medicine"
                                            value={advice.medicine}
                                            onChangeText={(text) => setAdvice({ ...advice, medicine: text })}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.textcolor}>Frequency:</Text>
                                        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                                            <CheckBox
                                                value={advice.frequency.M}
                                                onValueChange={() => handleCheckboxChange('M')}
                                            />
                                            <CheckBox
                                                value={advice.frequency.A}
                                                onValueChange={() => handleCheckboxChange('A')}
                                            />
                                            <CheckBox
                                                value={advice.frequency.E}
                                                onValueChange={() => handleCheckboxChange('E')}
                                            />
                                            <CheckBox
                                                value={advice.frequency.N}
                                                onValueChange={() => handleCheckboxChange('N')}
                                            />
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={styles.textcolor}>Days:</Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            value={advice.days}
                                            onChangeText={(text) => setAdvice({ ...advice, days: text })}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.textcolor}>Total:</Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            value={advice.total}
                                            onChangeText={(text) => setAdvice({ ...advice, total: text })}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.textcolor}>Advice:</Text>
                                        <TextInput
                                            placeholder="Enter Advice"
                                            value={advice.advice}
                                            onChangeText={(text) => setAdvice({ ...advice, advice: text })}
                                        />
                                    </View>

                                    <Button title="Add Advice" onPress={pushAdvice} />

                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.textcolor}>RX(Advice on OPD):</Text>
                                        <ScrollView>
                                            {prescription.map((item: any, i) => (
                                                <View key={i}>
                                                    <Text>Medicine Name: {item.medicine}</Text>
                                                    <Text>
                                                        Frequency: {item.frequency.M} - {item.frequency.A} - {item.frequency.E} - {item.frequency.N}
                                                    </Text>
                                                    <Text>Days: {item.days}</Text>
                                                    <Text>Total: {item.total}</Text>
                                                    <Text>Advice: {item.advice}</Text>
                                                    <Button
                                                        title="Cancel"
                                                        onPress={() => cancelAdvice()}
                                                    />
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>


                                {/* Prescription input fields */}
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={styles.textcolor}>General instructions:</Text>
                                <TextInput
                                    placeholder="Enter general instructions"
                                    value={state.generalInstruction}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => setState({ ...state, generalInstruction: text })}
                                />
                            </View>
                            <Button title="Print" onPress={() => printPrescription(state)} />
                            <Button title="Save" onPress={() => savePrescription()} />
                        </>
                    ) : (
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.textcolor}>Patient Information</Text>
                                <Text>Name: {state.pName}</Text>
                                <Text>Age/Sex: {state.page}/{state.pGender}</Text>
                                <Text>Address: {state.pAddress}</Text>
                                <Text>Mobile No: {state.pMobileNo}</Text>
                                <Text>Consulting Dr.: {state.drName}</Text>
                            </View>
                            <Button title="History" onPress={() => openHistory()} />
                        </View>
                    )}
                    <Modal visible={showModal} transparent={false} animationType="slide">
                        <View style={{ margin: 20 }}>
                            {/* Render Patient History */}
                            <Button title="Close" onPress={() => handleClose()} />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({

    textcolor: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },

});

export default DoctorPriscription;
