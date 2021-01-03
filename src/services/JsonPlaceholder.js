class JsonPlaceholder {
  _apiBase = 'https://jsonplaceholder.typicode.com';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getAllTodos = async () => {
    const res = await this.getResource(`/todos/`);
    const maxRandom = this.getRandomInt(2, 5);
    return res.map(this.transformTodo).slice(0, maxRandom);
  }

  transformTodo = (todo) => {
    return {
      id: todo.id,
      completed: todo.completed,
      value: todo.title
    }
  }
}

export default JsonPlaceholder;
