import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('./LogoTipo.png')} />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,  
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',     
    zIndex: 999,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  image: {
    width: width * 0.1,   
    height: 40,           
    resizeMode: 'contain', 
  },
});

export default Header;
