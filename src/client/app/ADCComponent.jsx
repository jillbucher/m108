import React from 'react';
import ReactDOM from 'react-dom';

import {DropdownComponent} from "./DropdownComponent.jsx";

export class ADCComponent extends React.Component {

    getSampleRateOptions() {
        return [
            {value: 0, label: 'Off'},
            {value: 1, label: '44.1kHz'},
            {value: 2, label: '48kHz'},
            {value: 3, label: '88.2kHz'},
            {value: 4, label: '96kHz'},
            {value: 5, label: '176.4kHz'},
            {value: 6, label: '19kHz'},
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

    componentDidMount() {
        this.setWidths();
        window.addEventListener('resize', this.setWidths.bind(this));
    }

    componentDidUnmount() {
        window.removeEventListener('resize', this.setWidths.bind(this));
    }

    setWidths() {
        let adc = ReactDOM.findDOMNode(this.refs.adc);
        let width = (parseInt(window.getComputedStyle(adc.parentNode).getPropertyValue('width'), 10) / 8 * 6) - 8;
        adc.style.width = width + 'px';
    }

    render() {
        return <div className="adc" ref="adc">
            <label className="control">ADC</label>
            <div className="control">
                <div className="control-inner">
                    <label>Sample Rate</label>
                    <DropdownComponent name="ADFS" options={this.getSampleRateOptions()} selected={this.props.adc.fs} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Source</label>
                    <DropdownComponent name="ADCK" options={this.getClockSourceOptions()} selected={this.props.adc.clkout} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Output Format</label>
                    <DropdownComponent name="ADTX" options={this.getOutputFormatOptions()} selected={this.props.adc.fmt} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Out Source</label>
                    <DropdownComponent name="ADOC" options={this.getClockOutSourceOptions()} selected={this.props.adc.clkout} />
                </div>
            </div>
            <div className="control">
                <div className="control-inner">
                    <label>Clock Status</label>
                    <div className={'value ' + this.props.adc.clksts}>{this.props.adc.clksts}</div>
                </div>
            </div>
        </div>;
    }
}