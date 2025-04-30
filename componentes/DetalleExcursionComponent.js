import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { Rating } from 'react-native-ratings'; 
import { connect } from 'react-redux';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { postFavorito, postComentario } from '../redux/ActionCreators';

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

function RenderExcursion({ excursion, favorita, onPressFavorito, onShowModal }) {
  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={styles.cardImage}>
          <Text style={styles.imageText}>{excursion.nombre}</Text>
        </Card.Image>
        <Text style={styles.descriptionText}>{excursion.descripcion}</Text>
        <View style={styles.iconRow}>
          <Icon
            raised
            reverse
            name={favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={onPressFavorito}
          />
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color={colorGaztaroaOscuro}
            onPress={onShowModal}
            containerStyle={{ marginLeft: 20 }}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      autor: '',
      comentario: '',
      valoracion: 5
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  resetForm = () => {
    this.setState({
      showModal: false,
      autor: '',
      comentario: '',
      valoracion: 5
    });
  };

  gestionarComentario = () => {
    const { excursionId } = this.props.route.params;
    const { valoracion, autor, comentario } = this.state;
    this.props.postComentario(excursionId, valoracion, autor, comentario);
    this.toggleModal();
    this.resetForm();
  };

  marcarFavorito = (excursionId) => {
    this.props.postFavorito(excursionId);
  };

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
          onPressFavorito={() => this.marcarFavorito(excursionId)}
          onShowModal={this.toggleModal}
        />
        <RenderComentario comentarios={comentarios} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}
        >
          <View style={styles.modalContainer}>
            <Rating
              showRating
              startingValue={this.state.valoracion}
              imageSize={30}
              fractions={0} 
              onFinishRating={(valoracion) => this.setState({ valoracion })}
            />
            <Input
              placeholder="Autor"
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              onChangeText={(autor) => this.setState({ autor })}
              value={this.state.autor}
            />
            <Input
              placeholder="Comentario"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={(comentario) => this.setState({ comentario })}
              value={this.state.comentario}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.buttonContainer}>
                <Button
                  title="ENVIAR"
                  onPress={this.gestionarComentario}
                  color={colorGaztaroaOscuro}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="CANCELAR"
                  onPress={this.resetForm}
                  color="#A9A9A9"
                />
              </View>
            </View>
          </View>
        </Modal>
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  },
  buttonGroup: {
    marginTop: 20,
    alignItems: 'center'
  },
  buttonContainer: {
    width: '60%',
    marginVertical: 5
  }
});

const mapStateToProps = (state) => ({
  excursiones: state.excursiones.excursiones,
  comentarios: state.comentarios.comentarios,
  favoritos: state.favoritos.favoritos
});

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
