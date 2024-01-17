import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle } from '../globalStyle';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { setLoading } from '../redux/action/UiSlice';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



const adUnitId: any = 'ca-app-pub-8691082301379909/8658058910';
const Home = () => {
    const [patients, setpatients] = useState(0)
    const [day, setday] = useState<any>()
    const [isVisible, setisVisible] = useState(false);
    const user: any = useSelector((state: RootState) => state.user)
    const focus = useIsFocused();
    const dispatch = useDispatch()
    const parentDocRefpatients = firestore().collection('opdPatients').doc('m5JHl3l4zhaBCa8Vihcb');
    const subcollectionRefpatients = parentDocRefpatients.collection('opdPatient');
    const onClose = () => {
        setisVisible(false)
    }

    useEffect(() => {
        if (focus && user) {
            onChangeDays('today')
        }
    }, [focus])

    const retrieveData = async (query: any) => {
        try {
            const querySnapshot = await query.get();
            console.log('querySnapshot.size', querySnapshot.size);

            return querySnapshot.size
        } catch (error) {
            console.error('Error retrieving data:', error);
            return 0
        }
    };
    const onChangeDays = async (item: string) => {
        dispatch(setLoading(true))

        let query;
        let patientsData;
        let dayText;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        switch (item) {
            case 'today':
                query = subcollectionRefpatients.where('hospitaluid', '==', user.user?.hospitaluid).where('deleted', '==', 0).where('druid', '==', user.user?.druid).where('consultingDate', '==', moment().format('YYYY-MM-DD[Z]'));
                patientsData = await retrieveData(query);
                dayText = 'Today';
                break;
            case '7days':
                const lastSevenDays = new Date();
                lastSevenDays.setDate(lastSevenDays.getDate() - 6);
                query = subcollectionRefpatients.where('hospitaluid', '==', user.user?.hospitaluid).where('deleted', '==', 0).where('druid', '==', user.user?.druid)
                    .where('consultingDate', '<=', moment(formattedDate).format('YYYY-MM-DD[Z]'))
                    .where('consultingDate', '>=', moment(lastSevenDays).format('YYYY-MM-DD[Z]'));
                patientsData = await retrieveData(query);
                dayText = 'Last 7 days';
                break;
            case '30days':
                const lastThirtyDays = new Date();
                lastThirtyDays.setDate(lastThirtyDays.getDate() - 29);
                query = subcollectionRefpatients.where('hospitaluid', '==', user.user?.hospitaluid).where('deleted', '==', 0).where('druid', '==', user.user?.druid)
                    .where('consultingDate', '<=', moment(formattedDate).format('YYYY-MM-DD[Z]'))
                    .where('consultingDate', '>=', moment(lastThirtyDays).format('YYYY-MM-DD[Z]'));
                patientsData = await retrieveData(query);
                dayText = 'Last 30 days';
                break;
            default:
                query = subcollectionRefpatients.where('hospitaluid', '==', user.user?.hospitaluid).where('deleted', '==', 0).where('druid', '==', user.user?.druid).where('consultingDate', '==', moment(formattedDate).format('YYYY-MM-DD[Z]'));
                patientsData = await retrieveData(query);
                dayText = 'Today';
                break;
        }

        setpatients(patientsData);
        setday(dayText);
        dispatch(setLoading(false))

        setisVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { marginBottom: 100 }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Patients</Text>
                <Pressable onPress={() => setisVisible(true)}>
                    <Icon type="feather" name="filter" color="#2a7fba" size={35} />
                </Pressable>
            </View>

            {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 30 }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
            </View>
            <View style={styles.scrollContainer}>
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
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 30 }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
            </View>
            {/* </ScrollView> */}

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
