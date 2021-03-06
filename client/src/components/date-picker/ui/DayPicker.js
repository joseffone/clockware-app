import React from 'react';
import {Table} from 'semantic-ui-react';
import moment from 'moment';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

const DayPicker = (props) => {
    let weekDays = [...moment.weekdaysShort(), moment.weekdaysShort(0)].slice(1);
    let dateContext = moment(Object.assign({}, props.dateContext));
    let currentMonth = dateContext.format('M');
    let currentDay  = dateContext.format('D');
    let firstWeekDayOfMonth = +dateContext.startOf('month').format('d');
    let dayShift = (firstWeekDayOfMonth !== 0) ? firstWeekDayOfMonth : 7;
    let startDate = moment(dateContext).startOf('month').subtract(dayShift, 'days');
    let days = [];
    let week = [];
 
    for (let i = 1; i <= 7*6; i++) {
        startDate.add(1, 'days');
        let day = startDate.format('D');
        let month = startDate.format('M');
        days.push({day, month});
    }

    return (
        <Table 
            unstackable 
            attached 
            celled 
            textAlign='center'
            className={styles.dayPicker}
        >
            <Table.Header>
                <Table.Row>
                    {weekDays.map((wDay) => {
                        return (
                            <Table.HeaderCell 
                                key={wDay} 
                                content={wDay} 
                            />
                        );
                    })}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {days.map((day, index) => {
                    let disabled = false;
                    let active = false;
                    let selectable = true;
                    
                    if (day.month !== currentMonth) {
                       disabled = true;
                    }

                    if ((day.day === currentDay) && (day.month === currentMonth)) {
                        active = true;
                    }

                    week.push(
                        <Table.Cell 
                            key={index} 
                            selectable={selectable} 
                            active={active} 
                            disabled={disabled} 
                            content={day.day}
                            onClick={(event) => props.onDayClick(event, dateContext)}
                        />
                    );

                    if (week.length === 7) {
                        let cells = week.slice();
                        week = [];
                        return (
                            <Table.Row key={index*31}>
                                {cells}
                            </Table.Row>
                        );
                    }
                })}
            </Table.Body>
        </Table>
    );
};

DayPicker.propTypes = {
    dateContext: PropTypes.object.isRequired,
    onDayClick: PropTypes.func.isRequired
};

export default DayPicker;