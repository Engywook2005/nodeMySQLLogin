const bcrypt = require('bcrypt');
const mySQLInterface = require('../mysql');

class MembershipRouting {
    constructor(app, dbConnex) {
        this.app = app;
        this.dbConnex = dbConnex;
    }

    init() {
        this.app.get('/login.html', (request, response) => {

            // Either give them the app or the login page. Handled in appRouting.
            response.redirect('/');
        });

        this.app.get('/register.html', (request, response) => {

            // @TODO send back to '/' if there is a session token.
            response.render('membership/register');
        });

        this.app.post('/register', (request, response) => {

            // @TODO validate email
            const email = request.body.email,
                pword = request.body.pword,
                pword2 = request.body.pword2;

            if(pword !== pword2) {
                // @TODO handle password mismatch
            }

            // @TODO password strength check

            // Insert new user registration. Error thrown by DB if we have already have somebody with this user id.
            // @TODO make hashing a different function, perhaps in utils?
            bcrypt.hash(pword, 10, (err, hash) => {
                if(hash) {
                    const callback = (err, result) =>
                        {
                            if(err) {

                                console.log(`Oy vey... ${err}`);
                                // @TODO handle
                            } else {

                                console.log(JSON.stringify(result));
                                // @TODO add welcome message at top.
                                response.render('membership/login');
                            }
                        },
                        fields = {
                            email: email,
                            password: hash
                        };

                    mySQLInterface.execQuery(this.dbConnex, callback, 'INSERT', 'users', fields);
                } else {

                    // @TODO should have an error view for this as well.
                    response.send(`Well hmmm....\n ${err} \n Not quite what we expected, now, is it? If the issue persists please let us know.`);
                    response.end();
                }
            });

        });
        // @TODO handle login - auth
    }
}

module.exports = MembershipRouting;