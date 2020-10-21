function Router(config){
    this.endpoints = {};
    this.clear = config.clear;
    this.notFound = config.notFound;
    this.historyStack = [];
    this.forwardStack = [];

    for (const endpoint of config.endpoints) {
        let routes = this.endpoints;
        let path = endpoint.path.split(/\//);

        if (path[0] !== "") throw Error(`Endpoint path has to be absolute. The path '${ endpoint.path }' is not absolute.`);
        
        for (var i = 0; i < path.length; i++) {
            let slice = path[i];
            if (i + 1 === path.length && slice === "") break;
            
            if (!(slice in routes)){
                routes[slice] = {};
            }
            routes = routes[slice];
        }

        routes.final = true;
        routes.func = endpoint.func;
    }    

    window.addEventListener('popstate', (event) => {
        this.loadPath(window.location.pathname);
    });

    this.navigate = (pathname) => {
        window.history.pushState({},"", pathname);
        this.loadPath(window.location.pathname);
        this.historyStack.push(pathname);
    }

    this.back = () => {
        if (this.historyStack.length > 1){
            this.forwardStack.push(this.historyStack.pop());
            this.navigate(this.historyStack.pop());
        }
    }

    this.forward = () => {
        if (this.forwardStack.length){
            this.navigate(this.forwardStack.pop());
        }
    }

    this.loadPath = (pathname) => {
        this.clear();
        let func = this.pathFunction(pathname);
        func();
    }

    this.pathFunction = (pathname) => {
        let path = pathname.split(/\//);
        let route = this.endpoints;

        for (var i = 0; i < path.length; i++){
            if (i + 1 === path.length && path[i] === "") break;
            if(path[i] in route){
                route = route[path[i]];
            }else{
                return this.notFound;
            }
        }

        if ('final' in route) return route.func;
        else return this.notFound;
    }

    this.loadPath(window.location.pathname);
    this.historyStack.push(window.location.pathname);
}