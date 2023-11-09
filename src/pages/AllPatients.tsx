import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle } from '../globalStyle';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/action/UiSlice';

interface Patient {
    id: number;
    name: string;
    address: string;
    date: string;
    mobileNumber: string;
}
const AllOatients = ({ navigation }: any) => {
    const dummyData: Patient[] = [

        {
            "id": 1,
            "name": "John Doe",
            "address": "123 Main Street",
            "date": "2023-10-04",
            "mobileNumber": "+1234567890"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "address": "456 Elm Street",
            "date": "2023-10-05",
            "mobileNumber": "+9876543210"
        },
        {
            "id": 3,
            "name": "Peter Jones",
            "address": "789 Oak Street",
            "date": "2023-10-06",
            "mobileNumber": "+5678901234"
        },
        {
            "id": 4,
            "name": "Mary Brown",
            "address": "1011 Maple Street",
            "date": "2023-10-07",
            "mobileNumber": "+1011213141"
        },
        {
            "id": 5,
            "name": "David Williams",
            "address": "1213 Pine Street",
            "date": "2023-10-08",
            "mobileNumber": "+1112131415"
        },
        {
            "id": 6,
            "name": "Sarah Miller",
            "address": "1415 Walnut Street",
            "date": "2023-10-09",
            "mobileNumber": "+1617181920"
        },
        {
            "id": 7,
            "name": "William Davis",
            "address": "1617 Elm Street",
            "date": "2023-10-10",
            "mobileNumber": "+2122232425"
        },
        {
            "id": 8,
            "name": "Elizabeth Taylor",
            "address": "1819 Oak Street",
            "date": "2023-10-11",
            "mobileNumber": "+2627282930"
        },
        {
            "id": 9,
            "name": "Michael Johnson",
            "address": "2021 Maple Street",
            "date": "2023-10-12",
            "mobileNumber": "+3132333435"
        },
        {
            "id": 10,
            "name": "Jennifer Wilson",
            "address": "2223 Pine Street",
            "date": "2023-10-13",
            "mobileNumber": "+3637383940"
        },
        {
            "id": 11,
            "name": "Mark Anderson",
            "address": "2425 Walnut Street",
            "date": "2023-10-14",
            "mobileNumber": "+4142434445"
        },
        {
            "id": 12,
            "name": "Susan Thomas",
            "address": "2627 Elm Street",
            "date": "2023-10-15",
            "mobileNumber": "+4647484950"
        },
        {
            "id": 13,
            "name": "Paul Jackson",
            "address": "2829 Oak Street",
            "date": "2023-10-16",
            "mobileNumber": "+5152535455"
        },
        {
            "id": 14,
            "name": "Linda Cooper",
            "address": "3031 Maple Street",
            "date": "2023-10-17",
            "mobileNumber": "+5657585960"
        },

        {
            "id": 15,
            "name": "John Doe",
            "address": "123 Main Street",
            "date": "2023-10-04",
            "mobileNumber": "+1234567890"
        },
        {
            "id": 16,
            "name": "Jane Smith",
            "address": "456 Elm Street",
            "date": "2023-10-05",
            "mobileNumber": "+9876543210"
        },
        {
            "id": 17,
            "name": "Peter Jones",
            "address": "789 Oak Street",
            "date": "2023-10-06",
            "mobileNumber": "+5678901234"
        },
        {
            "id": 18,
            "name": "Mary Brown",
            "address": "1011 Maple Street",
            "date": "2023-10-07",
            "mobileNumber": "+1011213141"
        },
        {
            "id": 19,
            "name": "David Williams",
            "address": "1213 Pine Street",
            "date": "2023-10-08",
            "mobileNumber": "+1112131415"
        },
        {
            "id": 20,
            "name": "Sarah Miller",
            "address": "1415 Walnut Street",
            "date": "2023-10-09",
            "mobileNumber": "+1617181920"
        },
        {
            "id": 21,
            "name": "William Davis",
            "address": "1617 Elm Street",
            "date": "2023-10-10",
            "mobileNumber": "+2122232425"
        },
        {
            "id": 22,
            "name": "Elizabeth Taylor",
            "address": "1819 Oak Street",
            "date": "2023-10-11",
            "mobileNumber": "+2627282930"
        },
        {
            "id": 23,
            "name": "Michael Johnson",
            "address": "2021 Maple Street",
            "date": "2023-10-12",
            "mobileNumber": "+3132333435"
        },
        {
            "id": 24,
            "name": "Jennifer Wilson",
            "address": "2223 Pine Street",
            "date": "2023-10-13",
            "mobileNumber": "+3637383940"
        },
        {
            "id": 25,
            "name": "Mark Anderson",
            "address": "2425 Walnut Street",
            "date": "2023-10-14",
            "mobileNumber": "+4142434445"
        },
        {
            "id": 26,
            "name": "Susan Thomas",
            "address": "2627 Elm Street",
            "date": "2023-10-15",
            "mobileNumber": "+4647484950"
        },
        {
            "id": 27,
            "name": "Paul Jackson",
            "address": "2829 Oak Street",
            "date": "2023-10-16",
            "mobileNumber": "+5152535455"
        },
        {
            "id": 28,
            "name": "Linda Cooper",
            "address": "3031 Maple Street",
            "date": "2023-10-17",
            "mobileNumber": "+5657585960"
        },


    ]
    const itemsPerPage = 10;
    // const [data, setData] = useState<any>([]);
    const [showActions, setShowActions] = useState<number | null>(null); // Track the selected card's ID
    const [showSmallPopup, setShowSmallPopup] = useState(false);

    // const navigation = useNavigation()
    const [data, setData] = useState(dummyData.slice(0, 10)); // Initial data with first 10 items
    const [page, setPage] = useState(1);
    const [isVisible, setisVisible] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {

    }, []);
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
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
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.date}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.address}</Text>
                <Text style={GlobalStyle.textcolor} numberOfLines={1} ellipsizeMode="tail">{item.mobileNumber}</Text>

            </View>
            <View style={GlobalStyle.rightSide}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable onPress={() => selectCard(item)}>
                        <Icon type="feather" name="more-vertical" color="gray" size={30} />
                    </Pressable>
                    {/* {showActions === item.id && (
                        <View style={GlobalStyle.actionsPopup}>
                            <Pressable onPress={() => navigation.navigate('DoctorPriscription')}>
                                <Icon type="feather" name="edit" color="blue" size={30} />
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('DoctorPriscription')}>
                                <Icon type="feather" name="printer" color="green" size={30} />
                            </Pressable>
                        </View>
                    )} */}
                </View>
            </View>
        </View>
    );
    const loadMoreData = () => {
        dispatch(setLoading(true))
        const start = page * 10;
        const end = start + 10;
        setData([...data, ...dummyData.slice(start, end)]);
        setPage(page + 1);
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 2000);

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom: 100 }}>

            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>All Patients</Text>
                {data.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No content to display.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
            {/* {data.length < dummyData.length && (
                <View style={{ padding: 10 }}>
                    <Button title="Load More" onPress={() => loadMoreData()} />
                </View>
            )} */}
            <Modal visible={isVisible} animationType="slide"
                transparent={true} onRequestClose={onClose} onPointerDown={onClose}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} onTouchEnd={onClose}>
                    <View style={{
                        height: "20%",
                        width: "100%",
                        marginTop: 'auto',
                        backgroundColor: 'white',
                        elevation: 5,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}>

                        <TouchableOpacity onPress={() => navigation.navigate('DoctorPriscription')} style={[GlobalStyle.btn, { borderRadius: 15 }]}>
                            <Icon type="feather" name="edit" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('DoctorPriscription')} style={GlobalStyle.btn}>
                            <Icon type="feather" name="printer" color="gray" size={25} />
                            <Text style={{ color: 'gray', marginLeft: 10, fontWeight: 'bold', fontSize: 18 }}>Print</Text>
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

export default AllOatients