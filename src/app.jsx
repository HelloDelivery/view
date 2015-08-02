var React = require('react');
var ThumbnailList = require('./thumbnail-list');

var element = React.createElement(ThumbnailList, {})
React.render(element, document.getElementById('container'));