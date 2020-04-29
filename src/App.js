import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom'
import NavBar from './Components/Navbar'
import Login from './Components/Modals/Login'
import MainContent from './Components/MainContent'
import KeyWordContent from './Components/KeyWordContent'
import Register from './Components/Modals/Register'
import NotFound from './Components/404'

export const Token = React.createContext();
class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <TokenProvider>
          <Token.Consumer>
            {(context) => <NavBar tokens={context.state}/> }
          </Token.Consumer>
          <Switch>
            <Route path="/search/:keyword">
              {(props) =>
                <Token.Consumer>
                  {(context) => <KeyWordContent keyword={props.match} tokens={context.state}/> }
                </Token.Consumer>
              }
            </Route>
            <Route path="/404" component={NotFound} />
          </Switch>
          <Route exact path="/">
            <Token.Consumer>
              {(context) => <MainContent tokens={context.state}/> }
            </Token.Consumer>
          </Route>
          <Token.Consumer>
            {(context) => <Login setToken={context.setToken}/>}
          </Token.Consumer>
          <Token.Consumer>
            {(context) => <Register setToken={context.setToken}/>}
          </Token.Consumer>
        </TokenProvider>
      </BrowserRouter>
    );
  }
}

class TokenProvider extends React.Component{
  state = {
    accessToken: localStorage.getItem('access'),
    refreshToken: localStorage.getItem('refresh')
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
