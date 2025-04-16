import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + item.imagen }} style={styles.cardImage}>
          <Text style={styles.imageText}>{item.nombre}</Text>
        </Card.Image>
        <Text style={styles.descriptionText}>{item.descripcion}</Text>
      </Card>
    );
  } else {
    return <View />;
  }
}

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  cabeceras: state.cabeceras,
  actividades: state.actividades,
});

class Home extends Component {
  render() {
    const { excursiones, cabeceras, actividades } = this.props;

    return (
      <ScrollView>
        <RenderItem item={cabeceras.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={excursiones.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={actividades.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    position: 'absolute',
    top: 40,
    color: 'chocolate',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
  },
  descriptionText: {
    margin: 20,
  },
});

export default connect(mapStateToProps)(Home);
