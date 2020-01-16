import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import NavBar from './Components/Navbar'
import Login from './Components/Modals/Login'
import MainContent from './Components/MainContent'
import KeyWordContent from './Components/KeyWordContent'
import Register from './Components/Modals/Register'

export const Token = React.createContext({});

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <TokenProvider>
          <NavBar Changekey={this.changeKeyword} ChangeUpdate={this.changeUpdate}/>
          <Route path="/search/:keyword">
            {(props) =>
              <Token.Consumer>
                {(context) => <KeyWordContent keyword={props.match} tokens={context.state}/> }
              </Token.Consumer>
            }
          </Route>
          <Route exact path="/">
            <Token.Consumer>
              {(context) => <MainContent tokens={context.state}/> }
            </Token.Consumer>
          </Route>
          <Login/>
          <Register/>
        </TokenProvider>
      </BrowserRouter>
    );
  }
}

class TokenProvider extends React.Component{
  state = {
    accessToken: "",
    refreshToken: ""
  }

  setToken = (accToken, refToken) => {
      this.setState({
        accessToken: accToken,
        refreshToken: refToken
      });
  }

  render(){
    return(
      <Token.Provider value = {{
        state: this.state,
        setToken: this.setToken
      }}>
        {this.props.children}
      </Token.Provider>
    )
  }
}

export default App;
