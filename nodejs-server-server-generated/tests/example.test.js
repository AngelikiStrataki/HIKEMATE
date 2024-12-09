const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index');

var Trail = require('../service/TrailService');
var { trailPhotos } = require('../service/TrailService'); // Εάν το αρχείο είναι μέσα στον φάκελο service



test.before(async (t) => {
	t.context.server = http.createServer(app);
	t.context.prefixUrl = await listen(t.context.server);
	t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
	t.context.server.close();
});

