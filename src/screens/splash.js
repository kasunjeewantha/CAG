import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../styles/colors';
import {version as APP_VERSION} from '../../package.json';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.BLACK_COLOR,
    textAlign: 'center',
  },

  version: {
    height: 50,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  versionText: {
    fontSize: 15,
    color: Colors.BLACK_COLOR,
    textAlign: 'center',
  },
});

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => navigation.navigate('Home'), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}> C A G </Text>
        </View>
        <View style={styles.version}>
          <Text style={styles.versionText}> v {APP_VERSION} </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
