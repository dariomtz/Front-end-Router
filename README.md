# Front-end Router
Front-end routing allows you to develop powerful web apps with only one HTML file, making it possible to avoid reloading the entire page and making your web applications more responsive.

Using this component, the content will be in the most part dynamically rendered with JavaScript and at the same time, you will have the advantages of responding to different endpoints with different content.

 ## How to use

 For this to work properly, it is necessary to configure your hosting service to re-route every URL call towars your unique HTML file.

 Include the component before any other js file:

 ```HTML
 <script src="https://front-end-router.web.app/Router.js"></script>
 ```

### Instantiation

``` JavaScript
Router(config, config.clear, config.notFound, config.endpoits, config.endpoints[i], config.endpoints[i].path, config.endpoits[i].func);
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

The router will be automatically used every time you create the instance, so that whenever the page is created it will render the content corresponding to the path.

#### Path definition

The definition of a path in the config file must be absolute. That means, it must begin with a ```'/'```. An example of a valid absolute path must be ```'/about'```.

To define a path with variable it is necesary to use ```':'``` before the name of the path. For example, ```'/users/:userId'```. In this case, the ```userId``` is a variable in the path, and the value that is passed into the url in this position will be saved in the parameters object as a property. This object is going to be passed to the function that will handle this endpoint.

Let's say you have the function ```renderUserPage(params)```. To access the ```userId``` that is written on the path, you can do it vía ```params.userId``` and ```params[userId]```.

If the path does not receive any variable, it is not necessary to define to receive the params argument.

#### Navigate

To go from one page to another, just call the ```navigate(path)``` method on the ```Router``` object to navigate to a certain ```path```. 

It is possible to use a stardard ```href``` link, but that will reload the whole page, which will make loading slower.

For example:

```JavaScript
router.navigate('/about');
```

Notice that the path must be absolute, just as it was defined during the endpoints.

It is posible to pass the pointer to this method to a global variable, so that you can access it at any time.

```JavaScript
var nav;

//later on... After Router instanciation.

nav = router.navigate;
```

#### Back

The ```back()``` method navigates to the previous page rendered. Even though pressing the back button on the browser will take the user to the same page, it will not behave the same. Calling the back function will not refresh the page in the browser, but just call the ```clear()``` function and render the corresponding path function.

Therefore, for a smother experience we recomend using the ```back()``` method.

```JavaScript
router.back();
```

#### Forward

The ```forward()``` method works similarly to the ```back()``` method, just to go forward. Therefore, it will be faster than a browser forward.

```JavaScript
router.forward();
```
