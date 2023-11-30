import React, { Fragment, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, ScrollView, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  scrollView:{
    gap:10,alignItems:"center",width:"100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,

  },
  button: {justifyContent:"center",
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 1,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 1, // Adiciona margem
    width: '90%', // Define a largura
    alignItems: 'center', // Alinha os itens ao centro
    shadowColor: '#000', // Adiciona sombra
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    height: 60,
    width: '100%',
    borderRadius: 60,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function HomeScreen() {

  const [users, setUsers] = useState(['pedromartins28', 'camidebem', 'tteodorogustavo', 'dantas15',
    'diegomarqueszs',"GustavoRFS",
    'dudaGrossi', 'gZanda', 'katfr', 'lieko0', 'luanShimosaka',
    'lucaslopesxx', 'notlimneto', 'victorhxo']);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {users.map((user) => (
        <Card
          key={user}
          user={user}
          onPress={() => {
            setSelectedUser(user);
            setModalVisible(true);
          }}
          onLinkPress={() => Linking.openURL(`https://github.com/${user}`)}
        />
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedUser && (
              <Card
                user={selectedUser}
                onPress={() => setModalVisible(false)}
                onLinkPress={() => Linking.openURL(`https://github.com/${selectedUser}`)}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function LoginScreen({ navigation }) {
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
      if (!users.find(user => user.email === email)) {
        setEmailError('Email não cadastrado');
        return;
      } else if (users.find(user => user.email === email && user.password !== password)) {
        setPasswordError('Senha incorreta');
        return;
      } else if (users.find(user => user.email === email && user.password === password)) {
        console.log(`ENTRADA: Email: ${email}, Senha: ${password}`);
        navigation.navigate('Home');
        setEmailError('');
        setPasswordError('');
      }
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
      console.log(`CADASTRO: Email: ${email}, Senha: ${password}`);
      navigation.navigate('Home');
    }
  };

  return (

    <View style={styles.container}>
      <Image
        style={{ width: 60, height: 60, borderRadius: 25, margin: 20, marginBottom: 50 }}
        source={{ uri: 'https://github.com/Comp-Junior.png' }}
      />

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

function Card({ user, onPress, onLinkPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <>
        <Text>{user}</Text>
        <Image
          style={{ width: 300, height: 300, borderRadius: 1, margin: 20 }}
          source={{ uri: `https://github.com/${user}.png` }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onLinkPress}
        >
          <Text style={styles.buttonText}> Ver perfil no GitHub</Text>
        </TouchableOpacity>
      </>
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Comp-Junior')}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 25, margin: 20 }}
                  source={{ uri: 'https://github.com/Comp-Junior.png' }}
                />
              </TouchableOpacity>

            ),
            title: 'GitComp',
            headerStyle: {
              backgroundColor: '#091f42',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '900',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}