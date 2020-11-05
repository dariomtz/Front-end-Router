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

            if (slice[0] == ':'){
                if (!('default' in routes)){
                    routes.default = {
                        name: slice.substring(1),
                    };
                }
                slice = 'default';
                 
            } else if (!(slice in routes)){
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
        let {func, params} = this.pathFunction(pathname);
        func(params);
    }

    this.pathFunction = (pathname) => {
        let path = pathname.split(/\//);
        let route = this.endpoints;
        let params = {}

        for (var i = 0; i < path.length; i++){
            if (i + 1 === path.length && path[i] === "") break;
            if(path[i] in route){
                route = route[path[i]];
            }else if('default' in route){
                route = route.default;
                params[route.name] = path[i];
            }else{
                return {func: this.notFound, params: params};
            }
        }

        if ('final' in route) return { func:route.func, params: params};
        else return {func: this.notFound, params: params};
    }

    this.loadPath(window.location.pathname);
    this.historyStack.push(window.location.pathname);
}