import React from 'react';
import ReactDOM from 'react-dom';

import {DropdownComponent} from "./DropdownComponent.jsx";

export class ADCComponent extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            adc: this.props.adc,
            clockSourceOptions: this.props.clockSourceOptions,
            sampleRateOptions: this.props.sampleRateOptions
        });
        this.setWidths();
        window.addEventListener('resize', this.setWidths.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            adc: nextProps.adc,
            clockSourceOptions: nextProps.clockSourceOptions,
            sampleRateOptions: nextProps.sampleRateOptions
        });
    }

    componentDidUnmount() {
        window.removeEventListener('resize', this.setWidths.bind(this));
    }

    getClockOutSourceOptions() {
        return [
            {value: 0, text: 'Internal'},
            {value: 1, text: 'External'}
        ];
    }

    getOutputFormatOptions() {
        return [
            {value: 0, text: 'Consumer'},
            {value: 1, text: 'Professional'}
        ];
    }

    setWidths() {
        let adc = ReactDOM.findDOMNode(this.refs.adc);
        let width = (parseInt(window.getComputedStyle(adc.parentNode).getPropertyValue('width'), 10) / 8 * 6) - 8;
        adc.style.width = width + 'px';
    }

    render() {
        let adc = this.state.adc || this.props.adc;
        let sampleRateOptions = this.state.sampleRateOptions || this.props.sampleRateOptions;
        let clockSourceOptions = this.state.clockSourceOptions || this.props.clockSourceOptions;

        return <div className="adc" ref="adc">
            <label className="control">ADC</label>
            <div className="control">
                <div className="control-inner">
                    <label>Sample Rate</label>
                    <DropdownComponent name="ADFS" options={sampleRateOptions} selected={adc.fs} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Source</label>
                    <DropdownComponent name="ADCK" options={clockSourceOptions} selected={adc.clksrc} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Output Format</label>
                    <DropdownComponent name="ADTX" options={this.getOutputFormatOptions()} selected={adc.fmt} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Out Source</label>
                    <DropdownComponent name="ADOC" options={this.getClockOutSourceOptions()} selected={adc.clkout} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Status</label>
                    <div className={'value ' + adc.clksts}>{adc.clksts}</div>
                </div>
            </div>
        </div>;
    }
}