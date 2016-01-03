var MainApp = React.createClass({displayName: "MainApp",
  getDays: function(startDay) {
    var day = startDay;
    var days = [];
    while (day.year() == 2016) {
      days.push(day.clone());
      day = day.add(1, 'days');
    }
    return days;
  },

  getWeeks: function(startDay) {
    var days = this.getDays(startDay);
    window.DBG.days = days;
    var weeks = [];
    var currWeek = [];
    days.forEach(function(day){
      currWeek.push(day);
      if (day.day() == 0) {
        weeks.push(currWeek);
        currWeek = [];
      }
    });
    weeks.push(currWeek)

    return weeks;
  },

  render: function() {
    window.DBG = {};

    var startDay = moment('2016-01-04'); // first Monday of 2016
    var weeks = this.getWeeks(startDay);
    window.DBG.weeks = weeks;
    window.DBG.numWeeks = weeks.length;

    var numCols = 2;
    var weeksPerCol = Math.ceil(weeks.length/numCols);
    var cols = [];
    for (var i=0; i< numCols; i++) {
      cols.push(weeks.splice(0,weeksPerCol));
    }

    var veryFirst = true;

    return (
      React.createElement("div", null, 
        cols.map(function(weeks, k){
          return (
            React.createElement("table", {key: k}, 
              weeks.map(function(week, i){
                return (
                  React.createElement("tr", {key: i}, 
                    week.map(function(day){
                      var isFirst = day.date() == 1;
                      var classes='';
                      var format = 'D';
                      if (veryFirst || isFirst) {
                        classes = 'first-of-month';
                        format = 'MMM D';
                        veryFirst = false;
                      }

                      return React.createElement("td", {key: day.valueOf(), className: classes}, 
                        day.format(format)
                      );
                    })
                  )
                );
              })
            )
          )
        })
      )
    );
  }

});

  React.render(
    React.createElement(MainApp, null),
    document.getElementById('content')
  );
