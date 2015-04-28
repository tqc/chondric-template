import {
    Page
}
from "chondric/page";

class StartPage extends Page {
    constructor(route, params, options) {
        super(route, params, {
            sharedUi: {
                navbar: "cjsNavigationBar",
                actionSheet: "cjsActionSheet",
                popup: "cjsSharedPopup"
            }
        });
        this.template = require("./start.html");
    }
    controller($scope, sharedUi, loadStatus) {

        sharedUi.navbar.show({
            title: "Start Page",
            rightButtons: [{
                title: "Add",
                action: "addItem()",
            }]
        });


    }
}

StartPage.routeTemplate = "/start";

export default StartPage;
