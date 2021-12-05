import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { TouchableOpacity} from 'react-native';
import { Card } from 'react-native-cards';


import {
  NomeAtividade,
  PrioridadeAtividade,
  DataAtividade
} from '../../assets/styles';

export default class FeedCard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      feed: this.props.feed,
      navegador: this.props.navegador
    }

  }

  render = () => {
    const { feed, navegador } = this.state;

    //if(feed.prioridade=="Alta"){
      
    //}

    return (
      <TouchableOpacity onPress={
        () => {
          navegador.navigate("Detalhes", { feedId: feed._id })
        }  
      }>
        <Card>
          <NomeAtividade>{feed.nome}</NomeAtividade>
          <DataAtividade>{feed.data}</DataAtividade> 
          <PrioridadeAtividade>{feed.prioridade}</PrioridadeAtividade>
        </Card>
      </TouchableOpacity>
    );
  }

}