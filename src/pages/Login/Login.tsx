import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centeredContent}>
                <Image
                    resizeMode='contain'
                    source={require('../../assets/hospitalerp.png')}
                    style={styles.logo}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable style={styles.btn} onPress={() => handleLogin()}>
                    <Text style={styles.btntext}>Login</Text>
                </Pressable>
                {/* <Button
                    style={styles.input}
                    title="Login"
                    onPress={handleLogin}
                /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredContent: {
        width: '100%', // Adjust this value as needed
        alignItems: 'center',
    },
    logo: {
        width: 200,  // Adjust this width as needed
        height: 150, // Adjust this height as needed
        marginBottom: 20,
    },
    btn: {
        width: '85%',
        backgroundColor: "#580878",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 30,
        borderRadius: 15,
        elevation: 3,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    btntext: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default LoginPage;
