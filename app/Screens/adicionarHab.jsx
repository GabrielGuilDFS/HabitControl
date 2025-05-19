import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/header';

export default function AdicionarHabitoScreen() {
    const router = useRouter();
    const [selecionado1, setSelecionado1] = useState(false);
    const [selecionado2, setSelecionado2] = useState(false);
    const alternarMarcacao1 = () => {
        setSelecionado1(!selecionado1);
    };
    const alternarMarcacao2 = () => {
            setSelecionado2(!selecionado2);
    };
    const [valor, setValor] = useState('');
    const [valor2, setValor2] = useState('');
  return (
    
    
    <SafeAreaView style={styles.container}>
        <Header title="HabitControl"/>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/Screens/login')}>
            <Image style={styles.image} source={require('../assets/images/botaoVoltar 1.png')} />
            <Text style={styles.btnVoltarText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Adicionar habitos</Text>
        <View style={styles.containerForm}>
            <Text style={styles.label}>Nome do Hábito</Text>
            <TextInput
                placeholder="Digite aqui..."
                placeholderTextColor="#aaa"
                style={styles.inputLinha}
            />
            <View style={styles.containerMark}>
                <Text style={styles.texto}>Frequencia: </Text>
                <TouchableOpacity style={styles.marcador} onPress={alternarMarcacao1}>
                    {selecionado1 && <View style={styles.marcadoInterno} />}
                </TouchableOpacity>
                <Text style={styles.texto}>Diario</Text>
                <TouchableOpacity style={styles.marcador2} onPress={alternarMarcacao2}>
                    {selecionado2 && <View style={styles.marcadoInterno} />}
                </TouchableOpacity>
                <Text style={styles.texto2}>Semanal</Text>
            </View>
            <Text style={styles.texto3}>Definir Timer</Text>
            <Text style={{color:'white',fontSize: 18,}}>Vezes ao dia:</Text>
            <TextInput
            style={styles.inputLinha}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
            placeholder="Digite quantas vezes quer notificar..."
            onChangeText={(text) => setValor(text.replace(/[^0-9]/g, ''))}
            value={valor}
            />
            <Text style={{color:'white',fontSize: 18,paddingTop:20}}>Tempo entre as notificações (min):</Text>
            <TextInput
            style={styles.inputLinha}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
            placeholder="Digite em minutos..."
            onChangeText={(text) => setValor2(text.replace(/[^0-9]/g, ''))}
            value={valor2}
            />
            <Text style={{color:'white',fontSize: 18,paddingTop:20}}>Nota sobre o habito</Text>
            <TextInput
                placeholder="Digite notas aqui..."
                placeholderTextColor="#aaa"
                style={styles.inputLinha}
            />
      </View>
        <TouchableOpacity style={styles.btnSalvar} onPress={() => router.push('/Screens/home')}>
            <Text style={{color:'white',fontSize: 18,}}>Salvar habito</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    btnSalvar: {       
    width: 160,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 10,
    justifyContent:'center',
    alignItems: "center",
    marginTop:20,
},
    inputXDias: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
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
  label: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    marginTop:10
},
   inputLinha: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingVertical: 4,
    color: 'white',
    fontSize: 16,
},
  container: {
    flex: 1,
    backgroundColor: '#021123',
    paddingTop: 80,
    paddingHorizontal: 0,
    alignItems:'center'
  },
  welcomeText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:100,
  },
  containerForm:{
    backgroundColor: '#021123',
    width:"95%",
    maxWidth:500,
    height:400,
    paddingHorizontal: 20,
    borderWidth:3,
    borderRadius:10,
    borderColor:'white',
},
 marcador: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
  },
 marcador2: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft:30
  },
  marcadoInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  texto: {
    color: 'white',
    fontSize: 18,
  },
  texto2: {
    color: 'white',
    fontSize: 18,
  },
  texto3:{
    color: 'white',
    fontSize: 20,
    
    paddingTop:10,
    paddingBottom:15
  },
   containerMark:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
