import React, {Component} from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Storage } from './storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
          productList:[]
        };
      }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async() => {
        await axios({
            method: 'get',
            url: `https://mocki.io/v1/d46dc365-f752-46ee-b0cd-c136aec38e00`,
          })
          .then((response) => {
              console.log("response==>" ,response.data);
              this.setState({productList: response.data});
          })
          .catch((error) => {
            alert('Error --> ',error);
          });
      }


    displayData = async ()=>{ 
        try {
          const value = await AsyncStorage.getItem('email')
          if(value !== null) {
            // value previously stored
            this.setState({ username: value });
          }
        } catch(e) {
          // error reading value
        }
      }

      renderProdList = (product) =>{

        return(
            <View style={{
                flex:1,
                padding:8
               }}>
                   <View style={{shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                shadowOpacity: 0.26,
                elevation: 8,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10}}>
                <View style={{flexDirection:'row'}}>
              <View style={{ flex: 4}}>
                  <Text style={{padding:5}}>{product.productName}</Text>
                  <Text style={{padding:5}}>{product.screen}</Text>
                  <Text style={{padding:5}}>{`${product.cpu} ${product.ram} ram`}</Text>
              </View>  
                    <Text style={{ flex: 1,textAlign:'right', justifyContent:'flex-end', padding:5}}>{product.price}</Text>
              </View>
              <View style={{justifyContent:'flex-end' ,flexDirection:'row'}}>
                  <View style={{padding:5}}>
                  <Button title='Details'></Button>
                  </View>
                  <View style={{padding:5}}>
                  <Button title='Add to Cart'></Button>
                  </View>
              </View>
              <View style={{}}></View>
              </View>
            </View>

        );

      }

      /* ItemSeperator = () => <View style={{
        height: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
      }} /> */

    render() {
        this.displayData();
        return(
            <View style={{flex:1 , padding:10}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{`Welcome ${this.state.username}`}</Text>
                <FlatList
                style={{flex:1}}
                // ItemSeparatorComponent={this.ItemSeperator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => this.renderProdList(item)}
              data={this.state.productList}
            />                                   
    </View>
        );
    }


}

export default Home;
