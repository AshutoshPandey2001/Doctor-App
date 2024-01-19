import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const CustomSearchAutocomplete = ({ data, searchKey, onSelect, placeHolder }: any) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleInputChange = (text: any) => {
        setQuery(text);

        // Check if the length of the input text is zero
        if (text.length === 0) {
            // If text length is zero, set filteredData to an empty array
            setFilteredData([]);
        } else {
            // If text length is not zero, filter the data based on the input query and the specified search key
            const filtered = data.filter((item: any) =>
                item[searchKey].toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };


    const handleItemSelect = (item: any) => {
        setQuery(item[searchKey]);
        onSelect(item);
        setFilteredData([]);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 50 }}>
                <TextInput
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 5,
                        color: '#000',
                        zIndex: 1, // Ensures TextInput is above other components
                    }}
                    placeholder={placeHolder}
                    value={query}
                    placeholderTextColor={'gray'}
                    onChangeText={handleInputChange}
                />
            </View>

            {filteredData.length > 0 && (
                <View style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 2 }}>
                    <ScrollView>
                        {filteredData.map((item: any) =>
                            <>
                                <TouchableOpacity onPress={() => handleItemSelect(item)} key={item.pid}>
                                    <Text style={{ padding: 10, borderWidth: 0.5, borderColor: 'gray', color: '#000' }}>
                                        {item.pName} - {item.pMobileNo}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                </View>
            )}

            {/* Other components go here */}
        </View>

    );
};

export default CustomSearchAutocomplete;
