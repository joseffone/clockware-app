import React, {Component} from 'react';
import moment from 'moment';
import DayPicker from './ui/DayPicker';
import TimePicker from './ui/TimePicker';
import DateNavBar from './ui/DateNavBar';
import {Grid, Popup, Modal, Input, Button, Container} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class DatePicker extends Component {
    inputFieldRef = React.createRef();

    state = {
        dateContext: this.props.value && this.props.value !== '' ? moment(this.props.value, 'DD-MM-YYYY HH:mm') : moment(),
        isDatePickerOpen: false,
        isMouseOverDatePicker: false,
        showDays: true,
        showHours: false,
        showMinutes: false,
        value: this.props.value && this.props.value !== '' ? this.props.value : ''
    }

    onDatePickerChangeHandler = () => {
        if (this.props.changed) {
            this.props.changed({target: {value: null}}, {value: this.state.value});
        }
    }

    onDayClickHandler = (event, dateContext) => {
        dateContext.set('date', +event.currentTarget.textContent);
        this.setState(
            {
                dateContext: dateContext,
                showDays: false,
                showHours: true,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onHoursClickHandler = (event, dateContext) => {
        dateContext.set('hour', +event.currentTarget.textContent.slice(0, 2));
        this.setState(
            {
                dateContext: dateContext,
                showHours: false,
                showMinutes: true,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onMinutesClickHandler = (event, dateContext) => {
        dateContext.set('minute', +event.currentTarget.textContent.slice(3));
        this.setState(
            {
                dateContext: dateContext,
                isDatePickerOpen: false,
                isMouseOverDatePicker: false,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onNavBarNextClickHandler = (dateContext) => {
        dateContext.add(1, 'months');
        this.setState(
            {
                dateContext: dateContext,
                showDays: true,
                showHours: false,
                showMinutes: false,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onNavBarPrevClickHandler = (dateContext) => {
        dateContext.subtract(1, 'months');
        this.setState(
            {
                dateContext: dateContext,
                showDays: true,
                showHours: false,
                showMinutes: false,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onNavBarDayClickHandler = (dateContext) => {
        this.setState(
            {
                dateContext: dateContext,
                isDatePickerOpen: true,
                showDays: true,
                showHours: false,
                showMinutes: false,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onNavBarMonthChangeHandler = (event, dateContext) => {
        this.inputFieldRef.current.focus();
        dateContext.set('month', event.currentTarget.textContent);
        dateContext.set('hour', 0);
        dateContext.set('minute', 0);
        this.setState(
            {
                dateContext: dateContext,
                value: dateContext.format('DD-MM-YYYY HH:mm')
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onMouseOverDatePickerHandler = () => {
        this.setState({isMouseOverDatePicker: true});
    }

    onMouseOutDatePickerHandler = () => {
        this.setState({isMouseOverDatePicker: false});
    }

    onDatePickerClickHandler = () => {
        if (!this.state.showMinutes) {
            this.inputFieldRef.current.focus();
        }
    }

    onCloseButtonHandler = () => {
        this.setState(
            {
                isDatePickerOpen: false,
                isMouseOverDatePicker: false
            }, 
            this.onDatePickerChangeHandler
        );
    }

    onHideOnScrollHandler = () => {
        if (!this.state.isMouseOverDatePicker) {
            this.setState({isDatePickerOpen: false});
        }
    }

    onPopupOpenHandler = () => {
        window.addEventListener('scroll', this.onHideOnScrollHandler, true);
    }

    onDatePickerInputFocusHandler = () => {
        if (!this.state.isMouseOverDatePicker) {
            this.setState({isDatePickerOpen: true});
        }
    }

    onDatePickerInputBlurHandler = () => {
        if (!this.state.isMouseOverDatePicker && !this.props.mobile) {
            this.setState({isDatePickerOpen: false}, this.onDatePickerChangeHandler);
        }
    }

    render() {
        let inputTrigger = null;
        let currentConfig = null;
        let currentPicker = null;
        let currentNavBar = null;

        if (this.state.showDays) {
            currentNavBar = <DateNavBar 
                dateContext={this.state.dateContext}
                nextClicked={this.onNavBarNextClickHandler}
                prevClicked={this.onNavBarPrevClickHandler}
                monthChanged={this.onNavBarMonthChangeHandler}
            />;
            currentPicker = <DayPicker 
                dateContext={this.state.dateContext} 
                dayClicked={this.onDayClickHandler} 
            />;
        }

        if (this.state.showHours || this.state.showMinutes) {
            currentNavBar = <DateNavBar 
                withDay 
                dateContext={this.state.dateContext} 
                nextClicked={this.onNavBarNextClickHandler}
                prevClicked={this.onNavBarPrevClickHandler}
                monthChanged={this.onNavBarMonthChangeHandler}
                dayClicked={this.onNavBarDayClickHandler}
            />;
            
            if (this.state.showHours) {
                currentPicker = <TimePicker 
                    view='hours' 
                    dateContext={this.state.dateContext} 
                    timeClicked={this.onHoursClickHandler} 
                />;
            }
    
            if (this.state.showMinutes) {
                currentPicker = <TimePicker 
                    view='minutes' 
                    dateContext={this.state.dateContext} 
                    timeClicked={this.onMinutesClickHandler} 
                />;
            }
        }

        inputTrigger = (
            <Input
                {...this.props}
                ref={this.inputFieldRef}
                fluid={this.props.fluid}
                disabled={this.props.disabled}
                iconPosition='left' 
                icon='calendar alternate outline' 
                placeholder={this.props.placeholder ? this.props.placeholder : 'Date Time'}
                value={this.props.changed ? this.props.value : this.state.value}
                onKeyPress={(event) => event.preventDefault()}
                onClick={this.onDatePickerInputFocusHandler}
                onFocus={this.onDatePickerInputFocusHandler}
                onBlur={this.onDatePickerInputBlurHandler}
            />
        );

        if (this.props.mobile) {
            currentConfig = (
                <Modal
                    open={this.state.isDatePickerOpen}
                    trigger={inputTrigger}
                    className={styles.datePickerModal}
                >
                    <Grid
                        textAlign='center'
                        verticalAlign='middle'
                    >
                        <Grid.Column 
                            onMouseOver={this.onMouseOverDatePickerHandler}
                            onMouseOut={this.onMouseOutDatePickerHandler}
                            onClick={this.onDatePickerClickHandler}
                        >
                            {currentNavBar}
                            {currentPicker}
                            <Container 
                                textAlign='center'
                            >
                                <Button 
                                    color='red' 
                                    circular 
                                    inverted 
                                    icon='close'
                                    onClick={this.onCloseButtonHandler}
                                />
                            </Container> 
                        </Grid.Column>
                    </Grid>
                </Modal>
            );        
        } else {
            currentConfig = (
                <Popup
                    open={this.state.isDatePickerOpen}
                    trigger={inputTrigger}
                    className={styles.datePickerPopup}
                    onMouseOver={this.onMouseOverDatePickerHandler}
                    onMouseOut={this.onMouseOutDatePickerHandler}
                    onClick={this.onDatePickerClickHandler}
                    onOpen={this.onPopupOpenHandler}
                >
                    {currentNavBar}
                    {currentPicker}
                </Popup>
            );
        }

        return currentConfig;
    };
};

DatePicker.propTypes = {
    mobile: PropTypes.bool,
    fluid: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    changed: PropTypes.func.isRequired
};

export default DatePicker;