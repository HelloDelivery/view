var React = require('react');
var Thumbnail = require('./thumbnail');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var rootUrl = "https://hellodeliveries.firebaseio.com/orders/";

module.exports = React.createClass({
  mixins: [ ReactFire ],

  getInitialState: function(){
    return {orders: []};
  },

  componentWillMount: function(){
    this.bindAsArray(new Firebase(rootUrl), "orders");
  },

  render: function(){
    var data = this.state.orders;
    var pos = ['pending', 'pickup', 'pickup_complete', 'dropoff', 'canceled', 'delivered', 'returned'];
    var posMap = {
      'pending': 'Pending',
      'pickup': 'Ready for pickup',
      'pickup_complete': 'Pickup complete',
      'dropoff': 'On the way',
      'delivered': 'Delivered',
      'canceled': 'Canceled',
      'returned': 'Returned'
    }
    data = _.sortBy(data, function(item) {
      return pos.indexOf(item.delivery.status);
    })
    var grouped = _.groupBy(data, function(item) { return item.delivery.status });
    var view = _.map(grouped, function(group, key) {
      map = _.map(group, function(props) {
        return <Thumbnail {...props} />
      });
      return (
        <div>
          <header>
            <div className="center">
              <h1>{posMap[key]}</h1>
            </div>
          </header>
          <div>{map}</div>
        </div>
      );
    });
    return <div>{view}</div>;
  }
});
