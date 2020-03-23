import React, { useState, useEffect, useRef } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Checkbox } from '@material-ui/core';
import { TextField } from '../../shared/FormFields';

export const ToDo = ({ toDo, classes, onClick, updateToDos }) => {
  const [currentToDo, setCurrentToDo] = useState(toDo);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [selectDate, setSelectDate] = useState(false);
  const [newDateSelected, setNewDateSelected] = useState(false);

  const handleTextChange = e => {
    const { value } = e.target;
    setCurrentToDo({ ...currentToDo, textValue: value });
  };

  const usePrevious = value => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };
  const handleDateChange = date => {
    setSelectedDate(date);
    setCurrentToDo({ ...currentToDo, date: date });
  };

  const handleCheckboxChange = e => {
    const { checked } = e.target;
    setCurrentToDo({ ...currentToDo, checked: !checked ? false : true });
  };
  useEffect(() => {
    updateToDos(currentToDo);
  }, [currentToDo, updateToDos]);

  const prevDate = usePrevious(selectedDate);
  useEffect(() => {
    if (!_.isEqual(prevDate, selectedDate) && prevDate) {
      setNewDateSelected(true);
    }
  }, [selectedDate, prevDate]);

  return (
    <div key={currentToDo.id} className={classes.todoLine}>
      <Typography className={classes.standardSpace} variant='h6'>
        {currentToDo.id}
      </Typography>
      <TextField
        label='What to do?'
        value={currentToDo.textValue}
        key={currentToDo.id}
        onChange={handleTextChange}
        className={classes.textField}
      />
      {currentToDo.date !== '' ? (
        <Button
          size='small'
          onFocus={() => setSelectDate(true)}
          onClick={() => {
            setNewDateSelected(false);
            setCurrentToDo({ ...currentToDo, date: '' });
          }}
        >
          {formatDistanceToNow(new Date(currentToDo.date), { addSuffix: true })}
        </Button>
      ) : !selectDate ? (
        <Button size='small' onClick={e => setSelectDate(true)}>
          Select date
        </Button>
      ) : !newDateSelected ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label='Date picker dialog'
            format='MM/dd/yyyy'
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      ) : (
        <Button size='small' onClick={() => setNewDateSelected(false)}>
          {formatDistanceToNow(selectedDate, { addSuffix: true })}
        </Button>
      )}
      <Checkbox
        label='Complete'
        checked={currentToDo.checked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Button
        size='small'
        color='secondary'
        className={classes.standardSpace}
        onClick={onClick}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};
