'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the getReadyNewApp
 */
var calendarDemoApp = angular.module('getReadyNewApp');

// angular.module('getReadyNewApp')
  calendarDemoApp.constant('uiCalendarConfig', {calendars: {}})
  .controller('AccountCtrl', function ($scope, $compile, $timeout, uiCalendarConfig ,$uibModal, $rootScope,  seeker, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.events = [];
    $scope.eventSources = [$scope.events];

    $scope.interviewSetup = {};

    $scope.getInterviewSetup = function(){
      seeker.getInterviewSetup().then(function(data){
        // console.log(data);

          // data.start = $scope.combineDateTime(data.date, data.start);
          // data.end = $scope.combineDateTime(data.date, data.end);

          // $scope.events.push(data);
        for(var i = 0; i < data.length; i++){
          
          data[i].start = $scope.combineDateTime(data[i].date, data[i].start);
          data[i].end = $scope.combineDateTime(data[i].date, data[i].end);
          $scope.events[i] = data[i];
         
          // console.log($scope.events);
        }
          // $scope.events.push(data);
        // $scope.eventSources =[$scope.events];
        // console.log($scope.eventSources);
       
      });
    };

    $scope.getInterviewSetup();

    /* event source that calls a function on every view switch */
    // $scope.eventsF = function (start, end, timezone, callback) {
    //   var s = new Date(start).getTime() / 1000;
    //   var e = new Date(end).getTime() / 1000;
    //   var m = new Date(start).getMonth();
    //   var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    //   callback(events);
    // };

    $scope.showAddEvent = true;
    var loginSessionData = userService.getSessionToken();

    if ($rootScope.accType === 'interviewer' || loginSessionData.currentUser.accType === 'interviewer') {
       $scope.showAddEvent = false;
    }


    
    $scope.interviewSetup = function(setInterviewData){
      console.log(setInterviewData);
      seeker.interviewSetup(setInterviewData).then(function(data){
        console.log("interviewSetup.....");
      });
    };

    // console.log($scope.events);

    $scope.combineDateTime = function(sdate, stime){
      //console.log(sdate, stime);
        var dd = new Date(sdate).getDate();
        var mm = new Date(sdate).getMonth()+1;
        var yy = new Date(sdate).getFullYear();
        var hh = new Date(stime).getHours();
        var ms = new Date(stime).getMinutes();  
        var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
        
        return new Date(x);
    }
   


    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      
      var modalInstance = $uibModal.open({
        templateUrl: 'views/modals/interviewReq.html',
        controller: 'InterviewreqCtrl',
        windowClass:'roundedModal',
        resolve: {
          items: function () {
            return $scope.events;
          }
        }
      });

      modalInstance.result.then(function (data) {
        var loginSessionData = userService.getSessionToken();
        var title = data.skillset;
        var seekerStatus = "";
        if (loginSessionData.currentUser.accType === 'seeker' || loginSessionData.currentUser.accType === 'Seeker') {
          seekerStatus  = "confirm";
          
        }
        $scope.events.push({
          title: title,
          date: data.date,
          start:data.start, 
          end:data.end,
          jobseeker_confirm: seekerStatus,
          interviewer_confirm: "pending",
          className: ['openSesame']
        });   

        var interviewSetupData = {};
        interviewSetupData.jobseeker_email_id = loginSessionData.currentUser.email;
        interviewSetupData.interviewer_email_id = "default@default.com";
        interviewSetupData.code_link = " ";
        interviewSetupData.feedback = " ";
        interviewSetupData.jobseeker_confirm = " ";
        if (loginSessionData.currentUser.accType === 'seeker' || loginSessionData.currentUser.accType === 'Seeker') {
          interviewSetupData.jobseeker_confirm = seekerStatus;
          
        }
        
        interviewSetupData.interviewer_confirm = "pending";
        
        interviewSetupData.date = data.date;
        interviewSetupData.start = data.start;
        interviewSetupData.end = data.end;
        console.log(data.start, data.end);
        interviewSetupData.title = data.skillset;
        $scope.interviewSetup(interviewSetupData);
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    // $scope.changeLang = function() {
    //   if($scope.changeTo === 'Hungarian'){
    //     $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    //     $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
    //     $scope.changeTo= 'English';
    //   } else {
    //     $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //     $scope.changeTo = 'Hungarian';
    //   }
    // };
    /* event sources array*/
    // $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    
    //----------------- Seeker Api Call --------------------------------

    $scope.confirmTime = function(index) {
      console.log(index);
      var confirmArr = [ index, $scope.events];
      var modalInstance = $uibModal.open({
        templateUrl: 'views/modals/confirmTime.html',
        controller: 'ConfirmtimeCtrl',
        windowClass:'roundedModal',
        size: 'sm',
        resolve: {
          items: function () {
            return confirmArr;
          }
        }
      });
    };

    $scope.viewDetail = function(){

    }

  });
