var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

  render: function() {
    return <article>
      <div>
        {this.props.delivery.manifest.description}
        [{moment(this.props.delivery.dropoff_eta).format('HH:mm')}]
      </div>
    </article>
  }
});