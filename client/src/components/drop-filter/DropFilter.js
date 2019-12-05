import React, {Component} from 'react';
import {Select, Label, Button, Segment} from 'semantic-ui-react';
import DatePicker from '../date-picker';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

 class DropFilter extends Component {

    state = {
        isSelectChanged: false
    }

    componentDidMount() {
        if (!this.props.date && this.props.onUpdate) {
            return new Promise(resolve => resolve()).then(() => this.props.onUpdate(this.props.rank));
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rank !== this.props.rank || prevProps.value !== this.props.value) {
            if (!this.props.date && this.props.onUpdate) {
                this.props.onUpdate(this.props.rank);
            }
        }
    }

    onSelectChangeHandler = (event, {value}) => {
        this.setState({isSelectChanged: !this.state.isSelectChanged}, () => this.props.onChange(event, {value}));
    }

    render () {
        return (
            <Segment compact className={styles.dropFilter}>
                <Label attached='top left'>{this.props.description}</Label>
                {this.props.date ?
                    <DatePicker 
                        {...this.props}
                        mobile={this.props.mobile}
                        onChange={this.props.onChange}
                    />
                :
                    <Select 
                        {...this.props}
                        options={this.props.options ? this.props.options.map(opt => {
                            return {key: opt, text: opt, value: opt};
                        }) : []}
                        onChange={this.onSelectChangeHandler}
                    />
                }
                <Button 
                    id={this.props.id}
                    basic 
                    circular 
                    icon='close' 
                    onClick={this.props.onClose}
                />
            </Segment>
        );
    }
}

DropFilter.propTypes = {
    mobile: PropTypes.bool,
    loading: PropTypes.bool,
    date: PropTypes.bool,
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    rank: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default DropFilter;