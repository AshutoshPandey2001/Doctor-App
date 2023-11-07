import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-easy-icon';
interface Patient {
    id: number;
    name: string;
    age: number;
    email: string;
    city: string;
}
const TodayPatients = () => {
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
    const [data, setData] = useState<any>([]);

    // const [data, setData] = useState(dummyData.slice(0, 10)); // Initial data with first 10 items
    const [page, setPage] = useState(1);
    useEffect(() => {
        // Calculate the range of data to display for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        // Extract the data for the current page
        const pageData = dummyData.slice(startIndex, endIndex);
        setData(pageData);
    }, [page]);
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const renderItem = ({ item }: { item: Patient }) => (
        <View style={styles.card}>
            <View style={styles.leftSide}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.label}>Patient Name:</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.label}>Mobile No:</Text>
                <Text style={styles.label}>Action:</Text>
            </View>
            <View style={styles.rightSide}>
                <Text>{item.name}</Text>
                <Text>{item.age}</Text>
                <Text>{item.email}</Text>
                <Text>{item.city}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon type="feather" name="edit" color="blue" size={30} />
                    <Icon type="feather" name="printer" color="green" size={30} />
                </View>
            </View>
        </View>
    );
    const loadMoreData = () => {
        const start = page * 10;
        const end = start + 10;
        setData([...data, ...dummyData.slice(start, end)]);
        setPage(page + 1);
    };
    return (
        <View style={{ marginBottom: 200, marginTop: 20 }}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 20 }}>Today patients</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.pagination}>
                <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
                <Text style={{ margin: 8 }}>{`Page ${page}`}</Text>
                <Button title="Next" onPress={handleNextPage} disabled={data.length < itemsPerPage} />
            </View>

        </View>)
}
const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000', // Border around the entire card
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    leftSide: {
        flex: 3,
        marginRight: 10,
        borderRightWidth: 1, // Add a right border to the left side
        borderColor: 'black', // Border color for the left side
        paddingRight: 10, // Optional padding to separate the text from the border
    },
    rightSide: {
        flex: 7,
    },
    label: {
        color: '#000',
        fontWeight: 'bold',
    },
});
export default TodayPatients