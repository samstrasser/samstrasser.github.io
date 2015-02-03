var App = React.createClass({displayName: "App",
  render: function() {
    return React.createElement("h1", null, "Hello Wufoo")
  }

});


React.render(
  React.createElement(App, null),
  document.getElementById('content')
);
