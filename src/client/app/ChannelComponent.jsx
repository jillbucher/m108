import React from 'react';

export class ChannelComponent extends React.Component {

    render() {
        var channel = this.props.channel;
        console.log(channel);
        return (
            <div className="channel">
                <div className="channel-info">
                    <span className="id">{channel.id}</span>
                    <span className="name">{channel.name}</span>
                </div>
                <div className="indicators">
                    <div className="indicator peak">
                        <span className={'indicator-button' + (channel.peak ? ' on' : '')}></span>
                        PEAK
                    </div>
                    <div className="indicator">
                        <span className={'indicator-button' + (channel.signal ? ' on' : '')}></span>
                        SIGNAL
                    </div>
                </div>
                <div className="gain">
                    <div className="input">
                        <label>GAIN</label>
                        <span>{channel.gain}</span>
                    </div>
                    <div className="controls">
                        <div className="increase"></div>
                        <div className="decrease"></div>
                    </div>
                </div>
                <div className="actions">
                    <a className={'volts' + (channel.volts ? ' on' : '')}>48v</a>
                    <a className={'phase' + (channel.phase ? ' on' : '')}>&#248;</a>
                    <a className={'ribbon' + (channel.ribbon ? ' on' : '')}>RBN</a>
                </div>
            </div>
        );
    }
}