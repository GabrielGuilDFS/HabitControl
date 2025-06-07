import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import 'react-native-get-random-values';
import Header from "./Components/header";

export default function AuthIndex() {
  const router = useRouter();
  return (
    <View style={styles.AuthIndex}>
      <Header title="HabitControl" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Seja bem-vindo ao HabitControl</Text>
        <TouchableOpacity
          style={styles.btnEntrar}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AuthIndex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021123",
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
  btnEntrar: {
    width: "40%",
    maxWidth: 200,
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
});
