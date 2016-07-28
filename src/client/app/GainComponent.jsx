import React from 'react';
import ReactDOM from 'react-dom';

import {DataService} from "./DataService.js";

export class GainComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {};
        this.startHandler = (event) => this.gainStartHandler(event);
        this.endHandler = (event) => this.gainEndHandler(event);
    }

    componentDidMount() {
        this.setState({
            gain: this.props.gain
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gain: nextProps.gain
        });
    }

    allowAdjust(gain) {
        if (this.props.type === 'increase') {
            return (gain < 68);
        } else {
            return (gain > 0);
        }
    }

    adjustGain() {
        if (this.allowAdjust(this.state.gain)) {
            let gain;
            if (this.props.type === 'increase') {
                gain = this.state.gain + 1;
            } else {
                gain = this.state.gain - 1;
            }
            this.dataService.save('PGNS', gain, this.props.channel, response => {});
        }
    }

    gainStartHandler(e) {
        if (e.type === 'touchstart') {
            e.stopPropagation();
            e.preventDefault();
        }
        this.timerStarted = new Date().getTime();
        if (this.timer) {
            this.cancelGainHold();
        }
        this.timer = setInterval(() => {
            this.adjustGain();
        }, 250);

        let eventName = 'mouseup';
        if (e.type !== 'mousedown') {
            eventName = 'touchend';
        }
        window.addEventListener(eventName, this.endHandler);
    }

    gainEndHandler(e) {
        this.cancelGainHold();

        if (ReactDOM.findDOMNode(this.refs.gainControl).contains(e.target)) {
            let now = (new Date()).getTime();
            if ((now - this.timerStarted) < 500) {
                if (e.type !== 'touchcancel')
                    this.adjustGain();
            }
        }
    }

    cancelGainHold() {
        clearInterval(this.timer);
        window.removeEventListener('mouseup', this.endHandler);
        window.removeEventListener('touchend', this.endHandler);
        this.timer = null;
    }

    render() {
        let gain = this.state.gain || this.props.gain;

        let className = this.props.type;
        if (!this.allowAdjust(gain)) {
            className += ' disabled';
        }
        return <div ref="gainControl"
            className={className}
            onMouseDown={this.startHandler}
            onTouchStart={this.startHandler}
            onTouchCancel={this.endHandler}>
        </div>;
    }
}