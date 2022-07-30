# Plates Co
Plates Co are the leading provider of made up dinner plates and they’ve contracted you to create a proof of concept for their new sales system.

# Getting Started
Please, follow the following steps to start using the service:
1.	Clone the repo from master branch
2.  Install JSON Server
   - Open your Terminal. Execute the following command
 ```
 npm install -g json-server
 ```
3. Start JSON Server with the specified json file. Normally you need to specify a port number to avoid conflict with existing ports you are going to use
```
json-server --watch plates.json --port 3200
```
   - If you see “Watcdhing …”, it means it’s up and running.
   
   <img width="592" alt="Screen Shot 2022-07-30 at 3 29 32 AM" src="https://user-images.githubusercontent.com/37974483/181865152-2fd7fb8f-0599-466f-a98a-53c6b6e0ec38.png">
   
4. Verify the mocked API. Now if you go to http://localhost:3002/article in browser, you’ll get following result

<img width="592" alt="Screen Shot 2022-07-30 at 3 31 59 AM" src="https://user-images.githubusercontent.com/37974483/181865194-f3ac59fb-f0be-4569-b7cd-c77833178fc4.png">

5.	To run the code in dev environment use this command: npm run start-dev
6.  To open documentation add this part to base url "swagger/#/" ex: "http://localhost:4000/swagger/#/"

```
http://localhost:4000/swagger/#/
```

<img width="1508" alt="Screen Shot 2022-07-30 at 3 35 35 AM" src="https://user-images.githubusercontent.com/37974483/181865284-d1271293-cfcf-4794-a33e-20b12c8024d4.png">
7. To delete all products and reset cart please user reset-cart API

<img width="1508" alt="Screen Shot 2022-07-30 at 3 37 44 AM" src="https://user-images.githubusercontent.com/37974483/181865338-e9502350-92b1-456b-acaa-5ac12263c243.png">

# About this service
this service developed by me using the awesome nodejs with Json server for the database and the swagger for documentation APIs

If you want to learn more don't hesitate to call me anytime

