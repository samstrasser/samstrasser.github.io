var AppNav = React.createClass({
  render: function() {
    var sections = this.props.sections;
    var handleNav = this.props.handleNav;
    return (
      <div className="nav">
        <button onClick={handleNav.bind(null, 'basic')}>Lists</button>
        <button onClick={handleNav.bind(null, 'funnels')}>Graph</button>
        
        <hr />
        
        {sections.length > 0 && 
          <DownloadLink sections={sections} />}
      
      
      </div>
    )
  }
});