import React from 'react';
import ReactDOM from 'react-dom';

import {DataService} from "./DataService.js";

export class InlineEditorComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {
            editing: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let input = ReactDOM.findDOMNode(this.refs.input);
        if (this.state.editing && !prevState.editing) {
            input.focus();
        }
    }

    edit() {
        this.setState({
            editing: true,
            value: this.props.value
        });
    }

    save() {
        let input = ReactDOM.findDOMNode(this.refs.input);
        this.setState({
            editing: false
        });
        this.props.value = input.value;
        let value = input.value;
        if (this.props.type === 'gain') {
            value = parseInt(value, 10);
            if (value === -6) {
                value = 0;
            } else {
                value = parseInt(input.value, 10) - 1;
            }
        }
        this.dataService.save(
            this.props.name,
            value,
            this.props.channel,
            response => {});
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.save();
        } else if (this.props.type === 'name') {
            //Allow a-zA-Z0-9-_
            if ((event.keyCode > 57 && event.keyCode < 65)
                || (event.keyCode > 90 && event.keyCode < 96)
                || (event.keyCode > 105 && event.keyCode !== 189 && event.keyCode !== 109)
                || event.keyCode === 32
            ) {
                event.preventDefault();
            } else if (event.keyCode >= 48 && event.keyCode <= 57 && event.shiftKey) {
                event.preventDefault();
            }
        } else if (this.props.type === 'gain') {
            if (
                    (event.keyCode > 57 && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 189 && event.keyCode !== 109)
                    || event.shiftKey
                ) {
                event.preventDefault();
            } else if (event.keyCode >= 48) {
                if (parseInt(event.target.value, 10) >= 7) {
                    event.preventDefault();
                } else if (event.target.value === '-' && event.keyCode !== 54 && event.keyCode !== 102) {
                    event.preventDefault();
                } else if (event.target.value.length === 0 && (event.keyCode === 48 || event.keyCode === 96)) {
                    event.preventDefault();
                }
            }
        }
    }

    handleBlur() {
        this.save();
    }

    render() {
        var value = this.props.value;
        if (this.state.editing) {
            return <span className="inline-edit editing">
                <input
                    type="text"
                    defaultValue={value}
                    maxLength={this.props.maxLength}
                    onKeyDown={event => this.handleKeyDown(event)}
                    onBlur={this.handleBlur.bind(this)}
                    ref="input" />
            </span>;
        } else {
            return <span className="inline-edit" onClick={this.edit.bind(this)}>
                {value}
            </span>;
        }
    }
}