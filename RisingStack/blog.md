How to Debug a Node.js app in a Docker Container
================================================

![Tamas Kadlecsik's Picture](https://blog-assets.risingstack.com/2017/01/kadlecsik-mate-risingstack.jpg) by [**Tamas Kadlecsik**](/author/tamas-kadlecsik) ([@tamaskadlecsik](https://twitter.com/@tamaskadlecsik)) – CEO of RisingStack. 

In this post, we'll take a look at how you can debug a Node.js app in a Docker container.

> In case you're wondering: "Why should I acquire this knowledge?" The answer is simple:

Most of the time you can be well off running your app on your local machine and use containers only to sandbox your databases and messaging queues, but some bugs will show themselves only when the app itself is containerized as well. In these cases, it is very helpful to know how to attach a debugger to the service.

According to the Foundation's [Node.js Developer Survey](https://blog.risingstack.com/takeaways-node-js-survey-2018/), half of Node.js users use Docker for development. While containerization, in general, is a very powerful tool - and here [at RisingStack we always start new projects](https://risingstack.com/) by spinning up the needed infrastructure in a docker-compose.yaml - it can be tricky to reach the enveloped Node process if you don't know how to do it.

> In case you need guidance with Docker, Kubernetes, Microservices or Node.js, feel free to ping us at `info@risingstack.com`!

All code snippets and settings used in this post can be found in its dedicated [GitHub repo](https://github.com/RisingStack/debug-node-docker).

  

How to use the Node inspector
-----------------------------

If you mostly use [printf, aka caveman debugging](https://stackoverflow.com/questions/189562/what-is-the-proper-name-for-doing-debugging-by-adding-print-statements), it can be very difficult to find the right value at the right time.

Things get even worse if you have to rebuild your container image each time you add `console.log` to it. It could be a lot easier to have the image built once and jump around within it, examining your variables while it's running. To better understand what we're gonna do here, I highly suggest to familiarize yourself with the [node inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#command-line-options) commands first.

To run your Node app in debug mode, simply add `inspect` after `node`, something like that:

    $ node inspect index.js
    < Debugger listening on ws://127.0.0.1:9229/5adb6217-0757-4761-95a2-6af0955d7d25
    < For help, see: https://nodejs.org/en/docs/inspector
    < Debugger attached.
    Break on start in index.js:1
    > 1 (function (exports, require, module, __filename, __dirname) { const http = require('http')
      2 const PORT = process.env.PORT || 3000
      3 
    debug> 
    

When you run your code in inspect mode, it always stops at the first line, waiting for you to interact with it. For those who were brought up using `gdb` to debug their code, this interface might be compelling. However, if you are used to interacting with your debugger using a GUI, you might want to open up your chrome and navigate to `chrome://inspect`.

You should see something like this:

![Node.js with Docker Chrome Inspector](/content/images/2018/08/nodejs-docker-chrome-inspector.png)

Under remote target, click `inspect` and you'll be presented with the Chrome Developer Tools debugger.

![Node.js Docker Chrome Debugger](/content/images/2018/08/nodejs-docker-chrome-debugger.png)

Now you can use the debugger as you please. It's time to wrap our app in a container.

  

Debugging Node.js in a Docker container
---------------------------------------

First, we'll need to create a Dockerfile,

    FROM node
    
    COPY package.json package.json  
    RUN npm install
    
    COPY . .  
    
    EXPOSE 3000
    CMD ["node", "."]
    

and a `docker-compose.yaml`

    version: '3.6'
    
    services:
      app: 
        build: .
        ports:
          - "3000:3000" 
    
    

Now if you run `docker-compose up`, you'll be able to reach your service on `http://localhost:3000`.

The next step is to expose the debug port to the outside world. First, let's create a `debug-compose.yaml`.

    version: '3.6'
    
    services:
      app: 
        build: .
        ports:
          - "3000:3000" 
          - "9229:9229"
        command:
          - node
          - "--inspect-brk=0.0.0.0"
          - "." 
    

As you can see, we opened up port 9229, which is the debug port of Node.js apps. We also overrode the command we specified in the `Dockerfile`. The `--inspect-brk=0.0.0.0` argument does two different things:

1.  `--inspect` tells Node that we want to run our app in debug mode.
2.  by adding `-brk` we also make sure that the app stops at the first line, so we have enough time to open up the inspector
3.  adding `=0.0.0.0` opens up the debugger to connections from any IP.

By default, the inspector is bound to `127.0.0.1` which makes sense, as we usually don't want to allow people from all around the world to attach a debugger to our app. However, the container is a different host with a different IP than our host machine, so we won't be able to reach it. It is fine as long as we do it locally; however, we don't want to run it on a live server like this.

For this reason **make sure it is a different file from your `docker-compose.yaml`**.

With a bit more work, you can expose the debug port from your staging cluster to your IP — but in that case, to **your IP only** — and debug issues there as well.

Also, note that the port forwarding rules are enclosed in `"`\-s. If you omit the quotes the rule might not work, making it difficult to figure out why you’re unable to attach the debugger to your process.

With all that said, you should be able to inspect your app in the dev tools.

![Node.js Docker Devtools](/content/images/2018/08/nodejs-docker-devtools-docker.png)

  

Debugging with Visual Studio Code
---------------------------------

It is great to use the inspector for single file issues, though it can have problems discovering all the files in your project. In these cases, it's better to attach the debugger provided by your IDE. Let's see how it's done with Visual Studio Code.

First, navigate to the debug tab

![Node.js Docker VSCode Palette](/content/images/2018/08/nodejs-docker-vscode-palette.png)

then click the gear icon

![Node.js Docker Debugger Setup](/content/images/2018/08/nodejs-docker-debugger-setup.png)

from the popup list, select docker (make sure, you have the [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) extension installed)

![Node.js Docker VSCode Debugger Popup](/content/images/2018/08/nodejs-docker-vscode-debuge-popup.png)

it should generate a launch.json in the projects `.vscode` folder that looks like this:

![Node.js Docker Launch.json](/content/images/2018/08/nodejs-docker-launchjson.png)

It's almost ok, though in our case, the root of our app is the root of the container's filesystem, so we need to update that as well. The object should look like this when you're done:

    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/",
      "protocol": "inspector"
    }
    

Now, if you hit F5 on your keyboard, you'll be prompted with the debugger you got used to in VSCode. Hit F5 again, to let the server start listening. If you put a breakpoint somewhere and call the server at `http://localhost:3000` you should see this

![Node.js Docker VSCode Debugger](/content/images/2018/08/nodejs-docker-vscode-debugger.png)

  

Why not `ndb`?
--------------

Even though [`ndb`](https://github.com/GoogleChromeLabs/ndb/) is great for debugging, you cannot attach it to running processes currently, which pretty much ruins the purpose in our case.

You could also start your debug process with it inside the container and attach your debugger to if from outside, but you also need to modify your `Dockerfile` to do so, and you don't really gain anything as you would need to attach your chrome vscode, or another debugger to it anyway. Follow [this issue](https://github.com/GoogleChromeLabs/ndb/issues/60) for updates on the matter.

  

Final thoughts on Node.js Debugging
-----------------------------------

Seeing how container technologies such as Kubernetes, AWS ECS, Docker Swarm and others are getting more and more widespread it is clearly visible that containers are here to stay.

> In case you need guidance with Docker, Kubernetes, Microservices or Node.js, feel free to ping us at `info@risingstack.com`!

The fact that you can have the same image run on your local machine while you’re developing that will eventually land on the cluster is definitely a nice thing as you can bundle the app with the configuration and deploy them together. However, finding bugs that only show themselves when the app is bundled up can be difficult when you rely on printf debugging, so even if you have not used it so far, it is definitely a good idea to become friends with debuggers and learn how to attach them to processes running in your containers.

Happy debugging!

_The idea for this post came when we ran into a bug that only arose in the container with [@fazekasda](https://github.com/fazekasda). Thanks for the help man!_



Heading
=======

## Sub-heading ######

Paragraphs are separated
by a blank line.

Two spaces at the end of a line  
produces a line break.

Text attributes _italic_, 
**bold**, `monospace`.

Horizontal rule:

---

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. wash
  2. rinse
  3. repeat

```javascript
    const Cluster = require( 'cluster' ) ;
```

