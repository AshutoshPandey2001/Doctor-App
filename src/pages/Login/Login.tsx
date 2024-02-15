import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setUser} from '../../redux/action/UserSlice';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/action/UiSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      let userData = {
        usertype: '',
        userName: '',
        hospitaluid: '',
        druid: undefined,
        hospitalName: undefined,
        hospitalAddress: undefined,
        hospitalLogo: undefined,
        hospitalContact: undefined,
        doctorName: undefined,
        permissions: [],
        consultingCharges: [],
      };

      const userDoc = await firestore()
        .collection('UserList')
        .doc(user.uid)
        .get();
      if (userDoc.exists) {
        const userDocData: any = userDoc.data();
        userData = {
          ...userData,
          usertype: userDocData.userType || '',
          userName: userDocData.userName || '',
          hospitaluid: userDocData.hospitaluid || '',
          druid: userDocData.druid || undefined,
          permissions: userDocData.permissions || [],
        };
        // Check if userType is not doctor
        if (userData.usertype !== 'Doctor') {
          dispatch(setLoading(false));
          Alert.alert('Login Error', 'You have no access to login');
          return;
        }
        const doctorDatasnapshot = await firestore()
          .collection('Doctors')
          .doc('d3ryEUfqA2FMa0fEyxde')
          .get();

        if (doctorDatasnapshot.exists) {
          const data: any = await doctorDatasnapshot.data();
          console.log(data, 'data');

          const doctarData = data['doctors']?.find(
            (item: any) => item.druid === userDocData.druid,
          );
          console.log('doctarData', doctarData);

          userData = {
            ...userData,
            doctorName: doctarData.drName || '',
            consultingCharges: doctarData.consultingCharges || [],
          };
        }
        const hospitalQuerySnapshot = await firestore()
          .collection('HospitalMaster')
          .doc('S4fRJIO5ZxE5isoBIbEU')
          .collection('hospitalMaster')
          .where('hospitaluid', '==', userData.hospitaluid)
          .get();

        if (!hospitalQuerySnapshot.empty) {
          const hospitalData = hospitalQuerySnapshot.docs[0].data();
          userData = {
            ...userData,
            hospitalName: hospitalData.hospitslName || undefined,
            hospitalAddress: hospitalData.hospitalAddress || undefined,
            hospitalLogo: hospitalData.hospitslLogo || undefined,
            hospitalContact: hospitalData.contactNumber || undefined,
          };
        }
      }
      dispatch(setUser(userData));
      console.log('User data:', userData);
    } catch (error: any) {
      dispatch(setLoading(false));
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image
          resizeMode="contain"
          source={require('../../assets/hospitalerp.png')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'gray'}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'gray'}
        />
        <Pressable style={styles.btn} onPress={() => handleLogin()}>
          <Text style={styles.btntext}>Login</Text>
        </Pressable>
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
    width: 200, // Adjust this width as needed
    height: 150, // Adjust this height as needed
    marginBottom: 20,
  },
  btn: {
    width: '85%',
    backgroundColor: '#580878',
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
    color: '#000',
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
