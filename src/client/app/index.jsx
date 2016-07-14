import React from 'react';
import {render} from 'react-dom';

import {ChannelComponent} from "./ChannelComponent.jsx";

class App extends React.Component {
    render() {
        var channel = [
            {
                id: 1,
                name: 'Channel name',
                peak: false,
                signal: true,
                gain: 20,
                volts: true,
                phase: false,
                ribbon: false
            },
            {
                id: 2,
                name: 'Channel name',
                peak: false,
                signal: false,
                gain: 20,
                volts: true,
                phase: false,
                ribbon: false
            },
            {
                id: 3,
                name: 'Channel name',
                peak: false,
                signal: true,
                gain: 20,
                volts: true,
                phase: false,
                ribbon: false
            },
            {
                id: 4,
                name: 'Channel name',
                peak: false,
                signal: true,
                gain: 20,
                volts: true,
                phase: false,
                ribbon: false
            },
            {
                id: 5,
                name: 'Channel name',
                peak: false,
                signal: true,
                gain: 20,
                volts: false,
                phase: false,
                ribbon: true
            },
            {
                id: 6,
                name: 'Channel name',
                peak: true,
                signal: true,
                gain: 30,
                volts: true,
                phase: true,
                ribbon: true
            },
            {
                id: 7,
                name: 'Channel name',
                peak: true,
                signal: false,
                gain: 20,
                volts: true,
                phase: false,
                ribbon: false
            },
            {
                id: 8,
                name: 'Channel name',
                peak: true,
                signal: true,
                gain: 20,
                volts: false,
                phase: true,
                ribbon: false
            }
        ];
        return <ChannelComponent channel={channel}/>;
    }
}

render(<App/>, document.getElementById('app'));
