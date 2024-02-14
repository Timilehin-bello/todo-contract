// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {

    
    struct Todo {
        uint256 id;
        string title;
        string description;
        bool isDone;
        address owner;
    }

    Todo[] public todos;

  
    function createTodo(string memory _title, string memory _description) public {
        uint256 newId = todos.length;
        todos.push(Todo(newId, _title, _description, false, msg.sender));
    
    }


    function toggleIsDone(uint256 _id) public {
        require(_id < todos.length, "Todo with given id does not exist");
        require(todos[_id].owner == msg.sender, "You don't own this todo");
        todos[_id].isDone = !todos[_id].isDone;
    }

    function updateTodo(uint256 _id, string memory _title, string memory _description, bool _isDone) public {
        require(_id < todos.length, "Todo with given id does not exist");
        require(todos[_id].owner == msg.sender, "You don't own this todo");
        todos[_id].title = _title;
        todos[_id].description = _description;
        todos[_id].isDone = _isDone;
    }


    function deleteTodo(uint256 _id) public {
        require(_id < todos.length, "Todo with given id does not exist");
        require(todos[_id].owner == msg.sender, "You don't own this todo");
    
        uint256 lastIndex = todos.length - 1;
        todos[_id] = todos[lastIndex];
    
        todos[_id].id = _id;
    
        todos.pop();
    }
    
  
}
