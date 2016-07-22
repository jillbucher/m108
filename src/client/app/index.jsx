import React from 'react';
import {render} from 'react-dom';

import {DataService} from "./DataService.js";
import {HeaderComponent} from "./HeaderComponent.jsx";
import {ChannelComponent} from "./ChannelComponent.jsx";
import {ADCComponent} from "./ADCComponent.jsx";
import {StatusComponent} from "./StatusComponent.jsx";

class App extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.fetch();
        this.timer = setInterval(this.fetch.bind(this), 500);
    }

    componentDidUnmount() {
        clearInterval(this.timer);
    }

    fetch() {
        this.dataService.getStatus(response => {
            this.setState({
                data: response
            });
        });
    }

    render() {
        let body;
        if (this.state.data) {
            let channelComponents = this.state.data.channels.map(channel => {
                return <ChannelComponent key={channel.id} channel={channel} />;
            });
            body = (
                <div>
                    <div className="channels">{channelComponents}</div>
                    <ADCComponent adc={this.state.data.adc} />
                    <StatusComponent sys={this.state.data.sys} />
                </div>
            );
        } else {
            body = 'Loading';
        }
        return <div className="preamp">
            <HeaderComponent />
            {body}
        </div>;
    }
}

render(<App/>, document.getElementById('app'));
