class AppRouting {
    constructor(app) {
        this.app = app;
    }
    init() {

        // @TODO make this a constant
        const htmlPath = `${process.cwd()}/html/`;

        this.app.get('/', (request, response) => {
            if(request.session.token) {

                // @TODO need to get token to spa.html... see this: https://stackoverflow.com/questions/16369649/include-html-blocks-using-node-js and https://ejs.co/
                // Actually best, most readable resource: https://www.geeksforgeeks.org/use-ejs-as-template-engine-in-node-js. Need to use ejs
                response.sendFile(`${htmlPath}/app/spa.html`);
            } else {
                response.sendFile(`${htmlPath}/registration/login.html`);
            }
        });
    }
}

module.exports = AppRouting;