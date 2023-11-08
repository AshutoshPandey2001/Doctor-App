import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-easy-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Patient {
    id: number;
    name: string;
    age: number;
    email: string;
    city: string;
}
const TodayPatients = ({ navigation }: any) => {
    const dummyData: Patient[] = [
        {
            "id": 1,
            "name": "John Doe",
            "age": 28,
            "email": "john.doe@example.com",
            "city": "New York"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "age": 24,
            "email": "jane.smith@example.com",
            "city": "Los Angeles"
        },
        {
            "id": 3,
            "name": "Mike Johnson",
            "age": 35,
            "email": "mike.johnson@example.com",
            "city": "Chicago"
        },
        {
            "id": 4,
            "name": "Emily Wilson",
            "age": 30,
            "email": "emily.wilson@example.com",
            "city": "Houston"
        },
        {
            "id": 5,
            "name": "David Brown",
            "age": 42,
            "email": "david.brown@example.com",
            "city": "San Francisco"
        },
        {
            "id": 6,
            "name": "Sarah Davis",
            "age": 27,
            "email": "sarah.davis@example.com",
            "city": "Miami"
        },
        {
            "id": 7,
            "name": "Michael Lee",
            "age": 29,
            "email": "michael.lee@example.com",
            "city": "Seattle"
        },
        {
            "id": 8,
            "name": "Laura White",
            "age": 33,
            "email": "laura.white@example.com",
            "city": "Boston"
        },
        {
            "id": 9,
            "name": "Chris Robinson",
            "age": 40,
            "email": "chris.robinson@example.com",
            "city": "Dallas"
        },
        {
            "id": 10,
            "name": "Amanda Hall",
            "age": 26,
            "email": "amanda.hall@example.com",
            "city": "Atlanta"
        },
        {
            "id": 11,
            "name": "Robert Garcia",
            "age": 31,
            "email": "robert.garcia@example.com",
            "city": "Phoenix"
        },
        {
            "id": 12,
            "name": "Jessica Martinez",
            "age": 22,
            "email": "jessica.martinez@example.com",
            "city": "Denver"
        },
        {
            "id": 13,
            "name": "Daniel Smith",
            "age": 37,
            "email": "daniel.smith@example.com",
            "city": "Philadelphia"
        },
        {
            "id": 14,
            "name": "Mary Taylor",
            "age": 25,
            "email": "mary.taylor@example.com",
            "city": "Detroit"
        },
        {
            "id": 15,
            "name": "James Wilson",
            "age": 34,
            "email": "james.wilson@example.com",
            "city": "San Diego"
        },
        {
            "id": 16,
            "name": "Olivia Johnson",
            "age": 29,
            "email": "olivia.johnson@example.com",
            "city": "Minneapolis"
        },
        {
            "id": 17,
            "name": "William Anderson",
            "age": 38,
            "email": "william.anderson@example.com",
            "city": "Portland"
        },
        {
            "id": 18,
            "name": "Sophia Moore",
            "age": 23,
            "email": "sophia.moore@example.com",
            "city": "San Antonio"
        },
        {
            "id": 19,
            "name": "Andrew Harris",
            "age": 36,
            "email": "andrew.harris@example.com",
            "city": "Charlotte"
        },
        {
            "id": 20,
            "name": "Ella Davis",
            "age": 32,
            "email": "ella.davis@example.com",
            "city": "Las Vegas"
        },
        {
            "id": 21,
            "name": "Joseph Wilson",
            "age": 27,
            "email": "joseph.wilson@example.com",
            "city": "Raleigh"
        },
        {
            "id": 22,
            "name": "Lily Johnson",
            "age": 35,
            "email": "lily.johnson@example.com",
            "city": "Nashville"
        },
        {
            "id": 23,
            "name": "Christopher Brown",
            "age": 33,
            "email": "christopher.brown@example.com",
            "city": "New Orleans"
        },
        {
            "id": 24,
            "name": "Grace Lee",
            "age": 26,
            "email": "grace.lee@example.com",
            "city": "Orlando"
        },
        {
            "id": 25,
            "name": "Samuel Clark",
            "age": 30,
            "email": "samuel.clark@example.com",
            "city": "Tampa"
        },
        {
            "id": 26,
            "name": "Natalie Lewis",
            "age": 29,
            "email": "natalie.lewis@example.com",
            "city": "St. Louis"
        },
        {
            "id": 27,
            "name": "Benjamin Hall",
            "age": 34,
            "email": "benjamin.hall@example.com",
            "city": "Cleveland"
        },
        {
            "id": 28,
            "name": "Samantha Wilson",
            "age": 28,
            "email": "samantha.wilson@example.com",
            "city": "Kansas City"
        },
        {
            "id": 29,
            "name": "David Mitchell",
            "age": 31,
            "email": "david.mitchell@example.com",
            "city": "Salt Lake City"
        },
        {
            "id": 30,
            "name": "Emma Davis",
            "age": 25,
            "email": "emma.davis@example.com",
            "city": "Oklahoma City"
        }
    ]
    const itemsPerPage = 10;
    // const [data, setData] = useState<any>([]);
    const [showActions, setShowActions] = useState<number | null>(null); // Track the selected card's ID
    const [showSmallPopup, setShowSmallPopup] = useState(false);

    // const navigation = useNavigation()
    const [data, setData] = useState(dummyData.slice(0, 10)); // Initial data with first 10 items
    const [page, setPage] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    // useEffect(() => {
    //     // Calculate the range of data to display for the current page
    //     const startIndex = (page - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     // Extract the data for the current page
    //     const pageData = dummyData.slice(startIndex, endIndex);
    //     setData(pageData);
    // }, [page]);
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const selectCard = (id: number) => {
        if (showActions === id) {
            // If actions are already shown for the clicked card, hide them
            setShowActions(null);
        } else {
            // Otherwise, show actions for the clicked card
            setShowActions(id);
        }
    };
    const renderItem = ({ item }: { item: Patient }) => (
        <View style={styles.card}>
            <View style={styles.leftSide}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.label}>Patient Name:</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.label}>Mobile No:</Text>
            </View>
            <View style={styles.middleSide}>
                <Text style={styles.textcolor}>{item.name}</Text>
                <Text style={styles.textcolor}>{item.age}</Text>
                <Text style={styles.textcolor}>{item.email}</Text>
                <Text style={styles.textcolor}>{item.city}</Text>

            </View>
            <View style={styles.rightSide}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable onPress={() => selectCard(item.id)}>
                        <Icon type="feather" name="more-vertical" color="gray" size={30} />
                    </Pressable>
                    {showActions === item.id && (
                        <View style={styles.actionsPopup}>
                            <Pressable onPress={() => navigation.navigate('DoctorPriscription')}>
                                <Icon type="feather" name="edit" color="blue" size={30} />
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('DoctorPriscription')}>
                                <Icon type="feather" name="printer" color="green" size={30} />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
    const loadMoreData = () => {
        setisLoading(true)

        const start = page * 10;
        const end = start + 10;
        setData([...data, ...dummyData.slice(start, end)]);
        setPage(page + 1);
        setTimeout(() => {

            setisLoading(false)
        }, 2000);

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom: 100 }}>
            {isLoading &&
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>Today patients</Text>
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
            {data.length < dummyData.length && (
                <View style={{ padding: 10 }}>
                    <Button title="Load More" onPress={() => loadMoreData()} />
                </View>
            )}
        </SafeAreaView>


    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 999,
        height: '100%',
        width: '100%',
        margin: 'auto',
        backgroundColor: "rgba(255,255,255,0.7)",
        elevation: Platform.OS === "android" ? 50 : 0,
        shadowColor: "rgba(255,255,255,0.7)"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white', // Background color of the card
        borderRadius: 10, // Increase the border radius for a smoother look
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 5, // Spread of the shadow
        elevation: 5, // Elevation for Android (keep this line for Android)

    },

    leftSide: {
        flex: 3,
        marginRight: 10,
        borderRightWidth: 1,
        borderColor: 'black',
        paddingRight: 10,
    },
    middleSide: {
        flex: 6,
    },
    textcolor: {
        color: 'gray'
    },
    rightSide: {
        flex: 1,
    },
    label: {
        color: '#000',
        fontWeight: 'bold',
    },
    actionsPopup: {
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        overflow: 'visible',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 5, // Spread of the shadow
    },
});
export default TodayPatients