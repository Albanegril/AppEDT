

        $.get("http://edt.univ-lemans.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=4782&projectId=1&calType=ical&nbWeeks=4").then(function (data) {
// parse the ics data
          var jcalData = ICAL.parse(data.trim());
          var comp = new ICAL.Component(jcalData);
          var eventComps = comp.getAllSubcomponents("vevent");
// map them to FullCalendar events
          var events = $.map(eventComps, function (item) {

            if (item.getFirstPropertyValue("class") == "PRIVATE") {
              return null;
            }
            else {
              var toreturn = {
                "title": item.getFirstPropertyValue("summary"),
                "location": item.getFirstPropertyValue("location"),
              };
              var rrule=item.getFirstPropertyValue("rrule");
              if(rrule!= null){ //event recurs
                toreturn.rrule={};
                if(rrule.freq) toreturn.rrule.freq=rrule.freq;
                if(rrule.parts.BYDAY) toreturn.rrule.byweekday=rrule.parts.BYDAY;
                if(rrule.until) toreturn.rrule.until=rrule.until.toString();
                if(rrule.until) toreturn.rrule.until=rrule.until.toString();
                if(rrule.interval) toreturn.rrule.interval=rrule.interval;
                var dtstart=item.getFirstPropertyValue("dtstart").toString();
                var dtend=item.getFirstPropertyValue("dtend").toString();
                toreturn.rrule.dtstart=dtstart;
//count duration ms
                var startdate=new Date(dtstart);
                var enddate=new Date(dtend);
                toreturn.duration = enddate - startdate;
              }else{
                toreturn.start=item.getFirstPropertyValue("dtstart").toString();
                toreturn.end=item.getFirstPropertyValue("dtend").toString();
              }
              return toreturn;
            }
          });

          console.log("Coucou");
          console.log(events[0]);

          var calendarEl = document.getElementById('calendar');
          $('#calendar').fullCalendar('destroy');
          $('#calendar').fullCalendar({

            minTime: "08:00:00",
            maxTime: "20:00:00",
            timezone: 'local',
            firstDay:1,
              weekends :false,
              height: 750,

            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultDate: '2019-05-20',
            navLinks: true,
            eventLimit: true,
            events: events,
            eventRender: function (event, element) {
              console.log(event);
              console.log("Salut");
              // append location
              if (event.location != null && event.location != "") {
                element.append("<span>" + event.location + "</span>");
              }
            },
            defaultView: 'agendaWeek',
          });
        });

        function showChoixBouton()
        {
          document.getElementById("choixBouton").style.display = "flex";
        }

