import React from 'react';

export class HeaderComponent extends React.Component {

    render() {
        return <header>
            <span className="title">m108 Microphone Preamplifier / ADC</span>
            <img src="public/images/graceLogo.jpg" className="logo" />
            <span className="company">Grace Design, Lyons, CO USA</span>
        </header>;
    }
}