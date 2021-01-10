import React from 'react';
import { nanoid } from 'nanoid'

import TodoHeader from '../TodoHeader';
import TodoList from '../TodoList';
import TodoListItem from '../TodoListItem';
import TodoForm from '../TodoForm';
import TodoSearch from '../TodoSearch';
import TodoStatusFilter from '../TodoStatusFilter';
import TodoListEmpty from '../TodoListEmpty';
import TodoPrototype from '../TodoPrototype';
import TodosNotFound from '../TodosNotFound';

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

  maxValue = 50;
  maxTodos = 15;

  state = {
    value: '',
    loading: true,
    error: false,
    todos: [],
    edittingTodo: {},
    modalIsOpen: false,
    searchValue: '',
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
          const value = item.value.slice(0, this.maxValue);
          return this.createTodo(value, item.id, item.completed);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      this.todoSearch();
    }
  }

  createTodo = (value, id = nanoid(), completed = false) => {
    const search = () => {
      const result = value.includes(this.state.searchValue);

      if (result) {
        return true;
      }

      return false;
    }

    return {
      value,
      id,
      completed,
      searched: search(),
      deleting: false
    }
  }

  formSubmit = (e) => {
    e.preventDefault();

    this.setState(prevState => {
      return {
        ...prevState,
        todos: prevState.value.trim()
          && prevState.todos.length <= this.maxTodos
          ? [...prevState.todos, this.createTodo(prevState.value)]
          : prevState.todos,
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
    const deletingTodo = this.state.todos.map(todo => {
      return {
        ...todo,
        deleting: id === todo.id ? true : todo.deleting
      }
    });

    const newTodos = this.state.todos.filter(todo => id !== todo.id);

    this.setState(prevState => {
      return {
        ...prevState,
        todos: deletingTodo
      }
    });

    setTimeout(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          todos: newTodos
        }
      });
    }, 410);
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
      return btn.active;
    });

    return button.name;
  }

  searchChange = (e) => {
    const value = e.target.value.toLowerCase();

    this.setState({
      searchValue: value.length <= this.maxValue ? value : value.slice(0, this.maxValue)
    });
  }

  todoSearch = () => {
    const newTodos = this.state.todos.map(todo => {
      const todoValue = todo.value.toLowerCase();
      const result = todoValue.includes(this.state.searchValue);

      if (result) {
        return {
          ...todo,
          value: todo.value,
          searched: true
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
    const { todos, loading, error } = this.state;
    const todosLength = todos.length;

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

    const emptyTodos = (
      <TodoListEmpty emptyTodoList={this.emptyTodoList} todos={todosLength} />
    );

    const isSearched = todos.filter(todo => todo.searched).length;

    return (
      <>
        <div className="todo">
          <TodoHeader todos={this.state.todos} />

          <TodoForm
            value={this.state.value}
            todos={todosLength}
            maxValue={this.maxValue}
            maxTodos={this.maxTodos}
            inputRef={this.inputRef}
            valueChange={this.valueChange}
            formSubmit={this.formSubmit}
          />

          {
            !error ? (!loading ? (todosLength && isSearched ?
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
                {todosLength <= this.maxTodos ? <TodoPrototype value={this.state.value} /> : null}
              </TodoList> : !todosLength ? emptyTodos : !isSearched ? <TodosNotFound /> : emptyTodos) : spinner)
              : errorMessage
          }

          <TodoSearch
            searchValue={this.state.searchValue}
            searchChange={this.searchChange}
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
