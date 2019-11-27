import React, {Component} from 'react';
import {List, Checkbox, Rating} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class CheckFilter extends Component {


    render() {
        let filters = [];
        let {filterKey, checkedOptions, options, showAsRating, changed} = this.props;

        options.sort((a, b) => b - a).forEach((option, index) => {
            filters.push(
                <List.Item
                    key={index}
                >
                    <Checkbox 
                        as={List.Content} 
                        id={option}
                        checked={checkedOptions.includes(option)}
                        label={
                            <label>
                                {showAsRating ?
                                    <Rating 
                                        rating={option} 
                                        maxRating={showAsRating.maxRating} 
                                        disabled 
                                    />
                                : option}
                            </label>
                        }
                        onChange={(event, {checked}) => changed(filterKey, checked, event.target.id)}
                    />
              </List.Item>
            );
        });

        filters.unshift(
            <List.Item
                key={filters.length}
            >
                <Checkbox 
                    as={List.Content}
                    checked={checkedOptions.length === options.length}
                    label={<label><b>All</b></label>}
                    onChange={(event, {checked}) => changed(filterKey, checked)}
                />
        </List.Item>
        );

        return (
            <List
                className={styles.checkFilter}
                verticalAlign='middle'
                selection
            >
                {filters}
            </List>
        );
    }
}

CheckFilter.propTypes = {
    filterKey: PropTypes.string.isRequired,
    showAsRating: PropTypes.shape({
        maxRating: PropTypes.number.isRequired
    }).isRequired,
    checkedOptions: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    changed: PropTypes.func.isRequired
};

export default CheckFilter;