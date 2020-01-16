import React from 'react';
import axios from 'axios';

import M from 'materialize-css';
import '../css/zoom.css'

class KeyWordContent extends React.Component{
  state = {
    page: 1,
    latest: []
  };

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    var param = "";
    if(this.props.keyword != null)
      param = this.props.keyword.params.keyword;
    if(param !== "" && this.props.tokens.refreshToken && this.props.tokens.accessToken)
      param = "/".concat(param)
    else
      param = "/start";
    axios.get('http://localhost:3001/unsplash'.concat(param),{
      params:{
        "page": this.state.page,
        "per_page": 30,
        "order": "latest"
      }
    })
    .then(response => {
      this.setState({latest: response.data.photos});
    }).catch(err =>{
      console.log(err);
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getImageList()  {
    var param = this.props.keyword.params.keyword;
    if(param !== "" && this.props.tokens.refreshToken && this.props.tokens.accessToken)
      param = "/".concat(param)
    else
      param = "/start";
    axios.get('http://localhost:3001/unsplash'.concat(param),{
      params:{
        "page": this.state.page,
        "per_page": 30
      },
      headers:{
        'Authorization': 'Bearer '.concat(this.props.tokens.accessToken)
      }
    })
    .then(response => {
      this.setState({latest: this.state.latest.concat(response.data.photos.results)});
      setTimeout(() =>{
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(this.handleScroll(), 2500);
      }, 850);
    }).catch(err =>{
      console.log(err);
    })
  }

  render(){
    const List = this.state.latest.map((obj, i) =>{
          return(
            <figure key={obj.id + i}>
              <img className="containable" src={obj.urls.regular} alt={obj.alt_description}></img>
            </figure>
          );
      });
    return(
      <div className="container">
          {List}
      </div>
    );
  }

  handleScroll(){
    let el = document.documentElement;
    if(window.scrollY > ( el.offsetHeight / 2 )){
      if(this.props.tokens.accessToken && this.props.tokens.refreshToken){
          window.removeEventListener('scroll', this.handleScroll);
          this.setState({page: (this.state.page + 1)});
          this.getImageList();
        }
      else{
          var modal = document.querySelectorAll(".modal[id='login']")[0];
          M.Modal.getInstance(modal).open();
        }
      }
  }
}

export default KeyWordContent;
