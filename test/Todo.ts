import { ethers } from "hardhat";
import { expect } from "chai";

describe("TodoList", function () {
  let TodoList;
  let todoList: any;
  let owner: any;
  let addr1: any;
  let addr2;

  beforeEach(async function () {
    TodoList = await ethers.getContractFactory("TodoList");
    [owner, addr1, addr2] = await ethers.getSigners();

    todoList = await TodoList.deploy();
  });

  it("Should create a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");
    const todo = await todoList.todos(0);

    expect(todo.id).to.equal(0);
    expect(todo.title).to.equal("Title");
    expect(todo.description).to.equal("Description");
    expect(todo.isDone).to.equal(false);
    expect(todo.owner).to.equal(owner.address);
  });

  it("Should toggle the status of a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");
    await todoList.connect(owner).toggleIsDone(0);
    const todo = await todoList.todos(0);

    expect(todo.isDone).to.equal(true);
  });

  it("Should update a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");
    await todoList
      .connect(owner)
      .updateTodo(0, "New Title", "New Description", true);
    const todo = await todoList.todos(0);

    expect(todo.title).to.equal("New Title");
    expect(todo.description).to.equal("New Description");
    expect(todo.isDone).to.equal(true);
  });

  it("Should delete a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");
    await todoList.connect(owner).deleteTodo(0);

    const todosLength = await todoList.todos.length;
    expect(todosLength).to.equal(0);
  });

  it("Should revert when non-owner tries to toggle status", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");

    await expect(todoList.connect(addr1).toggleIsDone(0)).to.be.revertedWith(
      "You don't own this todo"
    );
  });

  it("Should revert when non-owner tries to update a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");

    await expect(
      todoList
        .connect(addr1)
        .updateTodo(0, "New Title", "New Description", true)
    ).to.be.revertedWith("You don't own this todo");
  });

  it("Should revert when non-owner tries to delete a todo", async function () {
    await todoList.connect(owner).createTodo("Title", "Description");

    await expect(todoList.connect(addr1).deleteTodo(0)).to.be.revertedWith(
      "You don't own this todo"
    );
  });
});
