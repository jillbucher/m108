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
        this.dataService.save(
            this.props.name,
            this.props.value,
            this.props.channel,
            response => {
                console.log('saved', response);
            });
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.save();
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