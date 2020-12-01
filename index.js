const express           = require('express');
const {Client}     = require('pg'); 

//Import pakages

const app=express();

// Connect To DataBase

const client = new Client({
  user: 'postgres',
  host: '34.85.22.198',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

client.connect((err)=>{
    // if(err) throw err;
});


// insert into todolist1 values('learn new skills',default,current_timestamp)

//   CREATING TODO LISTS ///
app.get('/create/:name', (req,res) => {
 
    const name = req.params.name;
    const query ="create table " + name + " (task text unique, priority int default 0 , status boolean default false, date DATE default current_timestamp); ";



    console.log(query);

    client.query(query , (err, result) => {
        if (err) res.send("table already exist");
        // const resu = JSON.stringify(result);
        return res.send("Table Created");
        client.end();
    }
  );
});


// SHOW TODO LISTS IN ANY PRIORITIES EXAMPLE DATE,PRIORITY,LIXO-ORDER, STATUS;
app.get('/show/:name/:priority', (req,res) => {
 
    const name = req.params.name;
    const priority=req.params.priority;
    // const query ="create table " + name + " (task text , status boolean default false, date timestamp default current_timestamp); ";

    const temp ="select * from "+name+" order by "+priority+ " desc;";


    console.log(temp);

    client.query(temp , (err, result) => {
        if (err) return  err;
        
         return res.send(result);
        
        client.end();
    }
  );
});

// SHOW TODO LIST IN ORDER OF DECREASING PRIORITIES;

app.get('/show/:name', (req,res) => {
 
    const name = req.params.name;
    // const query ="create table " + name + " (task text , status boolean default false, date timestamp default current_timestamp); ";

    const temp ="select * from "+ name +" order by priority desc;";


    console.log(temp);

    client.query(temp , (err, result) => {
        if (err) return res.send(err);
        return res.send(result);
        client.end();
    }
  );
});


//INSERT NEW TASKS TO ANY TODO LISTS WITH OR WITHOUT PRIORITIES

app.get('/insert/:name/:task', (req,res) => {
 
    const table = req.params.name;
    const task =req.params.task;
    const query ="insert into "+table+" values ( '"+task+ "' ,default,default,default);";

    client.query(query , (err, result) => {
        if (err) res.send("list does not exist");
        // const resu = JSON.stringify(result);
        return res.send("Task inserted in list " +table);

        client.end();
    }
  );
});

app.get('/insert/:name/:task/:priority', (req,res) => {
 
    const table = req.params.name;
    const task =req.params.task;
    const priority =req.params.priority;
    const query ="insert into "+table+" values ( '"+task+ "',"+priority + ",default,default);";

    client.query(query , (err, result) => {
        if (err) return res.send("list does not exist");
        // const resu = JSON.stringify(result);
        return res.send("Task inserted in list " +table);

        client.end();
    }
  );
});

//UPDATE WHEN THE TASKS ARE COMPLETE

app.get('/update/:name/:task', (req,res) => {
 
    const table = req.params.name;
    const task =req.params.task;
    const query ="update "+table+" set status = true where task = '"+task +"';";

    console.log(query);
    client.query(query , (err, result) => {
        if (err) return res.send("task does not exist");
        // const resu = JSON.stringify(result);
        return res.send("Task inserted in list " +table);

        client.end();
    }
  );
});


// DELETE WHEN NO NEED FOR THE TASKS


app.get('/delete/:name/:task' ,(req,res)=>{
    const table = req.params.name;
    const task =req.params.task;

    client.query("DELETE FROM "+ table +" WHERE task = '"+task+"';", (err, result) => {
    if (err) return err;
    return res.send(`Task deleted`);
  });
});


// SEARCH FOR TASKS ACCORDING TO DIFFERENT FIELDS

app.get('/search/:name/:field/:data',(req,res)=>{
    const table=req.params.name;
    const field =req.params.field;
    const data =req.params.data;
    var query;
    console.log(isNaN(data));
    if(isNaN(data)) query = "select * from "+table+ " where "+field+" = '"+ data+"' ; ";

    else query = "select * from "+table+ " where "+field+" = "+ data+" ; ";

    console.log(query);

    client.query(query , (err, result) => {
        if (err) return res.send("No such task exist");
        return res.send(result);

        client.end();
    })



});

// SERVER

app.listen('3000',()=>{
    console.log('server running at port 3000');
})