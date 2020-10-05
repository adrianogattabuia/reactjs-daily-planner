var React = require('react');

var AddActivity = React.createClass({

  toggleActivityDisplay: function() {
    this.props.handleToggle();
  },

  handleAdd: function(e) {
    var tempItem = {
      activityName: this.refs.inputactivityName.value,
      activityDate: this.refs.inputactivityDate.value + ' ' +
        this.refs.inputActivityTime.value,
      activityDetails: this.refs.inputactivityDetails.value
    } //tempItem
    e.preventDefault();
    this.props.addActivity(tempItem);
  }, //handleAdd

  render: function() {

    var displayActivityBody = {
      display: this.props.bodyVisible ? 'block' : 'none'
    };

    return(
      <div className="panel panel-primary">
        <div className="panel-heading activity-addheading" onClick={ this.toggleActivityDisplay }>
        <span className="glyphicon glyphicon-plus"></span> Add Activity</div>
        <div className="panel-body" style={ displayActivityBody }>
          <form className="add-activity form-horizontal"
          onSubmit={ this.handleAdd }>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="activityName">Activity Short Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="activityName" ref="inputactivityName" placeholder="Activity Short Description" />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="activityDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="activityDate" ref="inputactivityDate" />
              </div>
              <label className="col-sm-2 control-label" htmlFor="activityTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="activityTime" ref="inputActivityTime" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="activityDetails">Activity Details</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="activityDetails" ref="inputactivityDetails" placeholder="Activity Details"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default pull-right">Add Activity</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )//return
  } //render
}); // AddActivity

module.exports = AddActivity;
