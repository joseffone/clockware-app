import React, {Component} from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import StartForm from '../start-form';
import CheckFilter from '../check-filter';
import {connect} from 'react-redux';
import {clientActionCreator} from '../../store/actions';
import styles from './styles.module.css';

class ClientActionMenu extends Component {

    state = {
        activeIndexes: [0, 1, 2, 3]
    }

    onTitleClickHandler = (event, {index}) => {
        const {activeIndexes} = this.state;
        if (activeIndexes.includes(index)) {
            let elemIndex = activeIndexes.findIndex(elem => elem === index);
            return this.setState({
                activeIndexes: [].concat(
                    activeIndexes.slice(0, elemIndex), 
                    activeIndexes.slice(elemIndex + 1, activeIndexes.length)
                )
            });
        }
        return this.setState({
            activeIndexes: activeIndexes.concat(index)
        });
    }

    getFilterParam = (filterKey, paramKey) => {
        return this.props.client.list.params.filters
            .find(filter => Object.keys(filter)[0] === filterKey)[filterKey][paramKey] || [];
    }

    render() {
        const {activeIndexes} = this.state;

        return (
            <Accordion 
                className={styles.clientActionMenu}
                fluid 
                styled
            >
                <Accordion.Title
                    index={0}
                    active={activeIndexes.includes(0)}
                    onClick={this.onTitleClickHandler}
                >
                    <Icon name='dropdown' />
                    Search parameters
                </Accordion.Title>
                <Accordion.Content
                    active={activeIndexes.includes(0)}
                >
                    <StartForm sidebarView />
                </Accordion.Content>
                <Accordion.Title
                    index={1}
                    active={activeIndexes.includes(1)}
                    onClick={this.onTitleClickHandler}
                >
                    <Icon name='dropdown' />
                    Filters
                </Accordion.Title>
                <Accordion.Content
                    active={activeIndexes.includes(1)}
                >
                    <Accordion.Title
                        index={2}
                        active={activeIndexes.includes(2)}
                        onClick={this.onTitleClickHandler}
                    >
                        <Icon name='dropdown' />
                        Rating
                    </Accordion.Title>
                    <Accordion.Content
                        active={activeIndexes.includes(2)}
                    >
                        <CheckFilter
                            filterKey={'rating'}
                            showAsRating={{maxRating: 5}}
                            checkedOptions={this.getFilterParam('rating', 'target')}
                            options={this.getFilterParam('rating', 'options')}
                            changed={this.props.changeFilterTarget}
                        />
                    </Accordion.Content>
                    <Accordion.Title
                        index={3}
                        active={activeIndexes.includes(3)}
                        onClick={this.onTitleClickHandler}
                    >
                        <Icon name='dropdown' />
                        Cities
                    </Accordion.Title>
                    <Accordion.Content
                        active={activeIndexes.includes(3)}
                    >
                        <CheckFilter
                            filterKey={'cities'}
                            checkedOptions={this.getFilterParam('cities', 'target')}
                            options={this.getFilterParam('cities', 'options')}
                            changed={this.props.changeFilterTarget}
                        />
                    </Accordion.Content>
                </Accordion.Content>
            </Accordion>
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.client
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeFilterTarget: (filterKey, checked, id) => dispatch(clientActionCreator.changeFilterTarget(filterKey, checked, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientActionMenu);