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


test('GET rate - viewTrailRating should return average rating', async (t) => {
    const trailId = 1;

    // Κλήση της API για το rate του trail
    const response = await t.context.got(`trail/${trailId}/rate`);
    
    
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, { 
        trail_id: trailId, 
        average_rating: 4 
    });
});
