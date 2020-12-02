# todolist
Assignment OYE! Rikshaw

## 🔧 Technologies & Tools

![](https://img.shields.io/badge/Tools-PostgreSQL-informational?style=flat&logo=postgresql&logoColor=white&color=2bbc8a)
![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js)
<img src="https://img.shields.io/badge/Google%20Cloud%20-%234285F4.svg?&style=for-the-badge&logo=google-cloud&logoColor=white"/>

## Introduction TO DO APP API 
  Using this API we can manage multiple to do lists at same time. we can store daily tasks, sort them according to different priorities, search for specific tasks and much more.

## Schema for the lists

There can be multiple tables but each table will have same schema i.e.

1) task : String
2) Priority : integer => higher the value more the priority, Default value will be 0;
3) Date : Time of Creation/ Addition.
4) status : Bollean, Is the task completed or not (Default False)

## Approach ##


installing all needed pakages eg. nodemon, postgres, express.
Create Postgre SQL instance on Google Cloud And establish connection with server.



For creating new tables/ lists we will send a get request to  ### '/create/:name' where name parameter will we the name of the to do list.


To see the tasks and their status  we can send get request to either of these 

### '/show/:name/:priority'
 => this will take 2 parameters one will be name of the todo list and next will be the order in which you want the result;

or

### '/show/:name'
=> will take only one parameter and return result in order of priority only


to insert any task we send a get request to 
### " /insert/:name/:task"
where name is the name of todo list and task is the name of the task.


To search for any task we send a get request to 
 ### '/search/:name/:field/:data'
where name is todo list
field is the coloumn we want to search and data is the actual data whose row we want to extract.

simmilarly we can send get request to 
### '/delete/:name/:task'<==> '/update/:name/:task'

 to delete and update the status of any provided task.



## How to run

Just clone/Fork the repository to your system and then run command "nodemon" in the terminal.
 

remember before running do install all the pakages needed like nodemon,express, postgres using npm.
