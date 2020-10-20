# Front-end Router
Front-end routing allows you to develop powerful web apps with only one HTML file, making it possible to avoid reloading the entire page and making your web aplications more responsive.

Uwing this component, the content will be in the most part dynamically rendered with JavaScript and at the same time, you will have the advantages of responding to different endpoints with different content.

 ## How to use

 For this to work properly, it is necessary to configure your hosting service to re-route every URL call towars your unique HTML file.

 Include the component before any other js file:

 ```HTML
 <script src="https://front-end-router.web.app/index.js"></script>
 ```

### Instantiation

``` JavaScript
Router(config, config.clear, config.notFound, config.endpoits, config.endpoints[i],config.endpoints[i].path, config.endpoits[i].func);
```

To correctly create an instance of  ``` Router ``` , a ```config``` object that has the following characteristics must be passed to the constructor.

Parameter          | Type     | Description
----------         | -----    | ------------
config             | Object   | The object that configures your router
config.clear       | Function | A function to execute every time a new URL is called.
config.notFound    | Function | A function to excecute when a URL is not one of the specified endpoints.
config.endpoints   | Array    | A list of valid endpoints.
config.endpoits[i] | Object   | An object that represents a valid endpoint and how it must be handled.
config.endpoints[i].path | String | The absolute path of this endpoint.
config.endpoints[i].func | Function | The function to execute when the path of the endpoint is called.

An example of a correct instanciation of ```Router``` would be the following.

```Javascript
const config = {
    clear: () => {
        console.log('Clean the page!');
    },
    notFound: () => {
        console.log('404 Not found :( ');
    },
    endpoints: [
        {
            path: '/',
            func: () => {
                console.log('Wellcome to my web app!');
            },
        },
        {
            path: '/about',
            func: () => {
                console.log('We are a team of hardworking devs :) ');
            }),
        },
    ]
}

const router = new Router(config);
```

In the example, the functions passed to the config object were created on the fly, but you can also pass the pointer to a function you wrote elsewhere. 

For example, asuming you have the ```clear()```, ```notFound()```, ```wellcome()```, and ```about()``` functions implemented somewhere in your code, you can do the following:

```JavaScript
const config = {
    clear: clear,
    notFound: notFound,
    endpoints: [
        {
            path: '/',
            func: wellcome,
        },
        {
            path: '/about',
            func: about,
        },
    ]
}
```

### Usage

The router will be automatically used every time you create the instance, so that whenever the page is created it runs the correct function to render the content.

To go from one page to another, just call the ```navigate(path)``` method on the ```Router``` object to navigate to a certain ```path```. 

It is possible to use a stardard ```href``` link, but that will reload the whole page, which will make loading slower.

For example:

```JavaScript
router.navigate('/about');
```

Notice that the path must be absolute, just as it was defined during the endpoints.

