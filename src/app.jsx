var React = require('react');
var Map = require('./map');

var element = React.createElement(Map, {})
React.render(element, document.getElementById('container'));