
/*
  Name: Oscar Miralles Fernandez
  Student ID: 301250756
*/

import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,  
  View,
  Switch,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  //Variables structure
  state = {
    heinght: '',
    weight: '',
    BMI: '',
    switchValue: false,
    status: '',
  }

  //Functions to handle changes
  changeHeight = (text) => {
    this.setState({ height: text })
  }
  
  changeWeight = (text) => {
    this.setState({ weight: text })
  }

  changeSwitch = (bool) => {
    this.setState({ switchValue: bool })
  }

  clear = () => {    
    this.setState({
      height: '',
      weight: '',
      BMI: '',
      status: '',      
    });
  }

  calculate = (height, weight) => {
    var inputHeight = 0; 
    var inputWeight = 0;
    var calc = 0;

    //Transform the values to KG and M
    if (this.state.switchValue) {
      inputHeight = parseFloat(height) * 0.0254; //1 in - 0.0254 m
      inputWeight = parseFloat(weight) * 0.453592; //1 lb - 0.453592 KG
    } 
    else { 
      inputHeight = parseFloat(height) * 0.01; //100 cm - 1 M
      inputWeight = parseFloat(weight);
    }

    calc = inputWeight / (inputHeight * inputHeight);
    calc = calc.toFixed(2); //Round the calculation to 2 decimal places
    
    this.setState({BMI: calc}); //Assing calculated value

    //Assing values to person status
    if(calc<18.5){
      this.setState({status:'Underweight'});
    }
    else if(calc>=18.5&&calc<25){
      this.setState({status:'Normal weight'});
    }
    else if(calc>=25&&calc<30){
      this.setState({status:'Overweight'});
    }
    else if(calc>=30){
      this.setState({status:'Obese'});
    }
    else{
        alert('Incorrect Input!');
        this.setState({status:''});
    }
  }

  //Components presentations
  render() {
    return (    
      <View style={styles.container}>
        <Text style={styles.title}>CALCULATE YOUR BMI</Text>

        <Text style={styles.text}>Push the switch button to change metric system</Text>
           
        <Switch        
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#00FF00" }}
            thumbColor={this.state.switchValue ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"          
            onValueChange={this.changeSwitch}
            value={this.state.switchValue}
          /> 

        <TextInput
          style={styles.input}
          value={this.state.weight}
          onChangeText={this.changeWeight}
          placeholder= {this.state.switchValue ? 'Weight (lb)' : 'Weight (kg)'}
          placeholderTextColor="#FFF"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={this.state.height}
          onChangeText={this.changeHeight}
          placeholder={this.state.switchValue ? 'Height (in)' : 'Height (cm)'}
          placeholderTextColor="#FFF"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.buttonCalc} onPress={() => this.calculate(this.state.height, this.state.weight)}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonClear} onPress={() => this.clear()}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 70, textAlign: 'center'}}>RESULTS</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        
        <Text style={styles.text}>BMI: {this.state.BMI}</Text> 
        
        <Text style={styles.text}>STATUS: {this.state.status}</Text>

      </View>
    );
  }
}

//Component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  title: {
    textAlign: 'center',
    marginTop: 45,
    fontSize: 30,
    color: 'red',
  },
  text: {    
    padding: 15,
  },
  switch: {
    alignSelf: 'flex-start',
    margin: 15,
    padding: 0,
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    color: '#fff',
    fontSize: 23,
  },
  buttonCalc: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 10,
    backgroundColor: '#00cc00',
  },
  buttonClear: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 10,
    backgroundColor: '#41Aef4',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 25,
  },
});
