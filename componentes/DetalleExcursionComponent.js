import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { postFavorito } from '../redux/ActionCreators'; 

function RenderComentario({ comentarios }) {
  return (
    <Card>
      <Card.Title style={{ color: 'black' }}>Comentarios</Card.Title>

      <Card.Divider />
      {comentarios.map((comentario, index) => (
        <View key={index} style={styles.commentItem}>
          <Text style={{ fontSize: 14 }}>{comentario.comentario}</Text>
          <Text style={{ fontSize: 12 }}>{comentario.valoracion} Estrellas</Text>
          <Text style={{ fontSize: 12 }}>{'-- ' + comentario.autor + ', ' + comentario.dia}</Text>
        </View>
      ))}
    </Card>
  );
}

function RenderExcursion({ excursion, favorita, onPress }) {
  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={styles.cardImage}>
          <Text style={styles.imageText}>{excursion.nombre}</Text>
        </Card.Image>
        <Text style={styles.descriptionText}>{excursion.descripcion}</Text>
        <View style={styles.favoriteContainer}>
          <Icon
            raised
            reverse
            name={favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() =>
              favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId); 
  }

  render() {
    const { excursionId } = this.props.route.params;
    const excursion = this.props.excursiones.find((exc) => exc.id === excursionId);
    const comentarios = this.props.comentarios.filter((c) => c.excursionId === excursionId);
    const esFavorita = this.props.favoritos.includes(excursionId); 

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursion}
          favorita={esFavorita}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario comentarios={comentarios} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageText: {
    position: 'absolute',
    top: 40,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5
  },
  descriptionText: {
    margin: 20
  },
  commentItem: {
    margin: 10
  },
  favoriteContainer: {
    alignItems: 'flex-start',
    margin: 10
  }
});

const mapStateToProps = (state) => ({
  excursiones: state.excursiones.excursiones,
  comentarios: state.comentarios.comentarios,
  favoritos: state.favoritos.favoritos 
});

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
