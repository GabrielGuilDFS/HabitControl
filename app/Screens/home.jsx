import { useRouter } from 'expo-router';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../Components/header';
export default function AdicionarHabitoScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="HabitControl"/>
      <Text style={styles.welcomeText}>Bem-vindo, Usuario!</Text>
      <View style={styles.conteinerBotoes}>
        <TouchableOpacity style={styles.btnNovoHabito} onPress={()=> router.push('/Screens/adicionarHab')}>
          <Text style={{color:'white'}}>+ Novo Hábito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEstatistica} onPress={()=> router.push('/Screens/estatistica')}>
          <Image style={styles.image} source={require('../assets/images/Estatistica_icon-removebg-preview (1) 6.png')} />
          <Text style={(styles.btnNovoHabitoText)}>Estatisticas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021123',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:40
  },
  conteinerBotoes:{
    width:"100%",
    height:60,
    flexDirection: 'row',
    padding:10,
    justifyContent:'center',
  },
  btnNovoHabito:{       
    width: 100,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnEstatistica: {
    width: 120,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  image: {
    width:30,  
    height: 30,
    marginRight:10,         
    resizeMode: 'contain',
  },
});
