var MainApp = React.createClass({displayName: "MainApp",
  render: function() {
    return (
      React.createElement("h1", null, "Hello, printable")
    );
  }

});

  React.render(
    React.createElement(MainApp, null),
    document.getElementById('content')
  );
