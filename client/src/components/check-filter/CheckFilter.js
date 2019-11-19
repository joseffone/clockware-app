import React, {Component} from 'react';
import {List, Checkbox, Rating} from 'semantic-ui-react';

class CheckFilter extends Component {



    render() {
        let filters = [];
        if (this.props.options) {
            this.props.options.map((filter, index) => {

            });
        }

        return(
            <List
                verticalAlign='middle'
                selection
            >
                {filters}
            </List>
        );
    }
}

export default CheckFilter;