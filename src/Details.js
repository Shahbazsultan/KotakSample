import React, {Component} from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Storage } from './storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: ''
        };
      }

    componentDidMount() {
      this.displayData();
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

      addToCart = async (product)=>{ 
        try {
          const cart = [];
          
          cartItems = await AsyncStorage.getItem('cart')
          console.log("cart Items", cartItems);
          if(cartItems !== null) {
            const cartVal = JSON.parse(cartItems);
            console.log("cart cartVal Before>>", cartVal);

            const productExist = cartVal ? cartVal.find(prod => prod.id === product.id) : null;

            if(productExist && productExist.id){
              alert("Item already in Cart");
              return;
            }
            else{
              cartVal.push(product);
            }
            console.log("cart cartVal After>>", cartVal);
            cart.push(...cartVal);
            // value previously stored  
          }
          else{
            cart.push(product);
          }
          AsyncStorage.setItem('cart',JSON.stringify(cart));
          alert(`${product.productName} added to Cart`)
        } catch(e) {
          // error reading value
        }
      }

      /* ItemSeperator = () => <View style={{
        height: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
      }} /> */

    render() {
      const { product } = this.props.route.params;
      console.log("????product????",product);

      let videoId = "";
      if(product.video){
      const pieces = product.video.split("/");
      videoId = pieces[pieces.length - 1]
      }

        return(
            <View style={{flex:1 , padding:10}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{flex: 6 ,fontSize:20, fontWeight:'bold'}}>{`Welcome ${this.state.username}`}</Text>
                <TouchableOpacity style={{flex:1}} onPress={() => this.props.navigation.navigate('Cart')}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{`Cart`}</Text>
                </TouchableOpacity>
                </View>
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
                borderRadius: 10}}>
                  {videoId ? <YoutubePlayer
                style={{backgroundColor:'#676'}}
        height={200}
        play={true}
        videoId={videoId}
      />: null
                }
                <View style={{padding:10}}>
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
                  <Button title='Add to Cart'
                  onPress={()=>this.addToCart(product)}
                  ></Button>
                  </View>
              </View>
              </View>
              </View>
            </View>
    </View>
        );
    }


}

export default Details;
