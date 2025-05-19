import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../Components/header";
export default function HomePage(){
  const router = useRouter();
    const [senha, setSenha] = useState("");
  return(
    <View style={style.HomePage}>
      <Header title="HabitControl"/>
      <TouchableOpacity style={style.btnVoltar} onPress={() => router.push('/Screens/login')}>
          <Image style={style.image} source={require('../assets/images/botaoVoltar 1.png')} />
          <Text style={style.btnVoltarText}>Voltar</Text>
        </TouchableOpacity>
      <View style={style.container}>
        <Text style={{color: 'white', textAlign:'center', fontSize:30, marginBottom:30}}>Cadastro</Text>
        <TextInput
          placeholder="Nome Completo"
          style={style.textInput}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
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
          onChangeText={text => setSenha(text)}
        />
        <TouchableOpacity style={style.btnCadastrar} onPress={()=> router.push('')}>
          <Text style={{color: 'white', textAlign:'center',}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  btnCadastrar: {
    width:"100%",
    maxWidth:400,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  HomePage: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"#021123",
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30,
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
    alignItems: "center",
  },
  btnText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width:30,  
    height: 40,           
    resizeMode: 'contain',
    top:10,
    right:30,
  },
  btnVoltarText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    top: -20,
    left:10
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