import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Components/header";
export default function HomePage(){
  const router = useRouter();
  return(
    <View style={style.HomePage}>
      <Header title="HabitControl"/>
      <View style={style.container}>
        <Text style={{color: 'white', textAlign:'center', fontSize:30, marginBottom:30}}>Seja bem vindo ao HabitControl</Text>
        <TouchableOpacity style={style.btnEntrar} onPress={()=> router.push('/Screens/login')}>
          <Text style={{color: 'white', textAlign:'center',}}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  btnEntrar: {
    width:"40%",
    maxWidth:200,
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
  }
});