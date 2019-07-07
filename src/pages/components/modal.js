import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import './modal.css';

export default class modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validEmail: true,
            default: true,
            defaultEmail: "email@email.com"
        }
    }

    sendHandler = () => {
        let valid = null;
        let email = document.getElementsByClassName("email")[0].innerText;
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            valid = true
            email = "";

        } else {
            valid = false;
        }
        this.setState({
            validEmail: valid,
            defaultEmail: email,
            default: false
        })
    }
    render() {
        let html = ""
        if (this.state.validEmail && this.state.default) {
            html = <div><hr className="ruler" /><br /><span className="blue send" onClick={this.sendHandler}>ENVIAR</span></div>
        }
        else if (this.state.validEmail) {
            html = <div><hr className="ruler" /><span className="green">El mensaje se ha enviado correctamente</span><br /><span className="blue send" onClick={this.sendHandler}>ENVIAR</span></div>
        }else {
            html = <div><hr className="ruler red" /><span className="red">Por favor ingrese un email valido</span><br /><span className="blue send" onClick={this.sendHandler}>ENVIAR</span></div>
        }
        return (
            <div className="wrapper">

                <div className="Modal">
                    <span className="Modal-close" onClick={this.props.handleCloseModal} />
                    <h5 className="blue">Para ser contactado por favor ingrese su direccion de correo electronico.</h5>
                    <p>Email:</p>

                    <div>
                        <ContentEditable
                            html={this.state.defaultEmail}
                            className="email"
                        />
                    </div>
                    {html}
                </div>
            </div>
        )
    }
}
