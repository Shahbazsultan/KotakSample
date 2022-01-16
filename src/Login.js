import React, {Component} from 'react';
import {
  Button,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Storage} from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      passwordValue: '',
      loadComplete: false,
    };
  }

  componentDidMount() {
    this.displayData();
  }

  displayData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // value previously stored
        console.log('>????????Email : ', value);
        this.props.navigation.replace('Home');
      }
      else{
        this.setState({loadComplete: true});
      }
    } catch (e) {
      // error reading value
      this.setState({loadComplete: true});
    }
  };

  onEmailChanged = email => {
    this.setState({emailValue: email});
  };

  onPasswordChanged = password => {
    this.setState({passwordValue: password});
  };

  signIn = () => {
    console.log('>>>>>>>>>', this.state.emailValue, this.state.passwordValue);
    AsyncStorage.setItem('email', this.state.emailValue);
    AsyncStorage.setItem('password', this.state.passwordValue);
    this.props.navigation.replace('Home');
  };

  render() {
    if (this.state.loadComplete == true) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 25, fontWeight:'bold', color: '#233a77'}}>Login</Text>
          <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
            <TextInput
              style={{
                color: '#293340',
                width: '90%',
                fontSize: 14,
                borderRadius: 4,
                borderColor: 'rgb(163,172,189)',
                padding: 15,
                borderWidth: 1,
              }}
              value={this.state.emailValue}
              placeholder="E-mail"
              placeholderTextColor="#9da7a5"
              onChangeText={email => this.onEmailChanged(email)}
            />
          </View>
          <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
            <TextInput
              style={{
                color: '#293340',
                width: '90%',
                fontSize: 14,
                borderRadius: 4,
                borderColor: 'rgb(163,172,189)',
                padding: 15,
                borderWidth: 1,
              }}
              value={this.state.passwordValue}
              placeholderTextColor="#9da7a5"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.onPasswordChanged(password)}
            />
          </View>
          <Button onPress={this.signIn} title="Login" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 50, fontWeight:'bold', color: '#233a77'}}>Kotak</Text>
        </View>
      );
    }
  }
}

export default Login;
