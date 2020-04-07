import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskList } from './actions';

function App() {
  const [taskName, setTaskName] = useState("");
  useEffect(() => {
    //console.log(taskList);
  })
  const storeTaskList = useSelector(state => state);
  const dispatch = useDispatch();
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
        setTaskName("");
      }
    }
  }
  const toggleComplete = (event) => {
    let tempTaskList = [...storeTaskList.taskList];
    for (let i = 0; i < tempTaskList.length; i++) {
      if (tempTaskList[i].name === event.name) {
        tempTaskList[i].completed = !event.completed
        break;
      }
    }
    //setTaskList(tempTaskList)
    console.log(tempTaskList);
    dispatch(updateTaskList(tempTaskList));
  }
  const removeNode = (event) => {
    let tempTaskList = [...storeTaskList.taskList];
    for (let i = 0; i < tempTaskList.length; i++) {
      debugger
      if (tempTaskList[i].name === event.name) {
        tempTaskList.splice(i, 1);
        break;
      }
    }
    //setTaskList(tempTaskList);
    dispatch(updateTaskList(tempTaskList));
  }

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
      console.log(item)
      return (
        <Card key={item.name} className="card-style">
          <CardBody  className={(item.completed === true) ? "list-group-item-success" : ""}>
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
