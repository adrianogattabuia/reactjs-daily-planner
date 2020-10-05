var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var ActivityList = require('./ActivityList');
var AddActivity = require('./AddActivity');
var SearchActivity = require('./SearchActivity');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      activityBodyVisible: false,
      orderBy: 'activityName',
      orderDir: 'asc',
      queryText: '',
      myActivities: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = $.get('./js/data.json', function(result) {
      var tempActivities = result;
      this.setState({
        myActivities: tempActivities
      }); //setState
    }.bind(this));
  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  deleteMessage: function(item) {
    var allActivities = this.state.myActivities;
    var newActivities = _.without(allActivities, item);
    this.setState({
      myActivities: newActivities
    }); //setState
  }, //deleteMessage

  toggleAddDisplay: function() {
    var tempVisibility = !this.state.activityBodyVisible;
    this.setState({
      activityBodyVisible: tempVisibility
    }); //setState
  }, //toggleAddDisplay

  addItem: function(tempItem) {
    var tempActivities = this.state.myActivities;
    tempActivities.push(tempItem);
    this.setState({
      myActivities: tempActivities
    }); //setState
  }, //addItem

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }); //setState
  }, //reOrder

  SearchActivity(q) {
    this.setState({
      queryText: q
    }); //setState
  }, //SearchActivity

  render: function() {
    var filteredActivities = [];
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myActivities = this.state.myActivities; 

    myActivities.forEach(function(item) {
      if(
        (item.activityName.toLowerCase().indexOf(queryText)!=-1) ||
        (item.activityDate.toLowerCase().indexOf(queryText)!=-1) ||
        (item.activityDetails.toLowerCase().indexOf(queryText)!=-1)
      ) {
        filteredActivities.push(item);
      }
    }); //forEach

    filteredActivities = _.orderBy(filteredActivities, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir);//orderBy

    filteredActivities = filteredActivities.map(function(item, index) {
      return(
        <ActivityList key = { index }
          singleItem = { item }
          whichItem = { item }
          onDelete = { this.deleteMessage } />
      ) //return
    }.bind(this)); //filteredActivities.map
    return (
      <div className="interface">
        <AddActivity
          bodyVisible = { this.state.activityBodyVisible }
          handleToggle = { this.toggleAddDisplay }
          addActivity = { this.addItem }
        />
        <SearchActivity
          orderBy = { this.state.orderBy }
          orderDir = { this.state.orderDir }
          onReOrder = { this.reOrder }
          onSearch = { this.SearchActivity }
        />
        <ul className="item-list media-list">{filteredActivities}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('activityList')
); //render
