import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Button } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class screens extends Component {

  constructor(props){
    super(props);
    this.state = {
      gameState:
        [
          [0,0,0],
          [0,0,0],
          [0,0,0],
        ],
      currentPLayer:1,
    }
    this.onTilePress = this.onTilePress.bind(this);
    this.initializeGame = this.initializeGame.bind(this);
  }

  componentDidMount(){
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name='close' style={styles.tileX} />
      case -1: return <Icon name='circle-outline' style={styles.tileO} />
      default: return <View/>
    }
  }

  initializeGame =()=>{
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0],
      ],
      currentPLayer:1,
    });
  }

  getWinner() {
    const NUN_TILES=3;
    let arr = this.state.gameState;
    let sun;
    for(let i = 0; i<NUN_TILES; i++){
      sun = arr[i][0] + arr[i][1] + arr[i][2];
      if(sun === 3){return 1;}
      else if(sun === -3){return -1;}
    }

    for(let i = 0; i<NUN_TILES; i++){
      sun = arr[0][i] + arr[1][i] + arr[2][i];
      if(sun === 3){return 1;}
      else if(sun === -3){return -1;}
    }

    sun = arr[0][0] + arr[1][1] + arr[2][2];
    if(sun === 3){return 1;}
    else if(sun === -3){return -1;}

    sun = arr[2][0] + arr[1][1] + arr[0][2];
    if(sun === 3){return 1;}
    else if(sun === -3){return -1;}

    return 0;
  }

  onTilePress(row, col) {
    let value = this.state.gameState[row][col];
    if(value != 0) {return;}

    let currentPLayer = this.state.currentPLayer;

    let arr = this.state.gameState.slice();
    arr[row][col] = currentPLayer;
    this.setState({gameState:arr});

    let nextPLayer = (currentPLayer ==1) ? -1 :1;
    this.setState({currentPLayer:nextPLayer});

    let winner = this.getWinner();
    if(winner === 1) {
      alert('player 1 ganhou');
      this.initializeGame();
    }else if(winner === -1){
      alert('player 2 ganhou');
      this.initializeGame();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile,{ borderLeftWidth:0, borderTopWidth:0 }]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile,{ borderTopWidth:0 }]}>
          {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, { borderRightWidth:0, borderTopWidth:0 }]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile,{ borderLeftWidth:0}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.tile}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth:0,}]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile,{ borderLeftWidth:0, borderBottomWidth:0 }]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile,{ borderBottomWidth:0 }]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, { borderRightWidth:0, borderBottomWidth:0 }]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop:50}}>
          <Button title='New Game' onPress={this.initializeGame} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFF',
    alignItems:'center',
    justifyContent:'center'
  },
  tile:{
    borderWidth:10,
    width:100,
    height:100,
    alignItems:'center',
    justifyContent:'center'
  },
  tileX:{
    color:'red',
    fontSize:60,
  },
  tileO:{
    color:'green',
    fontSize:60,
  }
});
