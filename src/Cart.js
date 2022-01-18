import React, {Component} from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Storage } from './storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
          productList:[]
        };
      }

    componentDidMount() {
        this.displayData();
    }

    displayData = async ()=>{ 
        try {
          const value = await AsyncStorage.getItem('email')
          const cartItems = await AsyncStorage.getItem('cart')

          if(value !== null) {
            // value previously stored
            this.setState({ username: value, productList: JSON.parse(cartItems) });
          }
        } catch(e) {
          // error reading value
        }
      }

      removeFromCart = async (product)=>{ 
        try {
          if(this.state.productList.length > 0) {
            const cartVal = this.state.productList;
            console.log("cart cartVal Before>>", cartVal);

            const removeIndex = cartVal ? cartVal.findIndex(prod => prod.id === product.id) : null;
            console.log("remove Index :",removeIndex);
            if(removeIndex > -1){
              cartVal.splice(removeIndex, 1);
            }
            console.log("cart cartVal After>>", cartVal);
            this.setState({productList : cartVal });
            AsyncStorage.setItem('cart',JSON.stringify(cartVal));
            // alert(`${product.productName} removed from Cart`)
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
                  <Button title='Remove'
                  onPress={()=>this.removeFromCart(product)}
                  ></Button>
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
        
        return(
            <View style={{flex:1 , padding:10}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{`Welcome to the cart ${this.state.username}`}</Text>
                {this.state.productList.length>0 ?
                <FlatList
                style={{flex:1}}
                // ItemSeparatorComponent={this.ItemSeperator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => this.renderProdList(item)}
              data={this.state.productList}
            /> : <View style={{flex:1, alignContent:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',fontSize:40, fontWeight:'bold'}}>{`Cart is Empty`}</Text>
              </View>}
    </View>
        );
    }


}

export default Cart;
