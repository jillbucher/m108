import React from 'react';
import ReactDOM from 'react-dom';

import {DataService} from "./DataService.js";

export class GainComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {};
        this.handler = (event) => this.gainEndHandler(event);
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
        this.timerStarted = (new Date()).getTime();
        if (this.timer) {
            this.timer = clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            this.adjustGain();
        }, 250);

        let eventName = 'mouseup';
        if (event.type !== 'mousedown') {
            eventName = 'touchend';
        }
        document.body.addEventListener(eventName, this.handler);
    }

    gainEndHandler(e) {
        clearInterval(this.timer);
        document.body.removeEventListener('mouseup', this.handler);
        document.body.removeEventListener('touchend', this.handler);

        if (ReactDOM.findDOMNode(this.refs.gainControl).contains(e.target)) {
            let now = (new Date()).getTime();
            if ((now - this.timerStarted) < 500) {
                if (e.type !== 'touchcancel')
                    this.adjustGain();
            }
        }
        this.timer = null;
    }

    render() {
        let gain = this.state.gain || this.props.gain;
        let touch = false;
        if (!!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0) {
            touch = true;
        }

        let className = this.props.type;
        if (!this.allowAdjust(gain)) {
            className += ' disabled';
        }
        if (touch) {
            return <div ref="gainControl"
                className={className}
                onTouchStart={(e) => {
                    this.gainStartHandler(e);
                }}
                onTouchCancel={(e) => {
                    this.gainEndHandler(e);
                }}>
            </div>;
        } else {
            return <div ref="gainControl"
                className={className}
                onMouseDown={(e) => {
                    this.gainStartHandler(e);
                }}>
            </div>;
        }
    }
}