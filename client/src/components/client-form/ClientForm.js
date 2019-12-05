import React, {Component} from 'react';
import {Modal, Grid, Form, Button, Message, Icon, Card, Image, Rating, Label} from 'semantic-ui-react';
import InputField from '../input-field';
import ConfirmAction from '../confirm-action';
import {connect} from 'react-redux';
import {clientActionCreator} from '../../store/actions';
import {getUniqueKeyValues, rewriteObjectProps} from '../../util';
import img from '../../images/secret-agent-icon.jpg';
import styles from './styles.module.css';
import moment from 'moment';
import PropTypes from 'prop-types';

class ClientForm extends Component {

    state = {
        isModalOpen: false,
        isFormSubmited: false,
        isFormDataValid: true,
        reservationData: {}
    }

    componentDidMount() {
        this.setState({
            reservationData: rewriteObjectProps(this.state.reservationData, {
                clock_id: this.props.forms.clientStartForm.clock_id.value,
                city_id: this.props.forms.clientStartForm.city_id.value,
                agent_id: this.props.id,
                start_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm').utc(),
                expiration_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm')
                    .add(this.props.models.clocks.items.find(({id}) => id === this.props.forms.clientStartForm.clock_id.value).hours_of_repair, 'h')
                    .utc(),
                note: 'created by client'
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reloadDataTrigger === true && this.props.reloadDataTrigger === false) {
            this.setState({
                reservationData: rewriteObjectProps(this.state.reservationData, {
                    clock_id: this.props.forms.clientStartForm.clock_id.value,
                    city_id: this.props.forms.clientStartForm.city_id.value,
                    start_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm').utc(),
                    expiration_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm')
                        .add(this.props.models.clocks.items.find(({id}) => id === this.props.forms.clientStartForm.clock_id.value).hours_of_repair, 'h')
                        .utc()
                })
            });
        }
    }

    onTriggerClickHandler = () => {
        this.setState({
            isModalOpen: true,
            isFormSubmited: false,
            isFormDataValid: true,
        });
    }

    onCloseButtonClickHandler = () => {
        this.setState({isModalOpen: false}, () => {
            this.props.resetFormFields('clientOrderForm');
            if (this.props.reservation || this.props.error.createError) {
                this.props.setReloadDataTrigger(true);
                this.props.resetReservingResults();
            }
        });
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            this.setState({
                reservationData: rewriteObjectProps(this.state.reservationData, {
                    email: this.props.forms.clientOrderForm.email.value,
                    first_name: this.props.forms.clientOrderForm.first_name.value,
                    last_name: this.props.forms.clientOrderForm.last_name.value
                })
            }, () => this.props.createReservation(this.state.reservationData));
        }
    }

    render() {
        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;
        let agentDataItem = this.props.dataSet.find(({id}) => id === this.props.id);
        let startDate = moment(this.state.reservationData.start_date).format('DD-MM-YYYY HH:mm');
        let expDate = moment(this.state.reservationData.expiration_date).format('DD-MM-YYYY HH:mm');
        let errorMessage = 'Something went wrong while reserving. Try to make request again or visit these resource later.';

        for (const key in this.props.forms.clientOrderForm) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms.clientOrderForm[key]
            });
            isFormDataValid = isFormDataValid && this.props.forms.clientOrderForm[key].isValid;
        }

        if (this.props.error.createError) {
            if (this.props.error.createError.response.status === 404 && this.props.error.createError.response.data.error) {
                errorMessage = this.props.error.createError.response.data.error.message;
            }
        }

        return (
            <React.Fragment>
                <Modal
                    className={styles.clientForm}
                    trigger={
                        <Trigger 
                            onClick={this.onTriggerClickHandler} 
                        />
                    }
                    size={'small'}
                    open={this.state.isModalOpen}
                >
                    <Modal.Header>
                        <Icon name='handshake outline' />
                        Watchmaker reserving
                    </Modal.Header>
                    <Modal.Content>
                        <Grid
                            stackable
                            columns={2}
                        >
                            <Grid.Column>
                                <Card 
                                    fluid
                                >
                                    <Image 
                                        src={img} 
                                        wrapped 
                                        ui={false} 
                                    />
                                    <Card.Content>
                                        <Card.Header>
                                            {`${agentDataItem.first_name} ${agentDataItem.last_name}`}
                                        </Card.Header>
                                        <Card.Meta>
                                            <Rating 
                                                rating={agentDataItem.rating_value} 
                                                maxRating={
                                                    Math.max(
                                                        ...getUniqueKeyValues(
                                                            this.props.models.marks.items.filter(({deleted_at}) => deleted_at === null),
                                                            'mark_value'
                                                        )
                                                    )
                                                } 
                                                disabled 
                                            />
                                        </Card.Meta>
                                        <Card.Description>
                                            Period of reservation:
                                            <div>{`${startDate} / ${expDate}`}</div>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content 
                                        extra
                                    >
                                        {agentDataItem.cities.map(city => <Label>{city}</Label>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Form>
                                    <Message
                                        positive
                                        hidden={this.props.reservation === null}
                                        header='Reserving succeed!'
                                        content='Reservation was created successfully!'
                                    />
                                    <Message
                                        negative
                                        hidden={this.props.error.createError === null}
                                        header='Reserving failed!'
                                        content={errorMessage}
                                    />
                                    {formFieldsArray.map(formField => {
                                        return (
                                            <Form.Field
                                                error={!formField.isValid && formField.touched}
                                                onChange={() => this.setState({isFormDataValid: true, isFormSubmited: false})}
                                            >
                                                <label>{formField.config.label}</label> 
                                                <InputField 
                                                    key={formField.key}
                                                    mobile={this.props.global.ui.mobile}
                                                    elementType={formField.elementType}
                                                    inputType={formField.config.type}
                                                    icon={formField.config.icon}
                                                    iconPosition={formField.config.iconPosition}
                                                    placeholder={formField.config.placeholder}
                                                    value={formField.value}
                                                    onChange={(event, {value}) => this.props.changeFormFieldValue(event, 'clientOrderForm', formField.key, {value})}
                                                />
                                            </Form.Field>
                                        );
                                    })}
                                    <Form.Field>
                                        <Button
                                            fluid
                                            positive
                                            onClick={() => this.setState({isFormSubmited: true, isFormDataValid})}
                                        >
                                            <Icon name='checkmark' />
                                            Create reservation
                                        </Button>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button
                                            fluid
                                            onClick={this.onCloseButtonClickHandler}
                                        >
                                            <Icon name='close' />
                                            Close
                                        </Button>
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                </Modal>
                <ConfirmAction
                    open={this.state.isFormSubmited && this.state.isFormDataValid}
                    error={this.props.error.createError}
                    acting={this.props.loading.isCreating}
                    loaderText='Creating reservation...'
                    message={{
                        initial: {
                            header: 'Reserving confirmation',
                            content: 'You are going to create reservation. Do you confirm this action?'
                        },
                        success: {
                            header: 'Reserving succeed',
                            content: 'Reservation was created successfully!'
                        },
                        failure: [
                            {
                                errCode: 'default',
                                header: 'Reserving failed',
                                content: 'Something went wrong while creating data. The action cannot be completed successfully.'
                            }
                        ]
                    }}
                    onCancel={() => this.setState({isFormSubmited: false})}
                    onConfirm={this.onFormSubmitHandler}
                    onCommit={() => this.setState({isFormSubmited: false})}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        forms: state.client.forms,
        loading: state.client.data.loading,
        error: state.client.data.error,
        reservation: state.client.data.reservation,
        dataSet: state.client.list.dataSet,
        models: state.admin.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetFormFields: (formKey) => dispatch(clientActionCreator.resetFormFields(formKey)),
        changeFormFieldValue: (event, formKey, formFieldKey, {value}, touched) => dispatch(clientActionCreator.changeFormFieldValue(event, formKey, formFieldKey, value, touched)),
        setReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag)),
        createReservation: (reservationData) => dispatch(clientActionCreator.createReservationRequest(reservationData)),
        resetReservingResults: () => dispatch(clientActionCreator.resetReservingResults())
    };
};

ClientForm.propTypes = {
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]).isRequired,
    id: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);