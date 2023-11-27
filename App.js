import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    flexDirection: 'column'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    let isValid = true;

    if (email === '') {
      setEmailError('O email é obrigatório');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('O email não é válido');
      isValid = false;
    }
    else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('A senha é obrigatória');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 dígitos')
      isValid = false;
    }
    else {
      setPasswordError('');
    }

    if (isValid) {
      console.log(`Email: ${email}, Senha: ${password}`);
    }
  };

  const handleRegister = () => {
    let isValid = true;

    if (email === '') {
      setEmailError('O email é obrigatório');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('O email não é válido');
      isValid = false;
    } else if (users.find(user => user.email === email)) {
      setEmailError('O email já está cadastrado');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('A senha é obrigatória');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 dígitos');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      setUsers([...users, { email, password }]);
      console.log(`Email: ${email}, Senha: ${password}`);
    }
  };

  return (
    <View style={styles.container}>
      {emailError ? <Text style={{ color: 'red', textAlign: 'justify' }}>* {emailError}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      {passwordError ? <Text style={{ color: 'red', textAlign: 'justify' }}>* {passwordError}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Senha"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}