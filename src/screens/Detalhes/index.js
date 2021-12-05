import React from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
import feedsEstaticos from "../../assets/dicionarios/feeds.json";

import { Header } from "react-native-elements";
import { Text, Button } from "react-native";

import {
  NomeAtividade,
  DescricaoAtividade,
  TempoAtividade,
  DataAtividade,
  PrioridadeAtividade
} from "../../assets/styles";

export default class Detalhes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      feed: null
    }
  }

  carregarFeed = () => {
    const { feedId } = this.state;

    const feeds = feedsEstaticos.feeds;
    const feedFiltrados = feeds.filter((feed) => feed._id === feedId);
    if(feedFiltrados.length){
      this.setState({
        feed: feedFiltrados[0]
      });
    }
  }

  componentDidMount = () => {
    this.carregarFeed();
  }

  mostrarSlides = () => {
    
  }

  render = () => {
    const { feed } = this.state;

    if (feed) {
      return(
        <>
          <Header
            leftComponent={
              <Icon size={28} name="left" onPress={() => {
                this.props.navigation.goBack(); 
              }} />
            }
            centerComponent={
              <>
                <Text>SimpleApp</Text>
              </>
            }
            rightComponent={
              <></>
            }
          />
          <CardView
            cardElevation={2}
            cornerRadius={2}
          >            
            <NomeAtividade>Nome: {feed.nome}</NomeAtividade>
            <DescricaoAtividade>Descrição: {feed.descricao}</DescricaoAtividade>
            <PrioridadeAtividade>Prioridade: {feed.prioridade}</PrioridadeAtividade>
            <TempoAtividade>Duração: {feed.duracao}</TempoAtividade>
            <DataAtividade>{feed.data}</DataAtividade>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              title="Remover"
              color="#990000"
            />
          </CardView>
        </>
        
      );
    }else{
      return(null);
    }
  }
}