import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'

import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { Header, CheckBox, Input } from "react-native-elements";
import { RadioButton } from 'react-native-paper';


export default class Cadastros extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {date: ''};
  }

  selectDate = (date) => {
    this.setState({date: date});
  }

  render = () => {
    return (
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
        <Text>Cadastre seu objetivo</Text>
        <Text>Nome</Text>
        <Input />
        <Text>Descrição</Text>
        <Input />
        <Text>Prioridade</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Baixa', value: 'Baixa' },
                { label: 'Média', value: 'Média' },
                { label: 'Alta', value: 'Alta' },
            ]}
        /> 
        <Text>Duração</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '00:30', value: '0.5' },
            { label: '01:00', value: '1.0' },
            { label: '01:30', value: '1.5' },
            { label: '02:00', value: '2.0' },
            { label: '02:30', value: '2.5' },
            { label: '03:00', value: '3.0' },
            { label: '03:30', value: '3.5' },
            { label: '04:00', value: '4.0' },


        ]}
        />
        <Text>Data</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          format="DD-MM-YYYY"
          onDateChange={this.selectDate}
        />
        <Text>Horário</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '00:00', value: '0.0' },
            { label: '01:00', value: '1.0' },
            { label: '02:00', value: '2.0' },
            { label: '03:00', value: '3.0' },
            { label: '04:00', value: '4.0' },
            { label: '05:00', value: '5.0' },
            { label: '06:00', value: '6.0' },
            { label: '07:00', value: '7.0' },
            { label: '08:00', value: '8.0' },
            { label: '09:00', value: '9.0' },
            { label: '10:00', value: '10.0' },
            { label: '11:00', value: '11.0' },
            { label: '12:00', value: '12.0' },
            { label: '13:00', value: '13.0' },
            { label: '14:00', value: '14.0' },
            { label: '15:00', value: '15.0' },
            { label: '16:00', value: '16.0' },
            { label: '17:00', value: '17.0' },
            { label: '18:00', value: '18.0' },
            { label: '19:00', value: '19.0' },
            { label: '20:00', value: '20.0' },
            { label: '21:00', value: '21.0' },
            { label: '22:00', value: '22.0' },
            { label: '23:00', value: '23.0' },
        ]}
        />  

        <Button
          onPress={
              () => {
                  this.props.navigation.navigate("Feeds")
              } 
          }
          title="OK"
          color="#889955"
        />
      </>
    );
  }

}