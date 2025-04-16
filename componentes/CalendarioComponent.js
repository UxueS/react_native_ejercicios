import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = state => ({
  excursiones: state.excursiones
});

class Calendario extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { isLoading, errMess, excursiones } = this.props.excursiones;

    const renderCalendarioItem = ({ item, index }) => (
      <ListItem
        key={index}
        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
        bottomDivider
      >
        <Avatar source={{ uri: baseUrl + item.imagen }} />
        <ListItem.Content>
          <ListItem.Title>{item.nombre}</ListItem.Title>
          <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );

    if (isLoading) {
      return (
        <SafeAreaView>
          <Text style={{ margin: 10 }}>Cargando excursiones...</Text>
        </SafeAreaView>
      );
    } else if (errMess) {
      return (
        <SafeAreaView>
          <Text style={{ margin: 10 }}>Error: {errMess}</Text>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <FlatList
            data={excursiones}
            renderItem={renderCalendarioItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}

export default connect(mapStateToProps)(Calendario);
