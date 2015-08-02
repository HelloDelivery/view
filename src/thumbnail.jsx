var React = require('react');

module.exports = React.createClass({



  render: function(){
    console.log(this.props);
    return <div className="col-xs-6 col-md-3">
      <div className="thumbnail">
      <div className="media">
        <a className="pull-left">
          <img className="media-object" src={this.props.thumb} />
        </a>
        <div className="media-body">
          <h4 className="media-heading">{this.props.name}</h4>
          <p>{this.props.date}</p>
          <audio controls><source src={this.props.audio} type="audio/mp3" /></audio>
        </div>
      </div>
      </div>
    </div>
  }
});