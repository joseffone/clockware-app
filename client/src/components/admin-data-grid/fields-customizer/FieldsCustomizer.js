import React, {Component} from 'react';
import {Modal, Header, Table, Checkbox, Button, Icon} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

 class FieldsCustomizer extends Component {

    state = {
        isModalOpen: false,
        fields: this.props.fields ? this.props.fields.map(({name, alias, visible}) => {
            return {name, alias, visible};
        }) : []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fields !== this.props.fields) {
            this.onFildsResetHandler();
        }
    }

    onFildsResetHandler = () => {
        this.setState({
            fields: this.props.fields ? this.props.fields.map(({name, alias, visible}) => {
                return {name, alias, visible};
            }) : []
        });
    }

    onTriggerClickHandler = () => {
        this.setState({
            isModalOpen: true
        });
    }

    onCancelButtonClickHandler = () => {
        this.setState({
            isModalOpen: false
        }, () => this.onFildsResetHandler());
    }

    onApplyButtonClickHandler = () => {
        this.setState({
            isModalOpen: false
        }, () => this.props.onApply ? this.props.onApply(this.state.fields) : null);
    }

    onCheckboxChangeHandler = (event, {checked, id}) => {
        this.setState({
            fields: this.state.fields.map(({name, alias, visible}) => {
                if (name === id) {
                    return {
                        name,
                        alias,
                        visible: checked
                    };
                }
                return {name, alias, visible};
            })
        });
    }

    onMoveButtonClickHandler = (index, f) => {
        let flag = typeof f !== 'number' || f === 0 ? 1 : f;
        let fields = this.state.fields.slice();
        let nextIndex = flag < 0 ? 
            index === fields.length - 1 ? 0 : index + 1 :
            index === 0 ? fields.length - 1 : index - 1;
        let currentElem = fields[index];
        let nextElem = fields[nextIndex];
        fields[index] = nextElem;
        fields[nextIndex] = currentElem;
        this.setState({fields: fields});
    }

    render () {
        const Trigger = this.props.trigger;
        let bodyRows = this.state.fields.map(({name, alias, visible}, index) => (
            <Table.Row 
                key={name}
            >
                <Table.Cell
                    collapsing
                    textAlign='right'
                    verticalAlign='middle'
                >
                    <Checkbox
                        id={name}
                        checked={visible}
                        onChange={this.onCheckboxChangeHandler}
                    />
                </Table.Cell>
                <Table.Cell>
                    {alias}
                </Table.Cell>
                <Table.Cell
                    collapsing
                    textAlign='right'
                >
                    <Button.Group 
                        icon 
                        vertical={!this.props.mobile}
                    >
                        <Button
                            as='a'
                            basic
                            compact
                            onClick={() => this.onMoveButtonClickHandler(index, 1)}
                        >
                            <Icon name='arrow up' />
                        </Button>
                        <Button
                            as='a'
                            basic
                            compact
                            onClick={() => this.onMoveButtonClickHandler(index, -1)}
                        >
                            <Icon name='arrow down' />
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <Modal
                trigger={
                    <Trigger 
                        className={styles.trigger}
                        onClick={this.onTriggerClickHandler} 
                    />
                }
                size='tiny'
                open={this.state.isModalOpen}
                className={styles.fieldsCustomizer}
            >
                <Header icon='th large' content={`Fields order & visibility`} />
                <Modal.Content>
                    <Table 
                        selectable
                        unstackable
                    >
                        <Table.Body>
                            {bodyRows}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content='Cancel'
                        onClick={this.onCancelButtonClickHandler}
                    />
                    <Button 
                        color='blue'
                        content='Apply'
                        onClick={this.onApplyButtonClickHandler}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

FieldsCustomizer.propTypes = {
    fields: PropTypes.array,
    mobile: PropTypes.bool,
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    onApply: PropTypes.func
};

export default FieldsCustomizer;