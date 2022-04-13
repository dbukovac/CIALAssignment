# CIAL assignment

This repo contains all the files for the assignment from CIAL separated into two folders.

Folder 'server' contains the API proxy that provides endpoints for the client app to get data from. The server is built using Node js, Express and uses axios for HTTP requests. It handles getting the necessary data from DuckDuckGo API, modifying it then serving it to the client app and also handles the saving of previous queries to a local file. It provides a GET and a POST endpoint that both return the same search data from DuckDuckGo and provides a GET endpoint for query history data so the client app can show previous searches.

Folder clientApp contains the React + Redux frontend app that handles showing the search data and receiving user inputs. It was built using 'create-react-app' template to speed up the process of setting up everything for a simple React + Redux app. It uses axios for HTTP calls and bootstrap for a better looking UI. It enables the user to make queries to the DuckDuckGo fast search, see the results and open the titles as links to relevant pages. User can also repeat perviuos queris by clicking on them, user can see the previous made queries and can switch from dark to light theme. Upon opening the app in the browser it automatically gets the query history and displays it, the query made from the search input uses POST to make the request and the query made by clicking on previous queries uses GET.  

After cloning the repository you need to position yourself in each folder and first run "npm i" to install required node modules and then to run the app you need to have two terminals open, one postioned in each folder and run the command "npm start". 

NOTE: It is recommended to first start the server and only then the clientApp.

NOTE: I used VS Code for the purpose of developing and starting the app 
