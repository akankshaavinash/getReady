'use strict';

/**
 * @ngdoc directive
 * @name getReadyNewApp.directive:uiCalendar
 * @description
 * # uiCalendar
 */
angular.module('getReadyNewApp')
  .directive('uiCalendar', function (uiCalendarConfig) {
    return {
      restrict: 'A',
      scope: {eventSources:'=ngModel',calendarWatchEvent: '&'},
      controller: 'UicalendarCtrl',
      link: function(scope, elm, attrs, controller) {
       
        // console.log(scope.eventSources);

        var sources = scope.eventSources,
            sourcesChanged = false,
            calendar,
            eventSourcesWatcher = controller.changeWatcher(sources, controller.sourceFingerprint),
            eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventFingerprint),
            options = null;

        function getOptions(){
          var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},
              fullCalendarConfig;

          fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);

          var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
          angular.extend(localeFullCalendarConfig, fullCalendarConfig);
          options = { eventSources: sources };
          angular.extend(options, localeFullCalendarConfig);
          //remove calendars from options
          options.calendars = null;

          var options2 = {};
          for(var o in options){
            if(o !== 'eventSources'){
              options2[o] = options[o];
            }
          }
          return JSON.stringify(options2);
        }

        scope.destroyCalendar = function(){
          if(calendar && calendar.fullCalendar){
            calendar.fullCalendar('destroy');
          }
          if(attrs.calendar) {
            calendar = uiCalendarConfig.calendars[attrs.calendar] = $(elm).html('');
          } else {
            calendar = $(elm).html('');
          }
        };

        scope.initCalendar = function(){
          if (!calendar) {
            calendar = angular.element(elm).html('');
          }
          calendar.fullCalendar(options);
          if(attrs.calendar) {
            uiCalendarConfig.calendars[attrs.calendar] = calendar;
          }          
        };
        scope.$on('$destroy', function() {
          scope.destroyCalendar();
        });

        eventSourcesWatcher.onAdded = function(source) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar(options);
            if (attrs.calendar) {
                uiCalendarConfig.calendars[attrs.calendar] = calendar;
            }
            calendar.fullCalendar('addEventSource', source);
            sourcesChanged = true;
          }
        };

        eventSourcesWatcher.onRemoved = function(source) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('removeEventSource', source);
            sourcesChanged = true;
          }
        };

        eventSourcesWatcher.onChanged = function() {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('refetchEvents');
            sourcesChanged = true;
          }

        };

        eventsWatcher.onAdded = function(event) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('renderEvent', event, (event.stick ? true : false));
          }
        };

        eventsWatcher.onRemoved = function(event) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('removeEvents', event._id);
          }
        };

        eventsWatcher.onChanged = function(event) {
          if (calendar && calendar.fullCalendar) {
            var clientEvents = calendar.fullCalendar('clientEvents', event._id);
            for (var i = 0; i < clientEvents.length; i++) {
              var clientEvent = clientEvents[i];
              clientEvent = angular.extend(clientEvent, event);
              calendar.fullCalendar('updateEvent', clientEvent);
            }
          }
        };

        eventSourcesWatcher.subscribe(scope);
        eventsWatcher.subscribe(scope, function() {
          if (sourcesChanged === true) {
            sourcesChanged = false;
            // return false to prevent onAdded/Removed/Changed handlers from firing in this case
            return false;
          }
        });

        scope.$watch(getOptions, function(newValue, oldValue) {
          if(newValue !== oldValue) {
            scope.destroyCalendar();
            scope.initCalendar();
          } else if((newValue && angular.isUndefined(calendar))) {
            scope.initCalendar();
          }
        });
      }
    };
  });
