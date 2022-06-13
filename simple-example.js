#!/usr/bin/env node

class App {

	run() {
		let RSS = require('./rss-parser-emitter');
		let rss = new RSS({
            "BBC": "http://feeds.bbci.co.uk/news/uk/rss.xml#",
            "CNN": "http://rss.cnn.com/rss/edition.rss",
            "Google": "https://news.google.com/rss?gl=US&ceid=US:en&hl=en-US"
        });

		rss.on('rss', (name, json) => {
			console.log(`${name}: ${JSON.stringify(json, null, '  ')}`);
		});
		
	}
}

let app = new App();
app.run();