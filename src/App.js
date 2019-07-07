import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'
import './App.css';
import ModalContainer from './pages/containers/modalContainer';
import Modal from './pages/components/modal';

class App extends Component {
  constructor(props) {
    super(props);

    let like = null;
    if (localStorage.getItem("liked") === "true") {
      like = true;
    } else {
      like = false;
    }
    this.state = {
      liked: like,
      showModal: false
    };
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  likeHandler = (e) => {
    if (this.state.liked) {
      localStorage.setItem("liked", false)
      this.setState({
        liked: false
      })
    } else {
      localStorage.setItem("liked", true)
      this.setState({
        liked: true
      })
    }
  }
  changeHandler = (e) => {
    const value = e.target.value.replace(/\./g, "");
    let pricem2 = this.formatNumber(parseInt(value / 380, 10))
    if (pricem2 !== "NaN") {
      document.getElementById("pricem2").innerHTML = pricem2;
    }
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }
  handleOpenModal = e => {
    e.stopPropagation();
    this.setState({
      showModal: true
    })
  }
  render() {
    let liked = null;
    if (this.state.liked) {
      liked = <span onClick={this.likeHandler} className="like red"><i className="fas fa-heart fa-2x"></i></span>
    } else {
      liked = <span onClick={this.likeHandler} className="like black"><i className="fas fa-heart fa-2x"></i></span>
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Ejercicio Navent - Josefina</h2>
        </div>

        <div className="container">
          <div className="multimedia">
            <img src="https://imgar.zonapropcdn.com/avisos/1/00/44/82/57/21/360x266/1698490754.jpg" alt="" />
            {liked}
            <div className="label">Super Destacado</div>
          </div>

          <div className="bio">
            <div className="info">
              <p className="blue">Lorem Ipsum es simplemente el texto de relleno de las imprentas </p>
              <p> <i className="fas fa-map-marker-alt"></i> Juan Francisco Seguí 3900 ,Palermo Chico</p>
              <p> Lorem ipsum dolor sit amet consectetur adipiscing elit faucibus fermentum sodales euismod ac, leo penatibus eu diam duis lobortis aliquet elementum lacus eros felis. Velit risus nullam curabitur egestas mollis torquent natoque porttitor venenatis penatibus quisque</p>
            </div>
            <div className="data">
              <div className="profit" >
                <span className="currency">U$S</span>
                <ContentEditable
                  html="1.400.000"
                  className="content-editable"
                  onChange={this.changeHandler}
                />
                <span className="blue">$/m </span><span className="blue" id="pricem2">3.684</span>
              </div>
            </div>
            <div className="additional">
              <span>380 m2 3 Dormitorios 2 Baños 2 Cocheras</span>
            </div>
            <div className="contact">
              <span className="blue" onClick={this.handleOpenModal}>Contacto</span>
            </div>
          </div>
        </div>
        {
          this.state.showModal &&
          <ModalContainer>
            <Modal handleCloseModal={this.handleCloseModal} />
          </ModalContainer>
        }
      </div>
    );
  }
}

export default App;