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
            data: null,
            online: true,
            sampleRateOptions: [],
            clockSourceOptions: []
        };
    }

    componentDidMount() {
        this.fetchADCSettings();
        this.fetch();
        this.timer = setInterval(this.fetch.bind(this), 250);
    }

    componentDidUnmount() {
        clearInterval(this.timer);
    }

    fetch() {
        this.dataService.getStatus(
            response => {
                this.setState({
                    data: response,
                    online: true
                });
            },
            () => {
                this.setState({
                    data: this.state.data,
                    online: false
                });
            });
    }

    fetchADCSettings() {
        this.dataService.getHardwareADCSettings(
            adcResponse => {
                this.setState({
                    sampleRateOptions: adcResponse.adfs,
                    clockSourceOptions: adcResponse.adck
                });
            },
            () => {
                this.setState({
                    sampleRateOptions: [],
                    clockSourceOptions: []
                })
            }
        );
    }

    render() {
        let body;
        if (this.state.data && this.state.clockSourceOptions && this.state.sampleRateOptions) {
            let channelComponents = this.state.data.channels.map(channel => {
                return <ChannelComponent key={channel.id} channel={channel} />;
            });
            body = (
                <div>
                    <div className="channels">{channelComponents}</div>
                    <ADCComponent adc={this.state.data.adc} clockSourceOptions={this.state.clockSourceOptions} sampleRateOptions={this.state.sampleRateOptions} />
                    <StatusComponent sys={this.state.data.sys} online={this.state.online} />
                </div>
            );
        } else {
            body = <div className="loading">Loading...</div>;
        }
        return <div className="preamp">
            <HeaderComponent />
            {body}
        </div>;
    }
}

render(<App/>, document.getElementById('app'));
