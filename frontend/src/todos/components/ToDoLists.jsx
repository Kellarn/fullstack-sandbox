import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { ToDoListForm } from './ToDoListForm';

const getPersonalTodos = async () => {
  return makeRequest('get', 'http://localhost:3001/todos');
};
const saveToDB = async toDoLists => {
  makeRequest('post', 'http://localhost:3001/saveToDos', toDoLists);
};

const makeRequest = async (method, url, toDoLists = '') => {
  try {
    let result = await axios({
      method: method,
      url: url,
      mode: 'cors',
      data: toDoLists
    });
    return result.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  useEffect(() => {
    if (Object.keys(toDoLists).length) {
      saveToDB(toDoLists);
    }
  }, [toDoLists]);

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map(key => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos }) => {
            const listToUpdate = toDoLists[id];
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, todos }
            });
          }}
        />
      )}
    </Fragment>
  );
};
