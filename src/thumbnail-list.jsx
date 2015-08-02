var React = require('react');
var Thumbnail = require('./thumbnail');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
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
    data = this.state.orders;
    console.log(data);
    var list = data.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps}/>
    });
    return <div>
      {list}
    </div>
  }
});
