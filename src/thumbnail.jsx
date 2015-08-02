var React = require('react');

module.exports = React.createClass({

  render: function(){
    console.log(this.props);
    return <div className="col-xs-6 col-md-3">
      <div className="thumbnail">
        <div className="media">
          <div className="media-body">
            <h4 className="media-heading">{this.props.delivery.manifest.description}</h4>
            <p>{this.props.delivery.status}</p>
          </div>
        </div>
      </div>
    </div>
  }
});