import React from 'react';
import axios from 'axios';
import NotFound from './404';

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
    if(this.props.tokens.accessToken && this.props.tokens.refreshToken)
      this.getImageList();
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
    axios.get('https://unsplash0backend.herokuapp.com/unsplash'.concat(param),{
      params:{
        "page": this.state.page,
        "per_page": 30
      },
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '.concat(this.props.tokens.accessToken)
      }
    })
    .then(response => {
      this.setState({latest: this.state.latest.concat(response.data.photos.results)});
      setTimeout(() =>{
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(this.handleScroll(), 2500);
      }, 850);
    }).catch(err =>{ console.log(err); })
  }

  render(){
    const List = this.state.latest.map((obj, i) =>{
          return(
            <figure key={obj.id + i}>
              <img className="hoverable containable" src={obj.urls.regular} alt={obj.alt_description}></img>
            </figure>
          );
      });
      if(List.length === 0)
        return <NotFound/>
      else
        return(
          <div className={window.innerWidth <= 500 ? "container-mobile" : "container"}>
            {List}
        </div>
      )
  }

  handleScroll(){
    let el = document.documentElement;
    if(window.scrollY > ( el.offsetHeight / 1.5 )){
      if(this.props.tokens.accessToken && this.props.tokens.refreshToken){
          window.removeEventListener('scroll', this.handleScroll);
          this.setState({page: (this.state.page + 1)});
          this.getImageList();
        }
      else{
          var modal = document.querySelector(".modal[id='login']");
          M.Modal.getInstance(modal).open();
        }
      }
  }
}

export default KeyWordContent;
