var MainApp = React.createClass({
  render: function() {
    return (
      <h1>Hello, printable</h1>
    );
  }

});

  React.render(
    <MainApp />,
    document.getElementById('content')
  );
