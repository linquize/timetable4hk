timetable4hk
============

https://code4hk.hackpad.com/Timetable4HK-a-timetable-for-consultations-social-movements-IkzwmzJoEny

POC of timetable4hk
-------------------

System Requirement:
- Web Browser that supports HTML 5
- node.js with npm
- bower
- git

To install the development tools, run
	`sudo apt-get install nodejs npm git`;
	`npm install -g bower`

To get the javascript libraries, run
	`cd timetable4hk`;
	`bower install fullcalendar`

`calendar.html` is the main page that shows the calendar. It can be hosted on any HTTP server.

`eventhk2ics.html` and `legco2ics.html` are the UI to call the upstream data sources.

To use `eventhk2ics.html` and `legco2ics.html`, you need node.js to run the proxy server.

Run `node proxy.node.js` and port 8888 will be listening.

