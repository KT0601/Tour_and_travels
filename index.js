var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");
// const popup = require('popups');
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "tanish@0601",
    database  : "tour"
    
    
});

app.use(express.json());
app.engine('html', require('ejs').renderFile);

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));    
app.use('/static', express.static(path.join(__dirname, 'static')))
var userid ;

app.get("/",(req,res)=>{
        res.render("index.html");
    });
    app.get("/index.html",(req,res)=>{
        res.render("index.html");
    });



 /**********************************************************************************************************************/   
 app.get("/signup.html",(req,res)=>{
        res.render("signup.html");
    });
    app.post("/signup",(req,res)=>{

       var name = req.body.Name;
       var password = req.body.password;
    //    var confirmpassword = req.body.confirmpassword;
       var email = req.body.email;
       var contact = req.body.contact;
       var address = req.body.address;
       con.connect(function(err) {
        if (err) throw err;
     
        let user_id= Math.floor(Math.random() * 100000);

       console.log(name);

            con.query('INSERT INTO person (user_id, name, password, email, contact,address) VALUES (?, ?, ?, ?, ?,?)', [user_id,name,password, email,contact ,address],(error, 
        results) => {
            if (error)  throw error;

            });
      });
      console.log("signup completed");
 res.render("login.html");

    });
 /**********************************************************************************************************************/   

    app.get("/login.html",(req,res)=>{
        res.render("login.html");
    });
    app.post("/userlogin",(req,res)=>{
        console.log("fine");
      userid =req.body.userid;
        var password= req.body.password; 
                   let check=0;

        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM person where email=(?)",[userid] ,function (err, result, fields) {
              if (err) throw err;
            
              console.log(userid);

                if(result[0].password==password){
                    check=1;
                    userid=result[0].user_id;
                    console.log(userid);

                    res.render("postloginhome.html");

                }
                else{
                    
                    alert("invalid credential");
                res.render("login.html",);
            
            }

            });
          });

    
    });
    app.post("/adminlogin",(req,res)=>{
        console.log("fine");
        userid =req.body.adminid;
        var password= req.body.password; 
                   let check=0;
        console.log(req.body.adminid);
// userid="admin1";
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM admin where admin_id=(?)",[userid] ,function (err, result, fields) {
              if (err) throw err;
            

                if(result[0].password==password){
                    check=1;
                    res.render("admin.html");

                }
                else{
                res.render("login.html")}

            });
          });

    });
    /**********************************************************************************************************************/   

      
    app.get("/postloginhome.html",(req,res)=>{
        // console.log(userid);
        res.render("postloginhome.html");
    });
 /**********************************************************************************************************************/   

    app.get("/feedback.html",(req,res)=>{
 res.render("feedback.html");

    });
    app.post("/feedback",(req,res)=>{

        let hotelRating = req.body.rate1;
        // console.log("fine");
       let transportRating=req.body.rate2;
       let overAllRating=req.body.rate3;
       let msg = req.body.msg;
       // console.log(msg);
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            console.log(userid);

                con.query('INSERT INTO feedback (user_id, message, rating, hotel_rating,transport_rating) VALUES (?, ?, ?, ?, ?)', [userid, msg, overAllRating, hotelRating, transportRating],(error, 
            results) => {
                if (error) console.log("djlskajfksldjsdflk");

                });
          });

        res.render("feedback.html");
        
    });
  /**********************************************************************************************************************/   
  
    app.get("/admin.html",(req,res)=>{
        res.render("admin.html");
    });
    app.get("/AddHotel.html",(req,res)=>{
      
 res.render("AddHotel.html");
    });

    app.post("/AddHotel",(req,res)=>{
      
        let hotel_Name = req.body.hotel_Name;
        let hotel_ID = req.body.hotel_ID;
        let hotel_Type = req.body.Hotel_Type;
        let location = req.body.Location;
        let address = req.body.address;
        console.log(hotel_Name);
     
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
             
                    con.query('INSERT INTO hotel (hotel_name, hotel_id, place_id, address, hotel_type) VALUES (?, ?, ?, ?, ?)', [hotel_Name, hotel_ID, location, address, hotel_Type],(error, 
                results) => {
                    if (error) console.log("Error in hotel name insertion");

                    });
              });


        res.render("AddHotel.html");
    });

    


    app.get("/AddTouristPlace.html",(req,res)=>{
        res.render("AddTouristPlace.html");
    });
    app.get("/DeleteHotel.html",(req,res)=>{
        res.render("DeleteHotel.html");
    });
    app.get("/DeleteTouristPlace.html",(req,res)=>{
        res.render("DeleteTouristPlace.html");
    });

    app.post("/AddTouristPlace",(req,res)=>{
      
        let place_id = req.body.place_Id;
        let location = req.body.Location;
        let state = req.body.State;
        let country = req.body.Country;
        console.log(place_id);

       
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
             
                    con.query('INSERT INTO tourist_place (place_id, name, state, country) VALUES (?, ?, ?, ?)', [place_id, location, state, country],(error, 
                results) => {
                    if (error) console.log("Error in tourist place insertion!!!");

                    });
              });


        res.render("AddTouristPlace.html");
    });


    app.post("/DeleteTouristPlace",(req,res)=>{

            let hotel_Name = req.body.hotel_Name;
            let hotel_ID = req.body.hotel_ID;
            let nhotel_ID = req.body.nhotel_ID;
            let hotel_Type = req.body.Hotel_Type;
            let location = req.body.Location;
            let address = req.body.address;
            console.log(hotel_Name);
        
                con.connect(function(err) {
                    if (err) throw err;
                    console.log("Connected!");
                 
                        con.query('UPDATE hotel SET hotel_Name = ?, hotel_id = ?,place_id = ?, hotel_type = ?, address = ? WHERE hotel_id = ?', [hotel_Name, nhotel_ID,location, hotel_Type, address, hotel_ID],(error, 
                    results) => {
                        if (error) console.log("Error in update tourist place");
    
                        });
                  });
    
    
            res.render("DeleteTouristPlace.html");

    });

    app.post("/DeleteHotel",(req,res)=>{
      
        let hotel_ID = req.body.hotel_ID;
        
      
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
               
                    con.query("DELETE FROM hotel where hotel_id = ?", [hotel_ID],(error, 
                results) => {
                    if (error) console.log("Error in delete hotel id");

                    });
              });


        res.render("DeleteHotel.html");
    });

app.get("/aboutUs.html",(req,res)=>{


res.render("aboutUs.html");

})

app.get("/showhotel.html",(req,res)=>{
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM hotel " ,function (err, result) {
          if (err) throw err;
        //   console.log(result);
        // sessionStorage.setItem("customers", JSON.stringify(result));
//  console.log(JSON.stringify(result));
        
        res.render("showhotel.html" ,{name:JSON.stringify(result)}   );

        });

      });

})
app.get("/showperson.html",(req,res)=>{
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM person " ,function (err, result) {
          if (err) throw err;
        //   console.log(result);
        // sessionStorage.setItem("customers", JSON.stringify(result));
//  console.log(JSON.stringify(result));
        
        res.render("showperson.html" ,{name:JSON.stringify(result)});

        });

      });

})
app.get("/showtouristplace.html",(req,res)=>{
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM tourist_place " ,function (err, result) {
          if (err) throw err;
        //   console.log(result);
        // sessionStorage.setItem("customers", JSON.stringify(result));
//  console.log(JSON.stringify(result));
        
        res.render("showtouristplace.html" ,{name:JSON.stringify(result)});

        });

      });

})
app.get("/showfeedback.html",(req,res)=>{
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM feedback" ,function (err, result) {
          if (err) throw err;
        //   console.log(result);
        // sessionStorage.setItem("customers", JSON.stringify(result));
//  console.log(JSON.stringify(result));
        
        res.render("showfeedback.html" ,{name:JSON.stringify(result)});

        });

      });

})
app.listen(port,()=>{
    console.log(`successfully port connected`);
})