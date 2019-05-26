import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from './ui/DayPicker';
import TimePicker from './ui/TimePicker';
import DateNavBar from './ui/DateNavBar';
import { Grid, Popup, Modal, Input, Button, Container } from 'semantic-ui-react';

class DatePicker extends Component {

    state = {
        dateContext: moment(),
        isDatePickerOpen: false,
        isMouseOverDatePicker: false,
        showDays: true,
        showHours: false,
        showMinutes: false,
        value: ''
    }

    inputFieldRef = React.createRef();

    onDayClickHandler = (event, dateContext) => {
        dateContext.set('date', +event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext,
            showDays: false,
            showHours: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onHoursClickHandler = (event, dateContext) => {
        dateContext.set('hour', +event.currentTarget.textContent.slice(0, 2));
        this.setState({
            dateContext: dateContext,
            showHours: false,
            showMinutes: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onMinutesClickHandler = (event, dateContext) => {
        dateContext.set('minute', +event.currentTarget.textContent.slice(3));
        this.setState({
            dateContext: dateContext,
            isDatePickerOpen: false,
            isMouseOverDatePicker: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onNavBarNextClickHandler = (dateContext) => {
        dateContext.add(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onNavBarPrevClickHandler = (dateContext) => {
        dateContext.subtract(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onNavBarDayClickHandler = (dateContext) => {
        this.inputFieldRef.current.focus();
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onNavBarMonthClickHandler = (dateContext) => {
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onNavBarMonthChangeHandler = (event, dateContext) => {
        this.inputFieldRef.current.focus();
        dateContext.set('month', event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        }, () => this.props.changed(null, {value: this.state.value}));
    }

    onCloseButtonHandler = () => {
        this.setState({
            isDatePickerOpen: false,
            isMouseOverDatePicker: false
        }, () => this.props.changed({target: {value: null}}, {value: this.state.value}));
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
                clicked={this.onDayClickHandler} 
            />;
        }

        if (this.state.showHours) {
            currentNavBar = <DateNavBar 
                withDay 
                dateContext={this.state.dateContext} 
                monthClicked={this.onNavBarMonthClickHandler}
                dayClicked={this.onNavBarDayClickHandler}
                nextClicked={this.onNavBarNextClickHandler}
                prevClicked={this.onNavBarPrevClickHandler}
                monthChanged={this.onNavBarMonthChangeHandler}
            />;
            currentPicker = <TimePicker 
                view='hours' 
                dateContext={this.state.dateContext} 
                clicked={this.onHoursClickHandler} 
            />;
        }

        if (this.state.showMinutes) {
            currentNavBar = <DateNavBar 
                withDay 
                dateContext={this.state.dateContext} 
                monthClicked={this.onNavBarMonthClickHandler}
                dayClicked={this.onNavBarDayClickHandler} 
                nextClicked={this.onNavBarNextClickHandler}
                prevClicked={this.onNavBarPrevClickHandler}
                monthChanged={this.onNavBarMonthChangeHandler}
            />;
            currentPicker = <TimePicker 
                view='minutes' 
                dateContext={this.state.dateContext} 
                clicked={this.onMinutesClickHandler} 
            />;
        }

        inputTrigger = (
            <Input
                ref={this.inputFieldRef}
                fluid={this.props.fluid}
                disabled={this.props.disabled}
                iconPosition='left' 
                icon='calendar alternate outline' 
                placeholder='Date Time'
                value={this.state.value}
                onKeyPress={(event) => event.preventDefault()}
                onClick={() => !this.state.isMouseOverDatePicker ? this.setState({isDatePickerOpen: true}) : null}
                onFocus={() => !this.state.isMouseOverDatePicker ? this.setState({isDatePickerOpen: true}) : null}
                onBlur={(event) => {
                    if (!this.state.isMouseOverDatePicker) {
                        this.setState({isDatePickerOpen: false});
                        this.props.changed(event, {value: this.state.value});
                    }
                }}
            />
        );

        if (this.props.mobile) {
            currentConfig = (
                <Modal
                    open={this.state.isDatePickerOpen}
                    trigger={inputTrigger}
                    style={{
                        height: '100%', 
                        width: '21em',
                        background: 'none', 
                        boxShadow: 'none'
                    }}
                    onMouseOver={() => this.setState({isMouseOverDatePicker: true})}
                    onMouseOut={() => this.setState({isMouseOverDatePicker: false})}
                    onClick={() => !this.state.showMinutes ? this.inputFieldRef.current.focus() : null}
                >
                    <Grid
                        textAlign='center'
                        verticalAlign='middle' 
                        style={{
                            height: '100%',
                            margin: 0,
                            padding: 0
                        }}
                    >
                        <Grid.Column style={{margin: 0, padding: 0}}>
                            {currentNavBar}
                            {currentPicker}
                            <Container 
                                textAlign='center' 
                                style={{
                                    width: '21em',
                                    margin: 0, 
                                    padding: '1em'
                                }}
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
                    style={{padding: 0, border: 0}}
                    onMouseOver={() => this.setState({isMouseOverDatePicker: true})}
                    onMouseOut={() => this.setState({isMouseOverDatePicker: false})}
                    onClick={() => !this.state.showMinutes ? this.inputFieldRef.current.focus() : null}
                >
                    {currentNavBar}
                    {currentPicker}
                </Popup>
            );
        }

        return currentConfig;
    };
};

export default DatePicker;