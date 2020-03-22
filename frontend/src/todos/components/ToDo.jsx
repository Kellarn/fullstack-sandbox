import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';
import { TextField } from '../../shared/FormFields';

export const ToDo = ({
  toDo,
  classes,
  onChange,
  onClick,
  onChangeChecked,
  setTodoos
}) => {
  const [currentToDo, setCurrentToDo] = useState({});
  //   const [checked, setChecked] = useState(currentToDo.checked);
  //   const [value, setValue] = useState(currentToDo.value);

  //   useEffect(toDo => {
  //     console.log(toDo);
  //     setCurrentToDo(toDo);
  //   }, []);

  useEffect(() => {
    if (currentToDo !== toDo) {
      console.log('Updated');
      setTodoos(currentToDo);
    }
  }, [currentToDo, toDo, setTodoos]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentToDo({ ...currentToDo, [name]: value });
  };

  return (
    <div key={toDo.index} className={classes.todoLine} tabIndex={toDo.index}>
      <Typography className={classes.standardSpace} variant='h6'>
        {toDo.index}
      </Typography>
      <TextField
        label='What to do?'
        name='textValue'
        value={currentToDo.textValue}
        key={currentToDo.index}
        tabIndex={currentToDo.index}
        onChange={handleInputChange}
        className={classes.textField}
      />
      <Checkbox
        name='checked'
        checked={currentToDo.checked}
        onChange={onChangeChecked}
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
