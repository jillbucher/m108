import React from 'react';
import ReactDOM from 'react-dom';

import {InlineEditorComponent} from "./InlineEditorComponent.jsx";
import {GainComponent} from "./GainComponent.jsx";
import {DataService} from "./DataService.js";

export class ChannelComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            channel: this.props.channel
        });
        this.setWidths();
        window.addEventListener('resize', this.setWidths.bind(this));
    }

    componentDidUnmount() {
        window.removeEventListener('resize', this.setWidths.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            channel: nextProps.channel
        });
    }

    toggleValue(name, channel) {
        this.saveValue(name, null, channel);
    }

    saveValue(name, value, channel) {
        this.dataService.save(name, value, channel, response => {});
    }

    clearPeak() {
        this.toggleValue('DOVC', this.state.channel.no);
    }

    setWidths() {
        let name = ReactDOM.findDOMNode(this.refs.name),
            id = ReactDOM.findDOMNode(this.refs.id),
            channel = ReactDOM.findDOMNode(this.refs.channel),
            channelWrapper = ReactDOM.findDOMNode(this.refs.channelWrapper);

        channel.style.display = 'none';
        channel.style.width = (parseInt(window.getComputedStyle(channelWrapper).getPropertyValue('width'), 10) - 28) + 'px';
        channel.style.display = 'block';

        let nameWidth = parseInt(window.getComputedStyle(channel).getPropertyValue('width'), 10)
                        - parseInt(window.getComputedStyle(id).getPropertyValue('width'), 10) - 9;
        name.style.width = `${nameWidth}px`;
    }

    getGainDisplayValue(gain) {
        if (gain === 0) {
            return -6;
        } else {
            return (gain + 1);
        }
    }

    render() {
        let channel = this.state.channel || this.props.channel;

        return (
            <div className="channel-wrapper" ref="channelWrapper">
                <div className="channel" ref="channel">
                    <div className="channel-info">
                        <span className="id" ref="id">{channel.id}</span>
                        <div className="name" ref="name">
                            <InlineEditorComponent type="name" value={channel.name} name="NMCH" channel={channel.no} maxLength="11" />
                        </div>
                    </div>
                    <div className="indicators">
                        <div className="indicator peak">
                            <span className={'indicator-button ' + channel.over} onClick={channel.over  === 'on' ? this.clearPeak.bind(this) : ''}></span>
                            OVER
                        </div>
                        <div className="indicator">
                            <span className={'indicator-button ' + channel.sig}></span>
                            SIGNAL
                        </div>
                    </div>
                    <div className="gain">
                        <div className="input">
                            <label>GAIN</label>
                            <InlineEditorComponent type="gain" value={this.getGainDisplayValue(channel.gain)} name="PGNS" channel={channel.no} maxLength="2" />
                        </div>
                        <div className="controls">
                            <GainComponent type="increase" gain={channel.gain} channel={channel.no} />
                            <GainComponent type="decrease" gain={channel.gain} channel={channel.no}  />
                        </div>
                    </div>
                    <div className="actions">
                        <a className={'volts ' + (channel['48V']) + (channel['rbbn'] ===  'on' ? ' disabled' : '')} onClick={channel['rbbn'] === 'on' ? '' : this.toggleValue.bind(this, 'P48T', channel.no)}>48v</a>
                        <a className={'phase ' + (channel['phase'])} onClick={this.toggleValue.bind(this, 'PPHT', channel.no)}>&#248;</a>
                        <a className={'ribbon ' + (channel['rbbn'])} onClick={this.toggleValue.bind(this, 'PIPT', channel.no)}>RBN</a>
                    </div>
                </div>
            </div>
        );
    }
}