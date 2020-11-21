import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right,
  View,
  Content,
  Form,
  Item,
  Label,
  Input,
  Body,
} from "native-base";
import { AsyncStorage, Modal, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";

export default class ActionPemSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _HarTiang: "",
      _HarJtm: "",
      _HarRayon: "",
      _HarIdTiang: "",
      _HarIdJtm: "",
    };
  }
  async componentDidMount() {
    const _HarTiang = await AsyncStorage.getItem("pemeliharaan_Tiang");
    const _HarJtm = await AsyncStorage.getItem("pemeliharaan_Jtm");
    const _HarRayon = await AsyncStorage.getItem("pemeliharaan_Rayon");
    const _HarIdTiang = await AsyncStorage.getItem("pemeliharaan_id_Tiang");
    const _HarIdJtm = await AsyncStorage.getItem("pemeliharaan_id_Jtm");

    this.setState({
      _HarTiang: _HarTiang,
      _HarJtm: _HarTiang,
      _HarRayon: _HarRayon,
      _HarIdTiang: _HarIdTiang,
      _HarIdJtm: _HarIdJtm,
    });
  }
  _takePictureButtonPressed = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ base64: true });
      this.setState({
        photo: photo,
        modalCam: false,
      });
      console.log(this.state.photo.uri);
    }
  };

  render() {
    return (
      <>
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Pemeliharaan</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.setState({ modalCam: true })}
              >
                <Icon name="camera" />
              </Button>
            </Right>
          </Header>
          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalCam}
            >
              <Camera
                ratio={"1:1"}
                style={styles.preview}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.auto}
                ref={(ref) => {
                  this.camera = ref;
                }}
              ></Camera>
              <Button onPress={() => this.setState({ modalCam: false })}>
                <Text>Back</Text>
              </Button>
              <Button onPress={() => this._takePictureButtonPressed()}>
                <Text>Capture</Text>
              </Button>
            </Modal>
          </View>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>JTM/Penyulang:</Label>
                <Input value={this.state.selectedJtm} disabled />
              </Item>

              <Item stackedLabel>
                <Label>Tiang:</Label>
                <Input value={this.state.selectedTiang} disabled />
              </Item>

              <Item stackedLabel>
                <Label>Penunjuk Lokasi:</Label>
                <Input value={this.state.selectedTiang} disabled />
              </Item>

              <Item stackedLabel>
                <Label>Deskripsi Temuan:</Label>
                <Input value={this.state.selectedTiang} />
              </Item>

              <Item stackedLabel>
                <Label>Kondisi:</Label>
                <Input value={this.state.selectedTiang} />
              </Item>

              {/* 
      <Image
        source={{
          uri: this.state.photo.base64,
        }}
        style={{ height: 200, width: 200 }}
      /> */}

              {/*
      <Thumbnail
        large
        square
        source={require("../../../../../assets/iconApp.png")}
      /> */}
            </Form>
          </Content>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  isicallout: {
    fontSize: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  preview: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
