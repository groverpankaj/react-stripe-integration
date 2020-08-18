import React, { Component } from 'react';
import Confetti from "react-confetti";
import moment from 'moment';

class Success extends Component {

  state = {
    confetti : {
      width: 0,
      height: 0,
    }, 
    customerDetails: this.props.location.data,
  }


  componentDidMount() {
    this.setState({
      confetti : {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    })
  }

  render() {
    return(
      <div>
        {
          (this.state.customerDetails) ? 
          <div>  
          <Confetti width={this.state.confetti.width} height={this.state.confetti.height} numberOfPieces={50} />
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center mt-5">
                <h2 className="text-primary mt-2">Thank you for Subscribing to our Service.</h2>
                <p className="text-success">Your Payment has been processed successfully</p>
              </div>
            </div>  

            <div className="row mt-4">
              <div className="col-md-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2" className="text-center">Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Customer Id</th>
                      <td>{this.state.customerDetails.customerId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{this.state.customerDetails.billingDetails.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{this.state.customerDetails.billingDetails.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{this.state.customerDetails.billingDetails.address.line1}</td>
                    </tr>
                    <tr>
                      <th scope="row">City</th>
                      <td>{this.state.customerDetails.billingDetails.address.city}</td>
                    </tr>
                    <tr>
                      <th scope="row">State</th>
                      <td>{this.state.customerDetails.billingDetails.address.state}</td>
                    </tr>
                    <tr>
                      <th scope="row">Postal Code</th>
                      <td>{this.state.customerDetails.billingDetails.address.postal_code}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-4">
                &nbsp;
              </div>

              <div className="col-md-4">
              <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2" className="text-center">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Amount</th>
                      <td>{this.state.customerDetails.paymentDetails.amount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Currency</th>
                      <td>{this.state.customerDetails.paymentDetails.currency}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{this.state.customerDetails.paymentDetails.status}</td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Time</th>
                      <td>{moment.utc(this.state.customerDetails.paymentDetails.paymentTime, 'X').format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Payment Method</th>
                      <td>{this.state.customerDetails.paymentDetails.payment_method}</td>
                    </tr>
                    <tr>
                      <th scope="row">Card Saved</th>
                      <td>{(this.state.customerDetails.paymentDetails.card_saved) ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last 4</th>
                      <td>{this.state.customerDetails.paymentDetails.last4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
        : null
      }
      </div>
    );
  };
}

export default Success;
