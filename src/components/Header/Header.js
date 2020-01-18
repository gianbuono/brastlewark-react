import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return(
            <header className="App-header">
                <a className="logo" href="/"><h1>Brastlewark population</h1></a>
            </header>
        )
    }
}