import * as Chondric from "chondric/full";

export class App extends Chondric.App {
    constructor(options) {
        super(options);

        this.title = "Testing app";

        this.registerPage(require("./pages/start"), "/start");

        this.additionalInjections = ["$http", "$sce", "$timeout"];


    }
    appCtrl($scope, $http, $sce, $timeout) {
        app.$http = $http;
        app.$sce = $sce;
        app.$timeout = $timeout;
        console.log("app level controller");
        super.appCtrl($scope);


    }

    customInit() {
                this.loadStartPage();
    }


}
