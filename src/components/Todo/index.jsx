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
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

import JsonPlaceholder from '../../services/JsonPlaceholder';

import './styles.scss';

class Todo extends React.Component {

  jsonPlaceholder = new JsonPlaceholder();

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  maxValue = 40;

  state = {
    value: '',
    loading: true,
    error: false,
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

  componentDidMount() {
    this.jsonPlaceholder.getAllTodos()
      .then(todo => {
        const newTodos = todo.map(item => {
          return this.createTodo(item.value, item.id, item.completed);
        });

        this.setState(prevState => {
          return {
            ...prevState,
            loading: false,
            error: false,
            todos: newTodos
          }
        });
      })
      .catch(() => this.setState({ error: true }))
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
    });
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

      if (result) {
        if (result['input'] === todoValue) {
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
    const todoslength = this.state.todos.length;
    const { loading, error } = this.state;

    const errorMessage = (
      <ErrorMessage>
        <div className="d-flex align-items-center justify-content-center flex-column mt-4">
          <p>Could not receive data!</p>
          <p>Please check your connection to internet</p>
        </div>
      </ErrorMessage>
    );

    const spinner = (
      <TodoList>
        <Spinner />
      </TodoList>
    );

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
          {
            !error ? (!loading ? (todoslength ?
              <TodoList>
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
              </TodoList> : <TodoListEmpty emptyTodoList={this.emptyTodoList} todos={todoslength} />) : spinner)
              : errorMessage
          }

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
