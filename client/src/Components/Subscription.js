import React, { Component } from 'react';

class Subscription extends Component {
  componentDidMount() {
    console.log('mounted');
  }

  clickHandler = (ev) => {
    const plan = ev.target.name;
    window.__INITIAL_DATA__ = plan;
    this.props.history.push(`/customerinfo/${plan}`);
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center my-5">
            <h3>Choose the plan that suits you</h3>
            <p className>Make a selection by clicking an option below:</p>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Limited-Time Offer</h5>
                <p className="card-text">$9.99 for one month</p>
                <button className="btn btn-primary" name="monthly" onClick={this.clickHandler}>Subscribe now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Half Yearly</h5>
                <p className="card-text">$59.99 for 6 months</p>
                <button className="btn btn-primary" name="halfYearly" onClick={this.clickHandler}>Subscribe now</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Limited-Time Offer</h5>
                <p className="card-text">$99.99 for 12 months</p>
                <button className="btn btn-primary" name="yearly" onClick={this.clickHandler}>Subscribe now</button>
              </div>
            </div>
          </div>
          <div className="col-md-12 my-5 text-info">
           <small>We’ll let you know in advance of any price changes. Learn more about our cancellation and renewal policies.</small>
          </div>

        </div>
      </div>
    );
  }
}


export default Subscription;
