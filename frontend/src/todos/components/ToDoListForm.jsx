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
import { ToDo } from './ToDo';

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  console.log('ToDoListForm -> toDoList', toDoList.todos);
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = event => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const handleBlur = event => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const setTodoos = toDo => {
    console.log('ToDoListForm -> toDo', toDo);
    setTodos([
      // immutable update
      ...todos.slice(0, toDo.id - 1),
      {
        id: toDo.id,
        textValue: toDo.value,
        checked: toDo.checked
      },
      ...todos.slice(toDo.id)
    ]);
  };

  useEffect(() => {
    if (todos.length !== toDoList.todos.length) {
      saveToDoList(toDoList.id, { todos });
    }
    setCurrentIndex(todos[todos.length - 1].id);
  }, [todos, toDoList, saveToDoList, currentIndex]);

  return (
    <Card className={classes.card} onBlur={handleBlur}>
      <CardContent>
        <Typography component='h2'>{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((toDo, index) => (
            <ToDo
              toDo={toDo}
              classes={classes}
              key={toDo.id}
              setTodoos={setTodoos}
              onChange={event => {
                setTodos([
                  // immutable update
                  ...todos.slice(0, toDo.id - 1),
                  {
                    id: toDo.id,
                    textValue: event.target.value,
                    checked: toDo.checked
                  },
                  ...todos.slice(toDo.id)
                ]);
              }}
              onChangeChecked={event => {
                setTodos([
                  // immutable update
                  ...todos.slice(0, toDo.id - 1),
                  {
                    id: toDo.id,
                    textValue: toDo.value,
                    checked: event.target.checked
                  },
                  ...todos.slice(toDo.id)
                ]);
              }}
              onClick={() => {
                setTodos([
                  // immutable delete
                  ...todos.slice(0, index),
                  ...todos.slice(index + 1)
                ]);
              }}
            />
            // <div key={index} className={classes.todoLine} tabIndex={index}>
            //   <Typography className={classes.standardSpace} variant='h6'>
            //     {index + 1}
            //   </Typography>
            //   <TextField
            //     label='What to do?'
            //     value={toDo.value}
            //     key={index + 1}
            //     tabIndex={index}
            //     onChange={event => {
            //       console.log(event.target);
            //       console.log('Todo: ' + toDo.id);
            //       setTodos([
            //         // immutable update
            //         ...todos.slice(0, index),
            //         {
            //           id: toDo.id,
            //           value: event.target.value,
            //           checked: toDo.checked
            //         },
            //         ...todos.slice(index + 1)
            //       ]);
            //     }}
            //     className={classes.textField}
            //   />
            //   <Checkbox
            //     checked={checked}
            //     onChange={handleChecked}
            //     inputProps={{ 'aria-label': 'primary checkbox' }}
            //   />
            //   <Button
            //     size='small'
            //     color='secondary'
            //     className={classes.standardSpace}
            //     onClick={() => {
            //       setTodos([
            //         // immutable delete
            //         ...todos.slice(0, index),
            //         ...todos.slice(index + 1)
            //       ]);
            //     }}
            //   >
            //     <DeleteIcon />
            //   </Button>
            // </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([
                  ...todos,
                  { id: currentIndex + 1, value: '', checked: false }
                ]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
