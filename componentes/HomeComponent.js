import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Image 
                    source={{ uri: baseUrl + item.imagen }} 
                    style={styles.cardImage}
                >
                    <Text style={styles.imageText}>
                        {item.nombre}
                    </Text>
                </Card.Image>
                <Text style={styles.descriptionText}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        };
    }

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
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

export default Home;
