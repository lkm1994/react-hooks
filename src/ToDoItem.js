import React, {useMemo} from 'react';

const ToDoItem = useMemo(({todoItem, taskCompletedCallback, removeTaskCallback}) => {
    let classes = 'list-group-item clearfix';
    console.log(todoItem);
    return (
      <ul>
        {
          todoItem.map(item => {
            return (
              <li key={item.name} className={(item.completed === true) ? classes + "list-group-item-success" : classes}>
                {item.name}
                <div className="pull-right" role="group">
                  <button type="button" className="btn btn-xs btn-success img-circle" onClick={() => taskCompletedCallback(item)}>&#x2713;</button>
                  <button type="button" className="btn btn-xs btn-danger img-circle" onClick={() => removeTaskCallback(item)}>&#xff38;</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }, [[], null, null])
  export default ToDoItem;