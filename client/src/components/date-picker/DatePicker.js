import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from './ui/DayPicker';
import TimePicker from './ui/TimePicker';
import DateNavBar from './ui/DateNavBar';
import { Grid, Popup, Modal, Input, Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class DatePicker extends Component {

    state = {
        dateContext: moment(),
        isDatePickerOpen: false,
        isMouseOverDatePicker: false,
        showDays: true,
        showHours: false,
        showMinutes: false,
        value: this.props.value ? this.props.value : ''
    }

    inputFieldRef = React.createRef();

    onDayClickHandler = (event, dateContext) => {
        dateContext.set('date', +event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext,
            showDays: false,
            showHours: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onHoursClickHandler = (event, dateContext) => {
        dateContext.set('hour', +event.currentTarget.textContent.slice(0, 2));
        this.setState({
            dateContext: dateContext,
            showHours: false,
            showMinutes: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onMinutesClickHandler = (event, dateContext) => {
        dateContext.set('minute', +event.currentTarget.textContent.slice(3));
        this.setState({
            dateContext: dateContext,
            isDatePickerOpen: false,
            isMouseOverDatePicker: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onNavBarNextClickHandler = (dateContext) => {
        dateContext.add(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onNavBarPrevClickHandler = (dateContext) => {
        dateContext.subtract(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onNavBarDayClickHandler = (dateContext) => {
        this.inputFieldRef.current.focus();
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onNavBarMonthClickHandler = (dateContext) => {
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onNavBarMonthChangeHandler = (event, dateContext) => {
        this.inputFieldRef.current.focus();
        dateContext.set('month', event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed ? this.props.changed(null, {value: this.state.value}) : null);
    }

    onMouseOverDatePickerHandler = () => {
        this.setState({isMouseOverDatePicker: true});
    }

    onMouseOutDatePickerHandler = () => {
        this.setState({isMouseOverDatePicker: false});
    }

    onDatePickerClickHandler = () => {
        if (!this.state.showMinutes) {
            return this.inputFieldRef.current.focus();
        }
        return null;
    }

    onCloseButtonHandler = () => {
        this.setState({
            isDatePickerOpen: false,
            isMouseOverDatePicker: false
        }, () => this.props.changed ? this.props.changed({target: {value: null}}, {value: this.state.value}) : null);
    }

    onHideOnScrollHandler = () => {
        this.setState({
            isDatePickerOpen: false,
        });
    }

    onPopupClickHandler = () => {
        window.addEventListener('scroll', this.onHideOnScrollHandler, true);
    }

    onDatePickerInputFocusHandler = () => {
        if (!this.state.isMouseOverDatePicker) {
            return this.setState({isDatePickerOpen: true});
        }
        return null;
    }

    onDatePickerInputBlurHandler = (event) => {
        if (!this.state.isMouseOverDatePicker && !this.props.mobile) {
            this.setState({isDatePickerOpen: false});
            if (this.props.changed) {this.props.changed(event, {value: this.state.value})};
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
                monthClicked={this.onNavBarMonthClickHandler}
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
                monthClicked={this.onNavBarMonthClickHandler}
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
                value={this.state.value}
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
                    onOpen={this.onPopupClickHandler}
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
    changed: PropTypes.func.isRequired
};

export default DatePicker;