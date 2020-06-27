class AppRouting {
    constructor(app) {
        this.app = app;
    }
    init() {
        const htmlPath = `${process.cwd()}/html/`;

        this.app.get('/', (request, response) => {
            // @TODO check request.session.

            response.sendFile(`${htmlPath}/app/spa.html`);
        });
    }
}

module.exports = AppRouting;