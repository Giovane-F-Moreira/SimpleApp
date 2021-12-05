import React from 'react';
import FeedCard from '../../components/FeedCard';
import feedsEstaticos from "../../assets/dicionarios/feeds.json";
import Icon from "react-native-vector-icons/AntDesign";

import { View, FlatList, Button, Image } from 'react-native';
import { Header } from 'react-native-elements';

import {
    EntradaNomeAtividade,
    CentralizadoNaMesmaLinha
} from "../../assets/styles";

const FEEDS_POR_PAGINA = 4;
export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proximaPagina: 0,
            feeds: [],

            nomeAtividade: null,
            atualizando: false,
            carregando: false
        };
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds, nomeAtividade } = this.state;

        //avisa que esta carregando 
        this.setState({
            carregando: true
        });

        //precisa filtrar por nome de produto
        if (nomeAtividade) {
            const maisFeeds = feedsEstaticos.feeds.filter((feed) =>
                feed.nome.toLowerCase().includes(nomeAtividade.toLowerCase()));

            this.setState({
                feeds: maisFeeds,

                atualizando: false,
                carregando: false
            });
        }

        //carrega  o total de feeds por pagina da pagina atual
        const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1;
        const idFinal = idInicial + FEEDS_POR_PAGINA - 1;
        const maisFeeds = feedsEstaticos.feeds.filter((feed) => feed._id >= idInicial && feed._id <= idFinal);

        if (maisFeeds.length) {
            console.log("Adicionado " + maisFeeds.length + " feeds");

            //incrementar a pagina
            this.setState({
                proximaPagina: proximaPagina + 1,
                feeds: [...feeds, ...maisFeeds],

                atualizando: false,
                carregando: false
            });
        } else {
            this.setState({
                atualizando: false,
                carregando: false
            })
        }
    }

    componentDidMount = () => {
        this.carregarMaisFeeds();
    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;

        if (carregando) {
            return;
        }

        this.carregarFeeds();
    }

    mostrarFeed = (feed) => {
        return (
            <FeedCard feed={feed} navegador={this.props.navigation} />
        );
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;

        return (
            <>
                <CentralizadoNaMesmaLinha>

                    <Header
                        leftComponent={
                            <>
                                <Image style={{ width: 70, height: 50 }} source={require('./../../assets/img/logoM2.png')} />
                            </>    
                        }
                        
                        centerComponent={
                            this.mostrarBarraPesquisa()
                        }

                        rightComponent={
                            <>
                            </>
                        }
                    >
                    </Header>
                </CentralizadoNaMesmaLinha>

                <FlatList
                    data={feeds}

                    numColums={1}

                    onEndReached={() => this.carregarMaisFeeds()}
                    onEndReachedThreshold={0.1}

                    onRefresh={() => this.atualizar()}
                    refreshing={atualizando}

                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%' }}>
                                {this.mostrarFeed(item)}
                            </View>
                        )
                    }}
                >
                </FlatList>
                <Button
                    onPress={
                        () => {
                            this.props.navigation.navigate("Cadastros")
                        } 
                    }
                    title="Adicionar"
                    color="#889955"
                />
            </>

        );
    }

    atualizarNomeAtividade = (nome) => {
        console.log("Nome do produto para pesquisa: " + nome);
        this.setState({
            nomeAtividade: nome
        })
    }

    mostrarBarraPesquisa = () => {
        const { nomeAtividade } = this.state;

        return (
            <CentralizadoNaMesmaLinha>
                <EntradaNomeAtividade
                    style={{ marginLeft: 120 }}
                    onChangeText={(nome) => this.atualizarNomeAtividade(nome)}
                    value={nomeAtividade}></EntradaNomeAtividade>
                <Icon style={{ padding: 8 }} size={28} name="search1"
                    onPress={
                        () => {
                            this.carregarFeeds()
                        }
                    }></Icon>
            </CentralizadoNaMesmaLinha>
        )
    }

    atualizar = () => {
        this.setState({ atualizando: true, feeds: [], proximaPagina: 0, nomeAtividade: null },
            () => {
                this.carregarFeeds();
            });
    }

    render = () => {
        const { feeds } = this.state;

        if (feeds.length) {
            console.log("Exibindo " + feeds.length + " feeds");

            return (
                this.mostrarFeeds(feeds)
            );
        } else {
            return <View></View>
        };
    }
};