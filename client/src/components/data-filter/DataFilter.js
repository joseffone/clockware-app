import React, {Component} from 'react';
import {Select, Label, Button, Segment} from 'semantic-ui-react';
import DatePicker from '../date-picker';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

 class DataFilter extends Component {

    componentDidMount () {
        if (!this.props.date && this.props.mounted) {
            return new Promise(handle => handle()).then(() => this.props.mounted());
        }
    }

    render () {
        return (
            <Segment compact className={styles.dataFilter}>
                <Label attached='top left'>{this.props.description}</Label>
                {this.props.date ?
                    <DatePicker 
                        {...this.props}
                        mobile={this.props.mobile}
                        changed={this.props.changed}
                    />
                :
                    <Select 
                        {...this.props}
                        options={this.props.options ? this.props.options.map(opt => {
                            return {key: opt, text: opt, value: opt};
                        }) : []}
                        onChange={this.props.changed}
                    />
                }
                <Button 
                    id={this.props.id}
                    basic 
                    circular 
                    icon='close' 
                    onClick={this.props.closed}
                />
            </Segment>
        );
    }
}

DataFilter.propTypes = {
    mobile: PropTypes.bool,
    date: PropTypes.bool,
    loading: PropTypes.bool,
    changed: PropTypes.func,
    closed: PropTypes.func,
    mounted: PropTypes.func,
    options: PropTypes.array,
    description: PropTypes.string
};

export default DataFilter;