import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from './ui/DayPicker';
import TimePicker from './ui/TimePicker';
import DateNavBar from './ui/DateNavBar';
import { Popup, Input } from 'semantic-ui-react';

class DatePicker extends Component {

    state = {
        dateContext: moment(),
        isDatePickerOpen: false,
        showDays: true,
        showHours: false,
        showMinutes: false,
        value: null
    }

    onDayClickHandler = (event, dateContext) => {
        dateContext.set('date', +event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext,
            showDays: false,
            showHours: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        });
    }

    onHoursClickHandler = (event, dateContext) => {
        dateContext.set('hour', +event.currentTarget.textContent.slice(0, 2));
        this.setState({
            dateContext: dateContext,
            showHours: false,
            showMinutes: true,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        });
    }

    onMinutesClickHandler = (event, dateContext) => {
        dateContext.set('minute', +event.currentTarget.textContent.slice(3));
        this.setState({
            dateContext: dateContext,
            isDatePickerOpen: false,
            value: dateContext.format('DD-MM-YYYY HH:mm')
        });
    }

    onNavBarNextClickHandler = (event, dateContext) => {
        dateContext.add(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false
        });
    }

    onNavBarPrevClickHandler = (event, dateContext) => {
        dateContext.subtract(1, 'months');
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false
        });
    }

    onNavBarDayClickHandler = (event, dateContext) => {
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false
        });
    }

    onNavBarMonthClickHandler = (event, dateContext) => {
        this.setState({
            dateContext: dateContext,
            showDays: true,
            showHours: false,
            showMinutes: false
        });
    }

    onNavBarMonthChangeHandler = (event, dateContext) => {
        dateContext.set('month', event.currentTarget.textContent);
        this.setState({
            dateContext: dateContext
        });
    }

    render() {
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

        return (
            <Popup
                open={this.state.isDatePickerOpen}
                trigger={
                    <Input
                        iconPosition='left' 
                        icon='calendar alternate outline' 
                        placeholder='Date Time'
                        value={this.state.value}
                        onKeyPress={(event) => event.preventDefault()}
                        onClick={() => this.setState({isDatePickerOpen: !this.state.isDatePickerOpen})}
                    />
                }
                on='click'
                style={{padding: 0, border: 0}}>
                {currentNavBar}
                {currentPicker}
            </Popup>
        );
    };
};

export default DatePicker;