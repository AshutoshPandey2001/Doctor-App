import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle } from '../globalStyle';

const Home = () => {
    const [patients, setpatients] = useState(0)
    const [day, setday] = useState<any>()
    const [isVisible, setisVisible] = useState(false);
    const onClose = () => {
        setisVisible(false)
    }

    useEffect(() => {
        onChangeDays('today')
    }, [])

    const onChangeDays = (item: string) => {
        switch (item) {

            case 'today':
                setpatients(10)
                setday('Today')
                setisVisible(false)
                break;
            case '7days':
                setpatients(70)
                setday('Last 7 days')
                setisVisible(false)
                break;
            case '30days':
                setpatients(900)
                setday('Last 30 days')
                setisVisible(false)
                break;
            default:
                setpatients(10)
                setday('Today')
                setisVisible(false)
                break;
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Patients</Text>
                <Pressable onPress={() => setisVisible(true)}>
                    <Icon type="feather" name="filter" color="#2a7fba" size={35} />
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.subHeaderText}>{day} Patients</Text>
                <View style={[styles.box, { backgroundColor: "#e8e1ff" }]}>
                    <View style={styles.boxBody}>
                        <View style={styles.flexContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={require("../assets/opd_icon.png")} style={styles.image} resizeMode="contain" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.heading}>{patients}</Text>
                                <Text style={styles.text}>Patients</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isVisible} animationType="slide"
                transparent={true} onRequestClose={onClose} onPointerDown={onClose}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} onTouchEnd={onClose}>
                    <View style={{
                        height: "25%",
                        width: "100%",
                        marginTop: 'auto',
                        backgroundColor: 'white',
                        elevation: 5,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}>

                        <TouchableOpacity onPress={() => onChangeDays('today')} style={GlobalStyle.btn}>
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChangeDays('7days')} style={GlobalStyle.btn}>
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Last 7 Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChangeDays('30days')} style={GlobalStyle.btn}>
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Last 30 Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={GlobalStyle.btn}>
                            <Icon type="entypo" name="cross" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
        marginBottom: 10,
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    box: {
        width: '90%',
        borderRadius: 10,
        padding: 10,
        height: 150,
    },
    boxBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    heading: {
        fontWeight: '600',
        fontSize: 30,
        color: '#7047ee',
        textAlign: 'right',
    },
    text: {
        fontSize: 20,
        marginTop: 3,
        color: 'gray',
        textAlign: 'right',
    },
});

export default Home;
