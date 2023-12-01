//importações de módulos necessários para o funcionamento do código
import React, { Fragment, useState } from 'react'; /*importa do modulo react a função useState e Fragment para criar vários componentes sem um nó adicional no DOM */
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, ScrollView, Modal } from 'react-native'; //importa do modulo react-native os componentes necessários
import { NavigationContainer } from '@react-navigation/native'; //importa do modulo react-navigation o componente NavigationContainer que faz navegação entre as telas
import { createStackNavigator } from '@react-navigation/stack';//importa do modulo react-navigation o componente createStackNavigator que cria uma pilha de telas sendo a primeira a ser exibida a tela de loguin

//definição de estilos usados em diversas partes do código
const styles = StyleSheet.create({
  //estilo do scrollview que é o componente que permite a rolagem da tela com distância de 10 entre os itens e alinhamento centralizado
  //ocupando 100% da largura da tela, ou seja, centralizado
  scrollView: {
    gap: 10, alignItems: "center", width: "100%"
  },

  //estilo do container que é o componente que envolve todos os outros componentes da tela
  container: {
    flex: 1, //define que o container ocupa toda a tela
    backgroundColor: '#fff',// define a cor de fundo do container
    padding: 30, //define a distância entre o conteúdo e a borda do container
    flexDirection: 'column',//define que os componentes filhos do container serão organizados em coluna
    alignItems: 'center', //define que os componentes filhos do container serão alinhados ao centro
    justifyContent: 'center', //define que os componentes filhos do container serão alinhados ao centro
  },

  //estilo do texto que é o componente que exibe o texto na tela
  input: {
    height: 40,//define a altura do componente
    width: '100%',//define a largura do componente
    borderColor: '#888',//define a cor da borda do componente
    borderWidth: 1,//define a largura da borda do componente
    marginBottom: 25,//define a distância entre o componente e o componente abaixo dele
    padding: 10,//define a distância entre o conteúdo e a borda do componente
    borderRadius: 10,//arredonda as bordas do componente
  },

  //estilo do botão que é o componente que exibe o botão na tela
  //cada propriadade do botão foi explicada acima
  button: {
    justifyContent: "center",
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 1,
    marginBottom: 10,
  },

  //estilo do texto do botão que é o componente que exibe o texto do botão na tela
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: '#fff',
  },

  //estilo do modal que é o componente que exibe o modal na tela
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Escurece o fundo ao abrir o card
  },

  //estilo do modal que é o componente que exibe o modal na tela
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

  //estilo do card que é o componente que exibe o card na tela
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

  //estilo do header que é o componente que exibe o header na tela
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

  //estilo do headerText que é o componente que exibe o texto do header na tela
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  //estilo do userText que é o componente que exibe o texto do usuário na tela
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

//função que exibe a tela inicial do app (HOME)
function HomeScreen() {

  const [users, setUsers] = useState(['pedromartins28', 'beatrizoliveira9', 'JaoVCarvalho' , 
    'camidebem', "joze08", 'isadoramel0', 'dantas15',
    'diegomarqueszs', "GustavoRFS", 'LiHypnos',
    'dudaGrossi', 'gZanda', 'katfr', 'lieko0', 'luanShimosaka',
    'lucaslopesxx', 'notlimneto', 'victorhxo', 'GregoSX', 'mariaseverino', 'marigfs', 'MatheusPiassiC', 
    'PatrickLeite1301', 'tteodorogustavo', "teagoodilon", 'alexcyrillo', ]); //lista de usuários do github
  const [selectedUser, setSelectedUser] = useState(null); //define o usuário selecionado
  const [modalVisible, setModalVisible] = useState(false); //define se o modal está visível ou não

  //Retorna o componente ScrollView que é o componente que permite a rolagem da tela
  return (
    <ScrollView contentContainerStyle={styles.scrollView}> 
      {users.map((user) => ( //Esta mapeando para que cada usuário da lista de usuários, exibe um card
        <Card //define o componente card
          key={user} //define a chave do card
          user={user} //define o usuário do card
          //define as funções que serão executadas ao clicar no card ou no link
          onPress={() => {
            setSelectedUser(user);
            setModalVisible(true);
          }}
          onLinkPress={() => Linking.openURL(`https://github.com/${user}`)} //abre o link do github do usuário
        />
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} //define se o modal está visível ou não
        onRequestClose={() => { //define a função que será executada ao fechar o modal
          setModalVisible(!modalVisible); //define que o modal não está visível
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedUser && ( //define que se o usuário estiver selecionado, exibe o card
              <Card
                user={selectedUser} //define o usuário do card
                onPress={() => setModalVisible(false)} //define a função que será executada ao clicar no card
                onLinkPress={() => Linking.openURL(`https://github.com/${selectedUser}`)}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

//função que exibe a tela de loguin do app
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); //define o estado do email
  const [password, setPassword] = useState(''); //define o estado da senha
  const [emailError, setEmailError] = useState(''); //define o estado do erro do email
  const [passwordError, setPasswordError] = useState(''); //define o estado do erro da senha
  const [users, setUsers] = useState([]); //define o estado da lista de usuários

  const handleLogin = () => { //define a função que será executada ao clicar no botão de loguin

    let isValid = true; //define que a validação é verdadeira

    //define as condições de validação do email e da senha
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
  
    //define as condições de validação do email e da senha
    if (isValid) {
      if (!users.find(user => user.email === email)) {
        setEmailError('Email não cadastrado'); //define que o erro do email é 'Email não cadastrado'
        return;
      } else if (users.find(user => user.email === email && user.password !== password)) {
        setPasswordError('Senha incorreta');
        return;
      } else if (users.find(user => user.email === email && user.password === password)) {
        console.log(`ENTRADA: Email: ${email}, Senha: ${password}`);
        navigation.navigate('Home');
        setEmailError(''); //define que o erro do email é vazio
        setPasswordError(''); //define que o erro da senha é vazio
      }
    }
  };

  //define a função que será executada ao clicar no botão de cadastro
  const handleRegister = () => {
    let isValid = true;

    if (email === '') {
      setEmailError('O email é obrigatório');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { //validação de email
      setEmailError('O email não é válido');
      isValid = false;
    } else if (users.find(user => user.email === email)) { //validação de email
      setEmailError('O email já está cadastrado');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('A senha é obrigatória');
      isValid = false;
    } else if (password.length < 8) { //validação de senha
      setPasswordError('A senha deve ter pelo menos 8 dígitos');
      isValid = false;
    } else {
      setPasswordError('');
    }

    //define as condições de validação do email e da senha
    if (isValid) {
      setUsers([...users, { email, password }]);
      console.log(`CADASTRO: Email: ${email}, Senha: ${password}`);
      navigation.navigate('Home'); //navega para a tela Home
    }
  };

  //retorna o componente View que é o componente que envolve todos os outros componentes da tela
  return (

    <View style={styles.container}> 
      <Image //define o componente que exibe a imagem na tela
        style={{ width: 60, height: 60, borderRadius: 25, margin: 20, marginBottom: 50 }} //define o estilo da imagem
        source={{ uri: 'https://github.com/Comp-Junior.png' }} //exibe a imagem da CompJunior
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

//função que exibe o card na tela
function Card({ user, onPress, onLinkPress }) { //define os parâmetros do card
  return ( //retorna o componente TouchableOpacity que é o componente que permite a interação com o usuário
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <>
      <Text style={styles.userText}>@{user}</Text>
        <Image
          style={{ width: 300, height: 300, borderRadius: 1, margin: 20 }} //define o estilo da imagem
          source={{ uri: `https://github.com/${user}.png` }} //exibe a imagem do usuário
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

const Stack = createStackNavigator(); //cria uma pilha de telas sendo a primeira a ser exibida a tela de loguin

//função que exibe o app
export default function App() { //define a função que exibe o app
  return (
    //retorna o componente NavigationContainer que é o componente que faz navegação entre as telas
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
            //define o estilo do header
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