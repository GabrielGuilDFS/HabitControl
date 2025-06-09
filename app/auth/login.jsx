import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from "react-native";
import { auth } from "../../firebaseConfig";
import Header from '../Components/header';
const { width, height } = Dimensions.get('window');
export default function Login() {  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      router.push('/Screens/home');
    } catch (error) {
      console.error(error);
      alert("Erro no login: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="HabitControl" />
      <View style={styles.body}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/')}>
    <Image style={styles.image} source={require('../assets/images/botaoVoltar 1.png')} />
    <Text style={styles.btnVoltarText}>Voltar</Text>
  </TouchableOpacity>
        <Text style={styles.txtLogin}>Login</Text>
        <TextInput
          placeholder="Seu E-mail"
          style={styles.textInput}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Sua Senha"
          style={styles.textInput}
          onChangeText={text => setSenha(text)}
        />
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OU</Text>
        <TouchableOpacity style={styles.btnCadastrese} onPress={() => router.push('/auth/cadastro')}>
          <Text style={styles.btnText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021123",
    paddingTop: Platform.OS === 'android' ? 25 : 0, // para status bar em Android
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: '100%',
  },
  btnVoltar: {
  position: 'absolute',
  top: 80,    // diminua esse valor para subir mais
  left: 20,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: "#272343",
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 8,

  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  btnVoltarText: {
    color: 'white',
    fontSize: 16,
  },
  txtLogin: {
    fontSize: width * 0.1, // fonte proporcional à largura da tela
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  btnLogin: {
    width: '100%',
    maxWidth: 400,
    height: 45,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  orText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 14,
    marginBottom: 10,
  },
  btnCadastrese: {
    width: '100%',
    maxWidth: 400,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    maxWidth: 400,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
