import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskList } from './actions';
import request from './ApiCalls/apicalls';
import { HTTP_HEADERS } from './constants';

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState({});
  const [addSuccess, setAddSuccess] = useState(false);
  const storeTaskList = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllItems();
  }, [addSuccess])

  const submitTask = () => {
    let flag = false;
    if (taskName) {
      for (let i = 0; i < storeTaskList.taskList.length; i++) {
        if (taskName === storeTaskList.taskList[i].name) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (flag === false) {
        //setTaskList([...taskList, { name: taskName, completed: false }])
        let tempTaskList = [{ name: taskName, completed: false }];
        dispatch(updateTaskList(tempTaskList));
        setTaskDetail({ name: taskName, completed: false })
        addItem({ name: taskName, completed: false });
        setAddSuccess(!addSuccess);
        //const results = addItem()
        setTaskName("");
      }
    }
  }
  const toggleComplete = (event) => {
    let tempTaskList = {};
    for (let i = 0; i < storeTaskList.taskList.length; i++) {
      if (storeTaskList.taskList[i].name === event.name) {
        tempTaskList = {
          id: event._id,
          name: event.name,
          completed: !event.completed
        }
        break;
      }
    }
    //setTaskList(tempTaskList)
    setTaskDetail(tempTaskList)
    updateItem(tempTaskList);
    setAddSuccess(!addSuccess);
    //dispatch(updateTaskList(tempTaskList));
  }
  const removeNode = (event) => {
    let itemId;
    for (let i = 0; i < storeTaskList.taskList.length; i++) {
      if (storeTaskList.taskList[i].name === event.name) {
        itemId = event._id
        break;
      }
    }
    //setTaskList(tempTaskList);
    //dispatch(updateTaskList(tempTaskList));
    deleteItem(itemId);
    setAddSuccess(!addSuccess);
  }
  const deleteItem = useCallback((id) => {
    const results = request(`http://localhost:3000/todo/deleteitem/${id}` , { method: 'DELETE', headers: HTTP_HEADERS });
    results.then(function (resultdata) {
      return resultdata.data.addItem
    }).catch(err => {
      console.log(err)
    })
  })
  const updateItem = useCallback((data) => {
    let tempRequestBody = {
      name: data.name,
      completed: data.completed
    }
    const results = request(`http://localhost:3000/todo/updateitem/${data.id}` , { data: tempRequestBody, method: 'PUT', headers: HTTP_HEADERS });
    results.then(function (resultdata) {
      return resultdata.data.addItem
    }).catch(err => {
      console.log(err)
    })
  })
  const getAllItems = useCallback(() => {
    const results = request('http://localhost:3000/todo/fetchtodoItems', { method: 'GET', headers: HTTP_HEADERS });
    results.then(function (result) {
      dispatch(updateTaskList(result.data.fetchItems))
      return result
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  const addItem = useCallback((data) => {
    const results = request('http://localhost:3000/todo/add', { data: data, method: 'POST', headers: HTTP_HEADERS });
    results.then(function (resultdata) {
      return resultdata.data.addItem
    }).catch(err => {
      console.log(err)
    })
  })

  return (
    <div className="app">
      <Card className="card-style">
        <CardBody>
          <div className="clearfix">
            <form className="todoForm form-horizontal">
              <Row><Col xs="12"><label className="control-label">Add Task</label></Col></Row>
              <Row>
                <Col xs='10'>
                  <div className="form-group">
                    <input type="text" id="task" value={taskName} onChange={(event) => { setTaskName(event.target.value) }} className="form-control" placeholder="What do you need to do?" />
                  </div>
                </Col>
                <Col xs='2'>
                  <Button color="primary" onClick={submitTask} className="btn">Save</Button>
                </Col>
              </Row>
            </form>
          </div>
        </CardBody>
      </Card>
      <ToDoItem todoItem={storeTaskList.taskList} taskCompletedCallback={toggleComplete} removeTaskCallback={removeNode} />

    </div>
  );
}

const ToDoItem = (props) => {
  const [toDoList, setToDoList] = useState([])
  const storeTaskList = useSelector(state => state);
  useEffect(() => {
    setToDoList(storeTaskList.taskList)
  }, [storeTaskList.taskList]);
  return (
    toDoList.map(item => {
      return (
        <Card key={item._id} className="card-style">
          <CardBody className={(item.completed === true) ? "list-group-item-success" : ""}>
            <Row>
              <Col xs="10">
                {item.name}
              </Col>
              <Col xs="1">
                <Button color="success" className="btn" onClick={() => props.taskCompletedCallback(item)}>&#x2713;</Button>
              </Col>
              <Col xs="1">
                <Button color="danger" className="btn" onClick={() => props.removeTaskCallback(item)}>&#xff38;</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )
    })
  );
}




//const ToDoItem = (props) => {
export default App;
