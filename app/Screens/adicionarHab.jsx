import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../Components/header';
import styles from '../styles'; // Certifique-se que esse arquivo existe

// Função auxiliar para solicitar permissão para notificações
async function solicitarPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão para notificações negada!');
  }
}

// Configuração do handler para notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AdicionarHabito() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [vezesPDia, setVezesPDia] = useState('');
  const [intervaloMin, setIntervaloMin] = useState('');
  const [nota, setNota] = useState('');

  const [selecionado1, setSelecionado1] = useState(false);
  const [selecionado2, setSelecionado2] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      solicitarPermissao();
    }
  }, []);

  const alternarMarcacao1 = () => {
    setSelecionado1(!selecionado1);
    if (!selecionado1) setSelecionado2(false);
  };

  const alternarMarcacao2 = () => {
    setSelecionado2(!selecionado2);
    if (!selecionado2) setSelecionado1(false);
  };

  // Função para agendar notificações locais
  async function agendarNotificacoes(habito) {
    const { vezesPDia, intervaloMin, nome } = habito;

    if (Platform.OS !== 'web') {
      await Notifications.cancelAllScheduledNotificationsAsync();

      for (let i = 0; i < vezesPDia; i++) {
        const segundosAguardar = (i + 1) * intervaloMin * 60;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Lembrete de Hábito',
            body: `Hora de: ${nome}`,
          },
          trigger: {
            seconds: segundosAguardar,
            repeats: false,
          },
        });
      }
    } else {
      // Web fallback
      if (!('Notification' in window)) {
        alert('Seu navegador não suporta notificações.');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permissão para notificações negada no navegador.');
        return;
      }

      setTimeout(() => {
        new Notification('Lembrete de Hábito', {
          body: `Hora de: ${habito.nome}`,
          icon: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
        });
      }, 60000);
    }
  }

  const salvarHabito = async () => {
    if (!nome || (!selecionado1 && !selecionado2) || !vezesPDia || !intervaloMin) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const habito = {
      id: Date.now().toString(),
      nome,
      frequencia: selecionado1 ? 'diária' : selecionado2 ? 'semanal' : '',
      vezesPDia: parseInt(vezesPDia, 10),
      intervaloMin: parseInt(intervaloMin, 10),
      nota,
    };

    try {
      const jsonValue = await AsyncStorage.getItem('@habitos');
      let habitos = jsonValue != null ? JSON.parse(jsonValue) : [];

      habitos.push(habito);

      await AsyncStorage.setItem('@habitos', JSON.stringify(habitos));

      await agendarNotificacoes(habito);

      router.push('/Screens/home');
    } catch (error) {
      console.error('❌ Erro ao salvar hábito:', error);

      if (error instanceof SyntaxError) {
        console.error('Erro de parse JSON:', error.message);
      } else if (error.message) {
        console.error('Mensagem do erro:', error.message);
      }

      alert('Erro ao salvar hábito. Verifique os detalhes no console.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="HabitControl" />
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/Screens/home')}>
        <Image
          style={styles.image}
          source={require('../assets/images/botaoVoltar 1.png')}
        />
        <Text style={styles.btnVoltarText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Adicionar Hábito</Text>
      <View style={styles.containerForm}>
        <Text style={styles.label}>Nome do Hábito</Text>
        <TextInput
          placeholder="Digite aqui..."
          placeholderTextColor="#aaa"
          style={styles.inputLinha}
          value={nome}
          onChangeText={setNome}
        />

        <View style={styles.containerMark}>
          <Text style={styles.texto}>Frequência: </Text>
          <TouchableOpacity style={styles.marcador} onPress={alternarMarcacao1}>
            {selecionado1 && <View style={styles.marcadoInterno} />}
          </TouchableOpacity>
          <Text style={styles.texto}>Diária</Text>
          <TouchableOpacity style={styles.marcador2} onPress={alternarMarcacao2}>
            {selecionado2 && <View style={styles.marcadoInterno} />}
          </TouchableOpacity>
          <Text style={styles.texto2}>Semanal</Text>
        </View>

        <Text style={styles.texto3}>Definir Timer</Text>
        <Text style={{ color: 'white', fontSize: 18 }}>Vezes ao dia:</Text>
        <TextInput
          style={styles.inputLinha}
          keyboardType="numeric"
          placeholder="Digite quantas vezes quer notificar..."
          placeholderTextColor="#aaa"
          value={vezesPDia}
          onChangeText={text => setVezesPDia(text.replace(/[^0-9]/g, ''))}
        />

        <Text style={{ color: 'white', fontSize: 18, paddingTop: 20 }}>
          Tempo entre notificações (min):
        </Text>
        <TextInput
          style={styles.inputLinha}
          keyboardType="numeric"
          placeholder="Digite em minutos..."
          placeholderTextColor="#aaa"
          value={intervaloMin}
          onChangeText={text => setIntervaloMin(text.replace(/[^0-9]/g, ''))}
        />

        <Text style={{ color: 'white', fontSize: 18, paddingTop: 20 }}>Nota sobre o hábito</Text>
        <TextInput
          placeholder="Digite notas aqui..."
          placeholderTextColor="#aaa"
          style={styles.inputLinha}
          value={nota}
          onChangeText={setNota}
        />
      </View>

      <TouchableOpacity style={styles.btnSalvar} onPress={salvarHabito}>
        <Text style={{ color: 'white', fontSize: 18 }}>Salvar Hábito</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  btnSalvar: {
    width: 160,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnVoltar: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: 100,
    height: 40,
    backgroundColor: '#272343',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnVoltarText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    top: -20,
    left: 10,
  },
  image: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    top: 10,
    right: 30,
  },
  label: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    marginTop: 10,
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
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 100,
  },
  containerForm: {
    backgroundColor: '#021123',
    width: '95%',
    maxWidth: 500,
    height: 400,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'white',
  },
  marcador: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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
    marginLeft: 30,
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
  texto3: {
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  containerMark: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
