"use strict";

var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;
var ThumbnailList = require('./thumbnail-list');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var rootUrl = "https://hellodeliveries.firebaseio.com/orders/";

module.exports = React.createClass({
  mixins: [ ReactFire ],

  getInitialState: function(){
    return {
      orders: [],
      center: new LatLng(37.761464, -122.388480),
      zoom: 14
    };
  },

  componentWillMount: function(){
    this.bindAsArray(new Firebase(rootUrl), "orders");
  },

  render: function() {
    var data = this.state.orders;
    var markers = _.chain(this.state.orders).pluck('delivery').map(function(item) {
      if (item.courier) {
        var position = item.courier.location;
        return { position: new LatLng(position.lat, position.lng) }
      }
    }).filter().value();
    console.log(markers);
    return (
      <div>
      <Map
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width="100%"
        height="400px"
        onClick={this.handleMapClick}>
        {markers.map(this.renderMarkers)}
      </Map>
      <ThumbnailList />
      </div>
      );
  },

  renderMarkers: function(state, i) {
    return (
      <Marker position={state.position} key={i} />
      );
  },

  handleMapClick: function(mapEvent) {
    var marker = {
      position: mapEvent.latLng
    };

    var markers = React.addons
      .update(this.state.markers, {$push: [marker]});

    this.setState({
      markers: markers,
      center: mapEvent.latLng
    });
  },

  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  }
});