var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", null, "Hello, app")
    );
  }
});


React.render(
  React.createElement(App, null),
  document.getElementById('content')
);
