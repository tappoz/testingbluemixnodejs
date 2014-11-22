Testing the IBM BlueMix PaaS cloud solution
===========================================

This __node.js__ project aims at integrating the __IBM Bluemix ecosystem__ with the __Twilio API__ to send SMS texts.
To deploy the application on the IBM servers the __Cloud Foundry__ command line tools are used.

Getting started
---------------

I've picked a Bluemix example of a Node.js application using an IBM data caching service, you can find it 
[on their official documentation web site](https://www.eu-gb.bluemix.net/docs/#starters/NodejsDataCache/index.html#nodejsdatacache)

Once I got the __ZIP file__ from the BlueMix dashboard I unzipped it on my local computer 
into a folder with the same name of the ZIP file.

There are some caveats to be aware of when working with the Bluemix Node.js integration:
 
 - The guys at IBM provide a minimum working example with their caching service (key/value pair storing service) 
   from which I started, but I needed to use a `./bin/www.js` file enabling the HTTP server rather than doing 
   everything in their `./app.js` file wheir they configure the __ExpressJS__ web server. 
   So I needed to change their `manifest.yml` (a __YAML__ configuration file) with `command: node bin/www.js`, 
   I needed also to change the `package.json` file with `"start": "node bin/www.js"`.
 - To run the application on your local machine you need to provide an environment variable 
   (see below the equivalent Cloud Foundry command): `$ NODE_ENV=dev node bin/www.js`. 
   This variable is used to pick up the configuration settings (see below the Twilio details).

Remote management commands
--------------------------

You can get the Cloud Foundry command Line tools on [their GitHub repository](https://github.com/cloudfoundry/cli/releases).
There are links for both the installers and the binaries.

The main Cloud Foundry commands are the following ones:

 - Connect to Bluemix: `$ cf api https://api.eu-gb.bluemix.net`
 - Login stuff:
   ```
   $ cf login -u ${YOUR_USERNAME}
   $ cf target -o ${YOUR_USERNAME} -s dev
   ```
 - Setting a Node.js environment variable to get the configuration module (`app-config`) working properly: `$ cf set-env ${YOUR_BLUEMIX_PROJECT_NAME} NODE_ENV "dev"`  
 - To push your working Node.js application to Bluemix: `$ cf push ${YOUR_BLUEMIX_PROJECT_NAME}`
 - To remotely check the tail of the logs in Bluemix: `$ cf logs ${YOUR_BLUEMIX_PROJECT_NAME}`
 
Please note that Bluemix takes care of all the node dependencies (the `node_modules` folder), 
so you can use a `.cfignore` file to ignore your local folder containing the modules.

Twilio integration
------------------

There's a good blog post to start from, you can find it in the 
[Twilio official website](https://www.twilio.com/blog/2013/03/introducing-the-twilio-module-for-node-js.html).
The API providing the text sending service is also well written, 
you can find it [at this link](http://www.twilio.com/docs/api/rest/sending-messages).

You need to set the Twilio API keys on the file at `./config/dev`. There you can find a `smsConfigSample.js` 
file that needs to be renamed as `smsConfig.js`.

Running the application locally
-------------------------------

Type on the command line:
```
$ NODE_ENV=dev node bin/www.js
```

Testing the live application
----------------------------

You can test the live application (either running locally or on Bluemix) using the __Postman REST Client__ application 
plugin for the Chrome browser. Feel free to import this [collection of HTTP requests](doc/IBMHackathon.json) 
from the documentation folder of this project.

An equivalent command line instruction using `curl` is the following one:
```
$ curl -H "Content-Type: application/json" -d '{ "testFieldA": "foo", "testFieldB": "bar" }' http://127.0.0.1:3000/twilio/send_sms
```
