import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl, colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';


function RenderComentario(props) {
    const comentarios = props.comentarios;

    return (
        <Card>
            <Card.Title style={{ color: colorGaztaroaOscuro }}>Comentarios</Card.Title>
            <Card.Divider />
            {
                comentarios.map((comentario, index) => (
                    <View key={index} style={styles.commentItem}>
                        <Text style={{ fontSize: 14 }}>{comentario.comentario}</Text>
                        <Text style={{ fontSize: 12 }}>{comentario.valoracion} Estrellas</Text>
                        <Text style={{ fontSize: 12 }}>{'-- ' + comentario.autor + ', ' + comentario.dia}</Text>
                    </View>
                ))
            }
        </Card>
    );
}

function RenderExcursion(props) {
    const { excursion, favorita, onPress } = props;

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={styles.cardImage}>
                    <Text style={styles.imageText}>
                        {excursion.nombre}
                    </Text>
                </Card.Image>
                <Text style={styles.descriptionText}>
                    {excursion.descripcion}
                </Text>
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
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        });
    }

    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter(
                        comentario => comentario.excursionId === excursionId
                    )}
                />
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

export default DetalleExcursion;
