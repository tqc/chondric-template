import * as App from "./app.js";



export class Variation extends App.App {
    constructor(options) {
        super(options);
        this.title = "Testing app";
    }
}

var app = new Variation({
    title: "Test new app",
    useLocationHash: true,
    defaultStartPage: "/start"
});

//alert(app.title)

window.app = app;

app.start();