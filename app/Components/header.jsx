import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('./LogoTipo.png')} />
      <Text style={styles.headerTitle}>Habit Control</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 28,
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 10,
    paddingHorizontal: 10, // opcional: evita que fiquem colados na lateral
  },
  headerTitle: {
    fontSize: 26, // um pouco menor para caber melhor
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // diminui o espaço entre logo e texto
  },
  image: {
    width: 35, // ajusta o tamanho para caber bem
    height: 35,
    resizeMode: 'contain',
  },
});

export default Header;
