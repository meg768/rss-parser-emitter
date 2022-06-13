#!/usr/bin/env node

class App {

	run() {

		let options = {
			// Required. An object with feed name and URL
			feeds: {
                "BBC": "http://feeds.bbci.co.uk/news/uk/rss.xml#",
                "CNN": "http://rss.cnn.com/rss/edition.rss",
                "Google": "https://news.google.com/rss?gl=US&ceid=US:en&hl=en-US"
			},

			// Optional. Default set to true. No need to call start()
			autostart: false,

			// Optional. Transform RSS to custom JSON format
			transformRSS:(rss) => {
                let title = rss.title;
                let date = rss.isoDate;
                return {date:date, title:title};    
            },

			// Optional. Specifies event name, default is 'rss'
			eventName: 'news',

			// Optional. Specifies poll interval in minutes. Default is 5.
			interval:1,

			// Optional. A function for logging. Default is console.log
			log:console.log,

			// Optional. A boolean or a function for debug output. Default is false. If true, console.debug is used.
			debug:console.debug
		};

		let RSS = require('./rss-parser-emitter');
		let rss = new RSS(options);

		rss.on('news', (name, json) => {
			console.log(`${name}: ${JSON.stringify(json, null, '  ')}`);
		});
		
		// Start polling
		rss.start();
		
		// Stop after a while
		setTimeout(() => {rss.stop()}, 10000);
	}
}

let app = new App();
app.run();