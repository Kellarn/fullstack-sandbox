import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
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

  const updateToDos = useCallback(toDo => {
    setTodos(t => [
      // immutable update
      ...t.slice(0, toDo.id - 1),
      {
        id: toDo.id,
        textValue: toDo.textValue,
        checked: toDo.checked
      },
      ...t.slice(toDo.id)
    ]);
  }, []);

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
              updateToDos={updateToDos}
              onClick={() => {
                setTodos([
                  // immutable delete
                  ...todos.slice(0, index),
                  ...todos.slice(index + 1)
                ]);
              }}
            />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([
                  ...todos,
                  { id: currentIndex + 1, textValue: '', checked: false }
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
