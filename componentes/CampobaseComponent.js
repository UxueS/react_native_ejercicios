import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Platform, View, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';


import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux'; import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const mapStateToProps = state => { return { excursiones: state.excursiones, comentarios: state.comentarios, cabeceras: state.cabeceras, actividades: state.actividades } } 
const mapDispatchToProps = dispatch => ({ fetchExcursiones: () => dispatch(fetchExcursiones()), fetchComentarios: () => dispatch(fetchComentarios()), fetchCabeceras: () => dispatch(fetchCabeceras()), fetchActividades: () => dispatch(fetchActividades()), })



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (
          <Icon name="menu" size={28} color="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Campo Base' }} />
    </Stack.Navigator>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
          headerLeft: () => (
            <Icon name="menu" size={28} color="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
          ),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{ title: 'Detalle Excursión' }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (
          <Icon name="menu" size={28} color="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        ),
      }}
    >
      <Stack.Screen name="QuienesSomos" component={QuienesSomos} options={{ title: 'Quiénes somos' }} />
    </Stack.Navigator>
  );
}

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (
          <Icon name="menu" size={28} color="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        ),
      }}
    >
      <Stack.Screen name="Contacto" component={Contacto} options={{ title: 'Contacto' }} />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen
        name="Campo base"
        component={HomeNavegador}
        options={{
          drawerIcon: ({ tintcolor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintcolor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quiénes somos"
        component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="info-circle" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="calendar" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="address-card" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

class Campobase extends Component {
  componentDidMount() { this.props.fetchExcursiones(); this.props.fetchComentarios(); this.props.fetchCabeceras(); this.props.fetchActividades();}
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);
