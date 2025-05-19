import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../Components/header";
export default function HomePage(){
  const router = useRouter();
  return(
    <View style={styles.HomePage}>
      <Header title="HabitControl"/>
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/Screens/home')}>
        <Image style={styles.image} source={require('../assets/images/botaoVoltar 1.png')} />
        <Text style={styles.btnVoltarText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize:30,}}>Estatisticas</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  HomePage: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"#021123",
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
  image: {
    width:30,  
    height: 40,           
    resizeMode: 'contain',
    top:10,
    right:30,
  },
  btnVoltarText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    top: -20,
    left:10
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
});