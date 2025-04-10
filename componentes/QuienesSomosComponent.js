import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function Historia() {
  return (
    <Card>
      <Card.Title>Un poquito de historia</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.{'\n\n'}
        Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{'\n\n'}
        ¡Gracias!
      </Text>
    </Card>
  );
}

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
    };
  }

  render() {
    const renderActividadItem = ({ item }) => (
      <ListItem bottomDivider>
        <Avatar source={{ uri: baseUrl + item.imagen }} />
        <ListItem.Content>
          <ListItem.Title>{item.nombre}</ListItem.Title>
          <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );

    return (
      <ScrollView>
        <Historia />
        <Card>
          <Card.Title>"Actividades y recursos"</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.state.actividades}
            renderItem={renderActividadItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false} 
          />
        </Card>
      </ScrollView>
    );
  }
}

export default QuienesSomos;
