import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <Card.Image 
                    source={require('./imagenes/40Años.png')} 
                    style={styles.cardImage}
                >
                    <Text style={styles.imageText}>
                        {excursion.nombre}
                    </Text>
                </Card.Image>
                <Text style={styles.descriptionText}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <RenderExcursion excursion={this.state.excursiones[+excursionId]} />
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
        top: 0,
        color: 'chocolate',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 5
    },
    descriptionText: {
        margin: 20
    }
});

export default DetalleExcursion;
