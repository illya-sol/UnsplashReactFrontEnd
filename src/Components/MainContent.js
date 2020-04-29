import React from 'react';
import axios from 'axios';

import M from 'materialize-css';

class MainContent extends React.Component{
  state = {
    page: 1,
    latest: []
  };

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    axios.options();
    axios.get('https://unsplash0backend.herokuapp.com/unsplash/start',{
      params:{
        "page": this.state.page,
        "per_page": 30,
        "order": "latest"
      },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then(response => {
      this.setState({latest: response.data.photos});
    }).catch(err =>{ console.log(err); })
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getImageList()  {
    axios.get('https://unsplash0backend.herokuapp.com/unsplash',{
      params:{
        "page": this.state.page,
        "per_page": 30,
        "order": "latest"
      },
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '.concat(this.props.tokens.accessToken)
      }
    })
    .then(response => {
      this.setState({latest: this.state.latest.concat(response.data.photos)});
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
    return(
      <div className={window.innerWidth <= 500 ? "container-mobile" : "container"}>
        {List}
      </div>
    );
  }

  handleScroll(){
    let el = document.documentElement;
    if( window.scrollY > ( el.offsetHeight / 1.5 )){
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

export default MainContent;
