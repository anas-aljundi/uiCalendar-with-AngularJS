

var CalendarApp = angular.module("CalendarApp", ['ui.calendar']);

CalendarApp.controller("CalendarEventsController", ['$scope', '$http', '$compile', 'uiCalendarConfig',
    function ($scope, $http, $compile, uiCalendarConfig) {

        $scope.SelectedEvent = null;
        var isFirstTime = true;
        $scope.events = [];
        $scope.eventSources = [$scope.events];

        /*Load events from database */
        $http.get('/api/events', {
            cache: true,
            params: {}
        }).then(function (result) {
            $scope.events.slice(0, $scope.events.length);
            angular.forEach(result.data, function (val) {
                console.log(result.data);
                $scope.events.push({
                    title: val.Title,
                    description: val.Descrption,
                    start: moment(val.StartDate).format("MM/DD/YYYY hh:mm:ss"),
                    end: moment(val.EndDate).format("MM/DD/YYYY hh:mm:ss"),
                    allDay: val.IsFullDay
                });
            });
            });
        console.log($scope.eventSources);
        /*configure the calendar*/
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                displayEventTime: false,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: function (event) {
                    $scope.SelectedEvent = event;
                },
                eventAfterAllRender: function () {
                    if ($scope.events.length > 0 && isFirstTime) {
                        /*foucs first event*/
                        uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
                    }
                }
            }
        };
    }]);
