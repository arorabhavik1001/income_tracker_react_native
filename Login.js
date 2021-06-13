import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const login = () => {
        if(username==="bhavik" && password==="admin"){
            navigation.navigate('Home')
        }
        else{
            setMessage("Wrong credentials")
        }
    }
    return (
      <View>
        <Text style={styles.text}> Enter your username and password </Text>
        <TextInput
        style={styles.input2}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="Username"
        placeholderTextColor="#dbb2ff7e"
      />
      <TextInput
        style={styles.input2}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#dbb2ff7e"
      />
      <Button title="Login" onPress={login} />
      <Text style={styles.text}>UserName = bhavik; Password = admin</Text>
      <Text style={styles.text}>{message}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    input2: {
        borderWidth: 2,
        borderColor: "#6200ee",
        height: 40,
        fontSize: 18,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 5,
        color: "#6200ee",
      },
      text: {
        color: "#6200ee",
        marginBottom: 10,
        marginTop: 10,
      },
  });
  
export default Login;
