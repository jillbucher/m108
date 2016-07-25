import React from 'react';
import ReactDOM from 'react-dom';

import {DropdownComponent} from "./DropdownComponent.jsx";
import {DataService} from "./DataService.js";

export class ADCComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            adc: this.props.add
        });
        this.setWidths();
        window.addEventListener('resize', this.setWidths.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            adc: nextProps.adc
        });
    }

    componentDidUnmount() {
        window.removeEventListener('resize', this.setWidths.bind(this));
    }

    getSampleRateOptions() {
        return [
            {value: 0, label: 'Off'},
            {value: 1, label: '44.1kHz'},
            {value: 2, label: '48kHz'},
            {value: 3, label: '88.2kHz'},
            {value: 4, label: '96kHz'},
            {value: 5, label: '176.4kHz'},
            {value: 6, label: '192kHz'},
            {value: 7, label: 'USB'},
            {value: 8, label: 'DANTE'}
        ];
    }

    getClockSourceOptions() {
        return [
            {value: 0, label: 'Internal'},
            {value: 1, label: 'Word'},
            {value: 2, label: 'Word-75'},
            {value: 3, label: 'DANTE'}
        ];
    }

    getClockOutSourceOptions() {
        return [
            {value: 0, label: 'Internal'},
            {value: 1, label: 'External'}
        ];
    }

    getOutputFormatOptions() {
        return [
            {value: 0, label: 'Consumer'},
            {value: 1, label: 'Professional'}
        ];
    }

    setWidths() {
        let adc = ReactDOM.findDOMNode(this.refs.adc);
        let width = (parseInt(window.getComputedStyle(adc.parentNode).getPropertyValue('width'), 10) / 8 * 6) - 8;
        adc.style.width = width + 'px';
    }

    render() {
        let adc = this.state.adc || this.props.adc;

        return <div className="adc" ref="adc">
            <label className="control">ADC</label>
            <div className="control">
                <div className="control-inner">
                    <label>Sample Rate</label>
                    <DropdownComponent name="ADFS" options={this.getSampleRateOptions()} selected={adc.fs} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Source</label>
                    <DropdownComponent name="ADCK" options={this.getClockSourceOptions()} selected={adc.clksrc} />
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