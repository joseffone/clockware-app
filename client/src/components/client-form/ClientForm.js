import React, {Component} from 'react';
import {Modal, Grid, Form, Button, Message, Icon, Card, Image, Rating, Label} from 'semantic-ui-react';
import InputField from '../input-field';
import ConfirmAction from '../confirm-action';
import {connect} from 'react-redux';
import {clientActionCreator} from '../../store/actions';
import {getUniqueKeyValues, rewriteObjectProps} from '../../util';
import messages from '../../util/presets/clientErrorMessages';
import img from '../../images/secret-agent-icon.jpg';
import styles from './styles.module.css';
import moment from 'moment';
import PropTypes from 'prop-types';

class ClientForm extends Component {

    state = {
        isModalOpen: false,
        isConfirmShown: false,
        isFormDataValid: true,
        activeForm: null,
        reservationData: {}
    }

    componentDidMount() {
        this.setState({
            activeForm: this.props.isSignupFormShown ? 'clientSignupForm' : 'clientLoginForm',
            reservationData: rewriteObjectProps(this.state.reservationData, {
                clock_id: this.props.forms.clientStartForm.clock_id.value,
                clock_type: this.props.models.clocks.items.find(({id}) => id === this.props.forms.clientStartForm.clock_id.value).clock_type,
                city_id: this.props.forms.clientStartForm.city_id.value,
                city_name: this.props.models.cities.items.find(({id}) => id === this.props.forms.clientStartForm.city_id.value).city_name,
                agent_id: this.props.id,
                agent_first_name: this.props.dataSet.find(({id}) => id === this.props.id).first_name,
                agent_last_name: this.props.dataSet.find(({id}) => id === this.props.id).last_name,
                start_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm'),
                expiration_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm')
                    .add(this.props.models.clocks.items.find(({id}) => id === this.props.forms.clientStartForm.clock_id.value).hours_of_repair, 'h'),
                note: 'created by client',
                link: this.props.confirmLink
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reloadDataTrigger === true && this.props.reloadDataTrigger === false) {
            this.setState({
                reservationData: rewriteObjectProps(this.state.reservationData, {
                    clock_id: this.props.forms.clientStartForm.clock_id.value,
                    city_id: this.props.forms.clientStartForm.city_id.value,
                    start_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm'),
                    expiration_date: moment(this.props.forms.clientStartForm.start_date.value, 'DD-MM-YYYY HH:mm')
                        .add(this.props.models.clocks.items.find(({id}) => id === this.props.forms.clientStartForm.clock_id.value).hours_of_repair, 'h')
                })
            });
        }
        if (prevProps.isSignupFormShown !== this.props.isSignupFormShown) {
            this.setState({
                activeForm: this.props.isSignupFormShown ? 'clientSignupForm' : 'clientLoginForm',
                isFormDataValid: true,
                isConfirmShown: false
            });
        }
    }

    onTriggerClickHandler = () => {
        this.setState({
            isModalOpen: true
        });
    }

    onCloseButtonClickHandler = () => {
        this.setState({
            isModalOpen: false, 
            isFormDataValid: true, 
            isConfirmShown: false
        }, () => {
            this.props.resetFormFields(this.state.activeForm);
            if (this.props.reservation.length > 0 || this.props.error.createError) {
                this.props.setReloadDataTrigger(true);
                this.props.resetReservingResults();
            }
        });
    }

    onToggleActiveFormButtonClickHandler = () => {
        this.props.resetFormFields(this.state.activeForm);
        this.props.toggleActiveForm();
        this.props.resetReservingResults();
    }

    onResendEmailButtonClickHandler = () => {
        if (this.state.isFormDataValid && this.props.reservation.length > 0) {
            this.setState({
                reservationData: rewriteObjectProps(this.state.reservationData, {
                    order_id: this.props.reservation[0].id
                })
            }, () => this.props.sendEmail(this.state.reservationData))
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            this.setState({
                reservationData: rewriteObjectProps(this.state.reservationData, {
                    email: this.props.forms[this.state.activeForm].email.value,
                    first_name: this.props.forms.clientSignupForm.first_name.value,
                    last_name: this.props.forms.clientSignupForm.last_name.value,
                    password: this.props.forms[this.state.activeForm].password.value
                })
            }, () => this.props.createReservation(this.state.reservationData, this.props.isSignupFormShown));
        }
    }

    render() {
        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;
        let isPasswordConfirmed = this.props.forms.clientSignupForm.password.value === this.props.forms.clientSignupForm.duplicate.value;
        let agentDataItem = this.props.dataSet.find(({id}) => id === this.props.id);
        let startDate = moment(this.state.reservationData.start_date).format('DD-MM-YYYY HH:mm');
        let expDate = moment(this.state.reservationData.expiration_date).format('DD-MM-YYYY HH:mm');
        let errorHeader = messages['default'].header;
        let errorMessage = messages['default'].message;;

        for (const key in this.props.forms[this.state.activeForm]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.state.activeForm][key]
            });
            isFormDataValid = isFormDataValid && this.props.forms[this.state.activeForm][key].isValid && isPasswordConfirmed;
        }

        if (this.props.error.createError) {
            errorHeader = messages[this.props.error.createError.stage].header;
            errorMessage = messages[this.props.error.createError.stage].message;
        }

        if (this.props.error.emailError) {
            errorHeader = messages[this.props.error.emailError.stage].header;
            errorMessage = messages[this.props.error.emailError.stage].message;
        }

        if (!isFormDataValid) {
            errorHeader = !isPasswordConfirmed ? messages['password'].header : messages['validate'].header;
            errorMessage = !isPasswordConfirmed ? messages['password'].message : messages['validate'].message;
        }

        if (this.props.loading.isMailing && this.props.reservation.length > 0) {
            errorHeader = messages['re-email'].header;
            errorMessage = messages['re-email'].message;
        }
        
        return (
            <React.Fragment>
                <Modal
                    className={styles.clientForm}
                    open={this.state.isModalOpen}
                    size='small'
                    trigger={
                        <Trigger 
                            onClick={this.onTriggerClickHandler} 
                        />
                    }
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
                                    <Image src={img} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{`${agentDataItem.first_name} ${agentDataItem.last_name}`}</Card.Header>
                                        <Card.Meta>
                                            <Rating 
                                                disabled
                                                rating={agentDataItem.rating_value} 
                                                maxRating={
                                                    Math.max(
                                                        ...getUniqueKeyValues(
                                                            this.props.models.marks.items.filter(({deleted_at}) => deleted_at === null),
                                                            'mark_value'
                                                        )
                                                    )
                                                }
                                            />
                                        </Card.Meta>
                                        <Card.Description>
                                            Period of reservation:
                                            <div>{`${startDate} / ${expDate}`}</div>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        {agentDataItem.cities.map(city => (
                                            <Label 
                                                key={city}
                                                color={city === this.state.reservationData.city_name ? 'green' : null}
                                            >
                                                {city}
                                            </Label>
                                        ))}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Message
                                    attached
                                    header={this.props.isSignupFormShown ? 'Signup to continue!' : 'Login to continue!'}
                                    content='Fill out the form below to create reservation.'
                                />
                                <Message
                                    attached
                                    positive
                                    hidden={this.props.reservation.length === 0}
                                    header='Reserving succeed!'
                                    content={
                                        `Reservation was created successfully! ${!this.props.error.emailError && !this.props.loading.isMailing 
                                            ? 'Check your email to confirm reservation.' 
                                            : ''}`
                                    }
                                />
                                <Message
                                    attached
                                    icon
                                    negative
                                    hidden={!this.props.error.createError && !this.props.error.emailError && this.state.isFormDataValid}
                                >
                                    {this.props.loading.isMailing && this.props.reservation.length > 0 && 
                                        <Icon name='circle notched' loading />
                                    }
                                    <Message.Content>
                                        <Message.Header>{errorHeader}</Message.Header>
                                        {errorMessage}
                                    </Message.Content>
                                    {this.props.error.emailError && this.props.reservation.length > 0 &&
                                        <Button 
                                            content={'Retry'} 
                                            onClick={this.onResendEmailButtonClickHandler} 
                                        />
                                    }
                                </Message>
                                <Message
                                    attached
                                    icon
                                    info
                                    hidden={!(this.props.loading.isMailing && this.props.reservation.length > 0)}
                                >
                                    {this.props.loading.isMailing && this.props.reservation.length > 0 && 
                                        <Icon name='circle notched' loading />
                                    }
                                    <Message.Content>
                                        <Message.Header>{errorHeader}</Message.Header>
                                        {errorMessage}
                                    </Message.Content>
                                </Message>
                                <Form className={'attached segment'}>
                                    {formFieldsArray.map(formField => {
                                        return (
                                            <Form.Field
                                                key={formField.key}
                                                error={!formField.isValid && formField.touched}
                                                onChange={() => this.setState({isFormDataValid: true, isConfirmShown: false})}
                                            >
                                                <label>{formField.config.label}</label> 
                                                <InputField
                                                    elementType={formField.elementType}
                                                    inputType={formField.config.type}
                                                    icon={formField.config.icon}
                                                    iconPosition={formField.config.iconPosition}
                                                    mobile={this.props.global.ui.mobile}
                                                    placeholder={formField.config.placeholder}
                                                    value={formField.value}
                                                    onChange={(event, {value}) => this.props.changeFormFieldValue(this.state.activeForm, formField.key, {value})}
                                                />
                                            </Form.Field>
                                        );
                                    })}
                                    <Form.Field>
                                        <Button
                                            fluid
                                            positive
                                            onClick={() => this.setState({isFormDataValid, isConfirmShown: true})}
                                        >
                                            <Icon name='checkmark' />
                                            Create reservation
                                        </Button>
                                    </Form.Field>
                                </Form>
                                <Message attached='bottom' warning>
                                    <Icon name='help' />
                                    {this.props.isSignupFormShown ? 'Already signed up?' : 'Not signed up yet?'}&nbsp;
                                    <Button 
                                        onClick={this.onToggleActiveFormButtonClickHandler}
                                    >
                                        {this.props.isSignupFormShown ? 'Login here' : 'Signup here'}
                                    </Button>
                                    &nbsp;instead.
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.onCloseButtonClickHandler}
                        >
                            <Icon name='close' />
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
                <ConfirmAction
                    open={this.state.isConfirmShown && this.state.isFormDataValid}
                    error={this.props.error.createError}
                    acting={this.props.loading.isCreating}
                    loaderText='Creating reservation...'
                    message={{
                        initial: {
                            header: 'Reserving confirmation',
                            content: 'You are going to create reservation. Do you confirm this action?'
                        },
                        success: {
                            header: 'Reserving succeeded',
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
                    onCancel={() => this.setState({isConfirmShown: false})}
                    onConfirm={this.onFormSubmitHandler}
                    onCommit={() => this.setState({isConfirmShown: false})}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        reloadDataTrigger: state.client.ui.reloadDataTrigger,
        isSignupFormShown: state.client.ui.isSignupFormShown,
        confirmLink: state.client.ui.confirmLink,
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
        changeFormFieldValue: (formKey, formFieldKey, {value}, touched) => dispatch(clientActionCreator.changeFormFieldValue(formKey, formFieldKey, value, touched)),
        setReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag)),
        createReservation: (reservationData, isSignup) => dispatch(clientActionCreator.createReservationRequest(reservationData, isSignup)),
        resetReservingResults: () => dispatch(clientActionCreator.resetReservingResults()),
        toggleActiveForm: () => dispatch(clientActionCreator.toggleActiveForm()),
        sendEmail: (emailData) => dispatch(clientActionCreator.sendEmailRequest(null, emailData))
    };
};

ClientForm.propTypes = {
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]).isRequired,
    id: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);