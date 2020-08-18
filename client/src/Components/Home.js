import React, { PropTypes, Component } from 'react';

class Home extends Component {
  state = {
    data: 'Hello World',
  }

  clickHandler = () => {
    this.props.history.push('/subscription');
  }

  render() {
    return (
      <div className="container-flex">
        <div className="row mt-5">
          <div className="col-12 text-center mb-5">
            <h1>Services Inc</h1>
          </div>
        </div>
        <div className="row banner">  
          <div className="col-6">
              <ul className="list-group features">
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> Updated daily</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> Reliable source data</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> Detailed explination of Topics</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> In depth analysis by Top Professional Team</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> English/Spanish/German Language Support</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> Single login across all platforms</li>
                <li className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i> 24X7 Tech support</li>
              </ul>
          </div>
          <div  className="col-6 subscribeNow">
            <button className="btn btn-primary btn-lg" onClick={this.clickHandler}>Subscribe Today</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;