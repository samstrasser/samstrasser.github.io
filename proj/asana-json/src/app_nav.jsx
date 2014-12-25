var AppNav = React.createClass({
  render: function() {
    var sections = this.props.sections;
    var handleNav = this.props.handleNav;
    return (
      <div>
        {sections.length > 0 &&
          <div className="nav">
            <button onClick={handleNav.bind(null, 'basic')}>Lists</button>
            <button onClick={handleNav.bind(null, 'funnels')}>Graph</button>
            
            <hr />
            <DownloadLink sections={sections} />
          </div>
        }
      </div>
    )
  }
});