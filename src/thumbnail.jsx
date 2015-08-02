var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

  render: function() {
    var deadline = this.props.delivery.dropoff_eta || this.props.delivery.updated;
    return <article>
      <div>
        {this.props.delivery.manifest.description}
        [{moment(deadline).format('HH:mm')}]
      </div>
    </article>
  }
});