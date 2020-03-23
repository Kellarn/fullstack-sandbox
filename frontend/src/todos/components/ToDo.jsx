import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';
import { TextField } from '../../shared/FormFields';

export const ToDo = ({ toDo, classes, onClick, updateToDos }) => {
  const [currentToDo, setCurrentToDo] = useState(toDo);

  const handleTextChange = e => {
    const { value } = e.target;
    setCurrentToDo({ ...currentToDo, textValue: value });
  };

  const handleCheckboxChange = e => {
    const { checked } = e.target;
    setCurrentToDo({ ...currentToDo, checked: !checked ? false : true });
  };
  useEffect(() => {
    updateToDos(currentToDo);
  }, [currentToDo, updateToDos]);

  return (
    <div key={currentToDo.index} className={classes.todoLine}>
      <Typography className={classes.standardSpace} variant='h6'>
        {toDo.index}
      </Typography>
      <TextField
        label='What to do?'
        value={currentToDo.textValue}
        key={currentToDo.index}
        onChange={handleTextChange}
        className={classes.textField}
      />
      <Checkbox
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
