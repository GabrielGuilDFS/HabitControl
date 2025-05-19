import { useRouter } from 'expo-router';
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from "react-native";
import Header from '../Components/header';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login =() => {
    alert(email);
    alert(senha);
  }
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="HabitControl"/>
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
        <TouchableOpacity style={styles.btnLogin} onPress={() => router.push('/Screens/home')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OU</Text>
        <TouchableOpacity style={styles.btnCadastrese} onPress={() => router.push('/Screens/cadastro')}>
          <Text style={styles.btnText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#021123",
  },
  body:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  btnVoltar: {
    position: 'absolute',  
    top: 80,            
    left: 20,              
    width: 100,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 10,
    justifyContent: "center",
  },
  image: {
    width:30,  
    height: 40,           
    resizeMode: 'contain',
    top:10,
    left:5,
  },
  btnVoltarText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    top: -20,
    left:10
  },
  btnLogin:{
    width: '100%',
    maxWidth: 400,
    height: 45,
    backgroundColor:'#272343',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  txtLogin:{
    fontSize: 36,
    fontWeight:'bold',
    color:'white',
    marginBottom: 30,
  },
  btnText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  orText:{
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 14,
    marginBottom:10
  },
  btnCadastrese:{
    width: '100%',
    maxWidth: 400,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput:{
    width: '100%',
    maxWidth: 400,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
