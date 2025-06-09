import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView, StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../Components/header';

async function solicitarPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão para notificações negada!');
  }
}


Notifications.setNotificationHandler({
  handleNotification: async () => {
  
    if (Platform.OS !== 'web') {
      Vibration.vibrate(500);
    }
    return {
      shouldShowAlert: true,
      shouldPlaySound: true, 
      shouldSetBadge: false,
    };
  },
});

export default function AdicionarHabito() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [vezesPDia, setVezesPDia] = useState('');
  const [intervaloMin, setIntervaloMin] = useState('');
  const [nota, setNota] = useState('');
  const [selecionado1, setSelecionado1] = useState(false);
  const [selecionado2, setSelecionado2] = useState(false);
  const alternarMarcacao1 = () => {
    setSelecionado1(!selecionado1);
    if (!selecionado1) setSelecionado2(false);
  };

  const alternarMarcacao2 = () => {
    setSelecionado2(!selecionado2);
    if (!selecionado2) setSelecionado1(false);
  };
  useEffect(() => {
    if (Platform.OS !== 'web') {
      solicitarPermissao();
    }
  }, []);

  
  async function agendarNotificacoes(habito) {
    const { vezesPDia, intervaloMin, nome } = habito;

    if (Platform.OS !== 'web') {
      
      await Notifications.cancelAllScheduledNotificationsAsync();

      for (let i = 0; i < vezesPDia; i++) {
        const segundosAguardar = (i + 1) * intervaloMin * 60 ;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Lembrete de Hábito',
            body: `Hora de: ${nome}`,
            sound: 'default',  
          },
          trigger: {
            seconds: segundosAguardar,
            repeats: false,
          },
        });
      }
    } else {
      
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

    const vezesPDiaInt = parseInt(vezesPDia, 10);
    const intervaloMinInt = parseInt(intervaloMin, 10);

    if (isNaN(vezesPDiaInt) || isNaN(intervaloMinInt)) {
      alert('Por favor, insira valores numéricos válidos.');
      return;
    }

    const habito = {
      id: Date.now().toString(),
      nome,
      frequencia: selecionado1 ? 'diária' : selecionado2 ? 'semanal' : '',
      vezesPDia: vezesPDiaInt,
      intervaloMin: intervaloMinInt,
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
      console.error('Erro ao salvar hábito:', error);
      alert('Erro ao salvar hábito. Veja o console para mais detalhes.');
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
        <Text style={styles.subLabel}>Vezes ao dia:</Text>
        <TextInput
          style={styles.inputLinha}
          keyboardType="numeric"
          placeholder="Digite quantas vezes quer notificar..."
          placeholderTextColor="#aaa"
          value={vezesPDia}
          onChangeText={text => setVezesPDia(text.replace(/[^0-9]/g, ''))}
        />

        <Text style={styles.subLabel}>Tempo entre notificações (min):</Text>
        <TextInput
          style={styles.inputLinha}
          keyboardType="numeric"
          placeholder="Digite em minutos..."
          placeholderTextColor="#aaa"
          value={intervaloMin}
          onChangeText={text => setIntervaloMin(text.replace(/[^0-9]/g, ''))}
        />

        <Text style={styles.subLabel}>Nota sobre o hábito</Text>
        <TextInput
          placeholder="Digite notas aqui..."
          placeholderTextColor="#aaa"
          style={styles.inputLinha}
          value={nota}
          onChangeText={setNota}
        />
      </View>

      <TouchableOpacity style={styles.btnSalvar} onPress={salvarHabito}>
        <Text style={styles.btnSalvarText}>Salvar Hábito</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021123',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272343',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 60,
  },
  btnVoltarText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  image: {
  width: 30,
  height: 30,  
  resizeMode: 'contain',
  marginRight: 8,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  containerForm: {
    backgroundColor: '#021123',
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  label: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
  },
  subLabel: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  inputLinha: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingVertical: 4,
    color: 'white',
    fontSize: 16,
  },
  containerMark: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
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
    marginLeft: 20,
  },
  marcadoInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  texto: {
    color: 'white',
    fontSize: 16,
  },
  texto2: {
    color: 'white',
    fontSize: 16,
  },
  texto3: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  btnSalvar: {
    backgroundColor: '#272343',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  btnSalvarText: {
    color: 'white',
    fontSize: 18,
  },
});