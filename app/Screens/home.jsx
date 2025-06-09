import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from "../Components/header";


export default function HomeScreen() {
  const router = useRouter();
  const [habitos, setHabitos] = useState([]);
  const insets = useSafeAreaInsets();


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

      <View style={styles.containerBotoes}>
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
          paddingBottom: insets.bottom + 20, // <- Ajuste aqui
        }}
      >
        <View style={styles.habitosWrapper}>
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

      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={() => router.push('/auth/login')}
      >
        <View style={styles.voltarContent}>
          <Image
            style={styles.image}
            source={require('../assets/images/botaoVoltar 1.png')}
          />
          <Text style={styles.btnVoltarText}>Voltar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021123',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  containerBotoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom:40
    
  },
  btnNovoHabito: {
    minWidth: '40%',
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 80,
  },
  listaHabitos: {
    flexGrow: 1,
    width: '100%',
  },
  habitosWrapper: {
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 20,
  },
  habitoContainer: {
    backgroundColor: '#021123',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#272343',
    width: '100%',
  },
  habitoContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  habitoNome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  habitoInfo: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 3,
  },
  botoesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
    flexWrap: 'wrap',
  },
  btnFinalizar: {
    backgroundColor: '#272343',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: '48%',
  },
  btnDesistir: {
    backgroundColor: '#272343',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: '48%',
  },
  btnVoltar: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272343',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop:70
  },
  voltarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginRight: 6,
  },
  btnVoltarText: {
    color: 'white',
    fontSize: 16,
  },
});