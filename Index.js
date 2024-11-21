const express = require("express");
const app = express();
const {variables_1} = require('./configs')
var nodes7 = require("nodes7");
var plc1 = new nodes7();
var plc2 = new nodes7();
const { dataController, plc1_controller } = require('./controller')


plc1.initiateConnection(
  { port: 102, host: "192.168.1.177", rack: 0, slot: 1, debug: false },
  connected_plc1
);
//
function connected_plc1(err) {
  if (typeof err !== "undefined") {
    console.log(err);
    process.exit();
  }
  plc1.setTranslationCB(function (tag) {
    return variables_1[tag];
  }); 
  plc1.addItems(Object.keys(variables_1));
  
}

const bodyParser = require("body-parser");
//
app.use(bodyParser.json());

//app.post("/api/Run_Test", (req, res) => { plc1_controller(plc1, req, res);});

app.post("/api/Control_PLC_1",(req, res) => { plc1_controller(plc1, req, res);});
app.get("/api/data", (req, res) => {  dataController(plc1, req, res); // Pass plc1 and plc2 to the dataController
});
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
