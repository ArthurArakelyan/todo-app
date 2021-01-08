import React from 'react';

export const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  state = {
    theme: !localStorage.getItem('theme') ? 'light' : localStorage.getItem('theme')
  }

  componentDidMount() {
    if(!localStorage.getItem('theme')) {
      localStorage.setItem('theme', this.state.theme);
    } else {
      this.setState({
        theme: localStorage.getItem('theme')
      });
    }
  }

  componentDidUpdate(prevState) {
    if(this.state.theme !== prevState.theme) {
      localStorage.setItem('theme', this.state.theme);
    }
  }

  themeChange = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light'
      }
    });
  }

  render() {
    const value = {
      theme: this.state.theme,
      themeChange: this.themeChange
    }

    return (
      <ThemeContext.Provider value={value}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
