class AppRouting {
    constructor(app) {
        this.app = app;
    }
    init() {

        this.app.get('/', (request, response) => {
            if(request.session.token) {

                // @TODO push token into app/spa.
                response.render('app/spa');
            } else {
                response.render('membership/login');
            }
        });
    }
}

module.exports = AppRouting;