import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from "../Components/header";

export default function HomeScreen() {
  const router = useRouter();
  const [habitos, setHabitos] = useState([]);

  useEffect(() => {
    const carregarHabitos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@habitos');
        if (jsonValue !== null) {
          const habitosSalvos = JSON.parse(jsonValue);
          setHabitos(habitosSalvos);
        }
      } catch (e) {
        console.error('Erro ao carregar hábitos:', e);
      }
    };
    carregarHabitos();
  }, []);

  const deletarHabito = async (idHabito) => {
    try {
      const habitosJSON = await AsyncStorage.getItem('@habitos');
      let habitos = habitosJSON ? JSON.parse(habitosJSON) : [];

      const novosHabitos = habitos.filter(habito => habito.id !== idHabito);

      await AsyncStorage.setItem('@habitos', JSON.stringify(novosHabitos));
      setHabitos(novosHabitos);
    } catch (e) {
      console.error('Erro ao deletar hábito', e);
    }
  };

  const incrementarFinalizadas = async (idHabito) => {
    try {
      const statsJSON = await AsyncStorage.getItem('@habitosEstatisticas');
      let stats = statsJSON ? JSON.parse(statsJSON) : { finalizadas: {}, desistidas: {} };

      const hoje = new Date().toISOString().split('T')[0];
      stats.finalizadas[hoje] = (stats.finalizadas[hoje] || 0) + 1;

      await AsyncStorage.setItem('@habitosEstatisticas', JSON.stringify(stats));
      console.log("Stats atualizadas:", stats);

      await deletarHabito(idHabito);

      Alert.alert('Sucesso', 'Tarefa finalizada e excluída!');
    } catch (e) {
      console.error('Erro ao incrementar finalizadas', e);
    }
  };

  const incrementarDesistidas = async (idHabito) => {
    try {
      const statsJSON = await AsyncStorage.getItem('@habitosEstatisticas');
      let stats = statsJSON ? JSON.parse(statsJSON) : { finalizadas: {}, desistidas: {} };

      const hoje = new Date().toISOString().split('T')[0];
      stats.desistidas[hoje] = (stats.desistidas[hoje] || 0) + 1;

      await AsyncStorage.setItem('@habitosEstatisticas', JSON.stringify(stats));
      console.log("Stats atualizadas:", stats);

      await deletarHabito(idHabito);

      Alert.alert('Sucesso', 'Tarefa desistida e excluída!');
    } catch (e) {
      console.error('Erro ao incrementar desistidas', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="HabitControl" />
      <Text style={styles.welcomeText}>Bem-vindo, Usuário!</Text>

      <View style={styles.conteinerBotoes}>
        <TouchableOpacity
          style={styles.btnNovoHabito}
          onPress={() => router.push('/Screens/adicionarHab')}
        >
          <Text style={{ color: 'white' }}>+ Novo Hábito</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.listaHabitos}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 500, maxWidth: '100%' }}>
          {habitos.length > 0 ? (
            habitos.map((habito) => (
              <View key={habito.id} style={styles.habitoContainer}>
                <View style={styles.habitoContent}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.habitoNome}>{habito.nome}</Text>
                    <Text style={styles.habitoInfo}>Frequência: {habito.frequencia}</Text>
                    <Text style={styles.habitoInfo}>Vezes por dia: {habito.vezesPDia}</Text>
                    <Text style={styles.habitoInfo}>Intervalo (min): {habito.intervaloMin}</Text>
                    <Text style={styles.habitoInfo}>Nota: {habito.nota}</Text>
                  </View>
                  <View style={styles.botoesContainer}>
                    <TouchableOpacity
                      style={styles.btnFinalizar}
                      onPress={() => incrementarFinalizadas(habito.id)}
                    >
                      <Text style={{ color: 'white' }}>Finalizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnDesistir}
                      onPress={() => incrementarDesistidas(habito.id)}
                    >
                      <Text style={{ color: 'white' }}>Desistir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.habitoInfo}>Nenhum hábito salvo ainda.</Text>
          )}
          
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/auth/login')}>
        <View style={styles.voltarContent}>
          <Image style={styles.image} source={require('../assets/images/botaoVoltar 1.png')} />
          <Text style={styles.btnVoltarText}>Voltar</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
btnVoltar: {
  position: 'absolute',
  top: 100,    // diminua esse valor para subir mais
  left: 20,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: "#272343",
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 8,
  },

voltarContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

image: {
  width: 30,
  height: 30,  
  resizeMode: 'contain',
  marginRight: 8,
},

btnVoltarText: {
  color: 'white',
  fontSize: 16,
},
  container: {
    flex: 1,
    backgroundColor: '#021123',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // Texto de boas-vindas no topo
  welcomeText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:100,
  },

  // Container dos botões principais na tela (Novo Hábito e Estatísticas)
  conteinerBotoes: {
    width: "100%",
    height: 60,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    
  },

  // Botão Novo Hábito na tela inicial
  btnNovoHabito: {
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
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },

  // Lista de hábitos (ScrollView)
  listaHabitos: {
    marginBottom: 120,
  },

  // Container de cada hábito (item da lista)
 habitoContainer: {
  backgroundColor: '#021123',
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  borderWidth: 2,
  borderColor: '#272343',
  maxWidth: 500,
 
},
  // Conteúdo interno do hábito (texto + botões)
  habitoContent: {
    flexDirection: 'row',
    alignItems: 'center', // centraliza verticalmente texto e botões
  },

  // Texto do nome do hábito
  habitoNome: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // Texto de informações do hábito (frequência, etc)
  habitoInfo: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
  },

  // Container dos botões Finalizar e Desistir na lista de hábitos
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // alinhado à direita
    alignItems: 'center',       // centralizado verticalmente
    gap: 10,
    marginLeft: 15,             // separação do texto
  },

  // Botão Finalizar
  btnFinalizar: {
    backgroundColor: '#272343',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  // Botão Desistir
  btnDesistir: {
    backgroundColor: '#272343',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  // Botão para limpar hábito (usado onde?)
  btnLimparHabito: {
    width: 120,
    height: 40,
    backgroundColor: '#8B0000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },

  // Botão Excluir hábito (se ainda for usado)
  btnExcluirHabito: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -15 }],
    backgroundColor: '#E53935',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
