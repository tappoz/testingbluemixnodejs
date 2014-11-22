Get started with testingbluemixnodejs
-----------------------------------

Welcome to Node JS Web Starter application that uses the IBM DataCache REST interface!

This sample application demonstrates how to write a Node JS application using the IBM DataCache REST interface and deploy it on Bluemix.

1. [Install the cf command-line tool](https://www.eu-gb.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. [Download the starter application package](https://console.eu-gb.bluemix.net:443/rest/../rest/apps/c43bd285-d190-4687-be52-e9db8540c14b/starter-download).
3. Extract the package and `cd` to it.
4. Connect to Bluemix:

		cf api https://api.eu-gb.bluemix.net

5. Log into Bluemix:

		cf login -u tappoz84@yahoo.it
		cf target -o tappoz84@yahoo.it -s dev
		
6. Deploy your app:

		cf push testingbluemixnodejs

7. Access your app: [http://testingbluemixnodejs.eu-gb.mybluemix.net](http://testingbluemixnodejs.eu-gb.mybluemix.net)
