import React from 'react';
import { nanoid } from 'nanoid'

import TodoHeader from '../TodoHeader';
import TodoList from '../TodoList';
import TodoListItem from '../TodoListItem';
import TodoForm from '../TodoForm';
import TodoSearch from '../TodoSearch';
import TodoStatusFilter from '../TodoStatusFilter';
import TodoListEmpty from '../TodoListEmpty';
import Modal from '../common/Modal';

import './styles.scss';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  maxValue = 40;

  state = {
    value: '',
    todos: [],
    edittingTodo: {},
    modalIsOpen: false,
    buttons: [
      { id: 1, label: 'All', name: 'all', active: true },
      { id: 2, label: 'Active', name: 'active', active: false },
      { id: 3, label: 'Done', name: 'done', active: false }
    ],
    filtered: {}
  }

  createTodo(value, id = nanoid(), completed = false) {
    return {
      value,
      id,
      completed,
      searched: true
    }
  }

  formSubmit = (e) => {
    e.preventDefault();

    this.setState(prevState => {
      return {
        ...prevState,
        todos: prevState.value.trim() ? [...prevState.todos, this.createTodo(prevState.value)] : prevState.todos,
        value: ''
      }
    });
  }

  formFocus = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  valueChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        value: value.length <= this.maxValue ? value : value.slice(0, this.maxValue)
      }
    });
  }

  todoDelete = (id) => {
    const newTodos = this.state.todos.filter(todo => id !== todo.id);

    this.setState(prevState => {
      return {
        ...prevState,
        todos: newTodos
      }
    })
  }

  todoComplete = (id) => {
    const newTodos = this.state.todos.map(todo => {
      return {
        ...todo,
        completed: id === todo.id ? !todo.completed : todo.completed
      }
    });

    this.setState(prevState => {
      return {
        ...prevState,
        todos: newTodos
      }
    });
  }

  modalOpen = (id) => {
    const edittingTodo = this.state.todos.find(todo => id === todo.id);

    this.setState(prevState => {
      return {
        ...prevState,
        modalIsOpen: true,
        edittingTodo
      }
    });
  }

  modalClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        modalIsOpen: false
      }
    });
  }

  modalInputChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        edittingTodo: {
          ...prevState.edittingTodo,
          value: value.length <= this.maxValue ? value : value.slice(0, this.maxValue)
        }
      }
    });
  }

  modalSubmit = (e) => {
    e.preventDefault();
    const { edittingTodo } = this.state;
    const newTodos = this.state.todos.map(todo => todo.id === edittingTodo.id ? !edittingTodo.value ? todo : edittingTodo : todo);

    this.setState(prevState => {
      return {
        ...prevState,
        todos: newTodos,
        modalIsOpen: false
      }
    });
  }

  emptyTodoList = (e) => {
    if (this.state.value.trim()) {
      this.formSubmit(e);
    } else {
      this.formFocus();
    }
  }

  filterClick = (id) => {
    const buttons = this.state.buttons.map(btn => {
        return {
          ...btn,
          active: id === btn.id ? true : false
        }
    });

    this.setState(prevState => {
      return {
        ...prevState,
        buttons
      }
    });
  }

  filtered = () => {
    const button = this.state.buttons.find(btn => {
      return btn.active
    });

    return button.name
  }

  todoSearch = (e) => {
    const newTodos = this.state.todos.map(todo => {
      const todoValue = todo.value.toLowerCase();
      const result = todoValue.match(e.target.value.toLowerCase());

      if(result) {
        if(result['input'] === todoValue) {
          return {
            ...todo,
            value: todo.value,
            searched: true
          }
        }
      }

      return {
        ...todo,
        searched: false
      }
    });

    this.setState(prevState => {
      return {
        ...prevState,
        todos: newTodos
      }
    });
  }

  render() {
    return (
      <>
        <div className="todo">
          <TodoHeader todos={this.state.todos} />
          <TodoForm
            value={this.state.value}
            maxValue={this.maxValue}
            inputRef={this.inputRef}
            valueChange={this.valueChange}
            formSubmit={this.formSubmit}
          />
          {this.state.todos.length > 0 ? <TodoList>
            {this.state.todos.map(todo => {
              const elem = (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  todoComplete={this.todoComplete}
                  todoDelete={this.todoDelete}
                  modalOpen={this.modalOpen}
                />
              );
              const filtered = this.filtered();

              return (
                filtered === 'all' ? elem :
                filtered === 'active' ? !todo.completed && elem :
                filtered === 'done' ? todo.completed && elem :
                elem
              );
            })}
          </TodoList> : <TodoListEmpty emptyTodoList={this.emptyTodoList} />}
          <TodoSearch
            todoSearch={this.todoSearch}
          />
          <TodoStatusFilter
            filterClick={this.filterClick}
            buttons={this.state.buttons}
          />
        </div>
        <Modal
          modalIsOpen={this.state.modalIsOpen}
          edittingTodo={this.state.edittingTodo}
          modalInputChange={this.modalInputChange}
          modalClose={this.modalClose}
          modalSubmit={this.modalSubmit}
          maxValue={this.maxValue}
        />
      </>
    );
  }
}

export default Todo;
