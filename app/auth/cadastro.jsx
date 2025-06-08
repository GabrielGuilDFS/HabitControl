import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import Header from "../Components/header";

export default function Cadastro() {  
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !senhaConfirm) {
      alert("Preencha todos os campos");
      return;
    }
    if (senha !== senhaConfirm) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      alert("Cadastro feito!");
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      alert("Erro: " + error.message);
    }
  };

  return (
    <View style={style.HomePage}>
      <Header title="HabitControl" />
      <TouchableOpacity style={style.btnVoltar} onPress={() => router.push('/auth/login')}>
        <Image style={style.image} source={require('../assets/images/botaoVoltar 1.png')}/>
        <Text style={style.btnVoltarText}>Voltar</Text>
      </TouchableOpacity>
      <View style={style.container}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 30, marginBottom: 30 }}>Cadastro</Text>
        <TextInput
          placeholder="Nome Completo"
          style={style.textInput}
          onChangeText={text => setNome(text)}
          keyboardType="default"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Seu E-mail"
          style={style.textInput}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Sua Senha"
          style={style.textInput}
          onChangeText={text => setSenha(text)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Senha Novamente"
          style={style.textInput}
          onChangeText={text => setSenhaConfirm(text)}
        />
        <TouchableOpacity style={style.btnCadastrar} onPress={handleCadastro}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  HomePage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021123",
  },
  btnVoltar: {
    position: 'absolute',
    top: 100,
    left: 20,
    width: 100,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    top: 10,
    right: 30,
  },
  btnVoltarText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    top: -20,
    left: 10
  },
  btnCadastrar: {
    width: "100%",
    maxWidth: 400,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30,
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
