class AppRouting {
    constructor(app) {
        this.app = app;
    }
    init() {

        this.app.get('/', (request, response) => {
            if(request.session.token) {

                // @TODO push token into app/spa.
                response.render('app/spa', {
                   session: request.session
                });
            } else {
                response.render('membership/login', {
                    session: request.session
                });
            }
        });
    }
}

module.exports = AppRouting;