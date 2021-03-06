const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");
const Location = require("../models").Location;
const GeoLocation = require("../models").GeoLocation;
const fs = require("fs");
const EVSE = require("../models").EVSE;
const Connector = require("../models").Connector;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

const getListOfAllStations = async (req, res) => {
    try{

        /////////////////////////////////

        //console.log(new Date('2019-01-28T12:00:00'));
        var dbcount = await req.db.Location.find().countDocuments();

        offset = req.query.offset || 0;
        limit = req.query.limit || dbcount;

        var docs = await req.db.Location.find().skip(Number(offset)).limit(Number(limit)).populate({path: 'evses', populate:'connectors'}).populate('coordinates');
        

        var locationList = [];
        
        
        docs.forEach(doc => {
            var locationObj = doc.toObject();
            locationObj.evses.forEach(evse => {
                locationObj.evses[locationObj.evses.indexOf(evse)].uid = evse._id;
                locationObj.evses[locationObj.evses.indexOf(evse)].connectors.forEach(connector => {
                    locationObj.evses[locationObj.evses.indexOf(evse)].connectors[locationObj.evses[locationObj.evses.indexOf(evse)].connectors.indexOf(connector)].id = connector._id;
                });
            });
            locationObj.id = locationObj._id;
            locationList.push(locationObj);
        });
        

        if(offset && limit){
            if(Number(offset)+Number(limit) < dbcount){
                res.header('Link', `https://uber-electric.herokuapp.com/ocpi/cpo/2.2/locations?offset=${Number(offset)+Number(limit)}&limit=${limit}`);
            }
        }

        const timestampNow = new Date();

        return res.status(HttpStatusCodes.OK).json({
            data: locationList,
            status_code: 1000,
            status_message: 'ok',
            timestamp: timestampNow
        });

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getStationById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getEVSEById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}


const getConnectorById = async (req, res) => {
    try{
        return res.status(HttpStatusCodes.OK).json({
            success: true,
            message: "To Be Itegrated with current OCPI Standard"
          });
    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}


module.exports = {
    getListOfAllStations,
    getStationById,
    getEVSEById,
    getConnectorById
  };



//   let rawdata = fs.readFileSync(__dirname + '\\charging.json');
//   let location = JSON.parse(rawdata);
//   asyncForEach(location, async(element) => {
//       if(element.AddressInfo.AddressLine1 && element.AddressInfo.Town){

//           var listOfConnectorsPromises = [];

//           element.Connections.forEach(connection => {
//               var formalName;
//               switch(connection.ConnectionType.FormalName){
//                   case 'IEC 62196-2 Type 2':{
//                       formalName = 'IEC_62196_T2';
//                       break;
//                   }
//                   case 'IEC 62196-2':{
//                       formalName = 'IEC_62196_T2';
//                       break;
//                   }
//                   case 'IEC 62196-3 Configuration AA':{
//                       formalName = 'CHADEMO';
//                       break;
//                   }
//                   case 'IEC 62196-3 Configuration EE':{
//                       formalName = 'IEC_62196_T1_COMBO';
//                       break;
//                   }
//                   case 'IEC 62196-3 Configuration FF':{
//                       formalName = 'IEC_62196_T2_COMBO';
//                       break;
//                   }
//                   case 'SAE J1772-2009':{
//                       formalName = 'IEC_62196_T1';
//                       break;
//                   }
//                   case 'TESLA SUPERCHARGER':{
//                       formalName = 'Tesla_s';
//                       break;
//                   }
//                   case 'CEE 7/4 – SCHUKO – TYPE F':{
//                       formalName = 'DOMESTIC_F';
//                       break;
//                   }
//                   case 'IEC 60309 5-PIN':{
//                       formalName = 'IEC_60309_2_three_16';
//                       break;
//                   }
//                   case 'AS/NZS 3123 THREE PHASE':{
//                       formalName = 'DOMESTIC_I';
//                       break;
//                   }
//                   case 'TYPE I/AS 3112/CPCS-CCC':{
//                       formalName = 'DOMESTIC_I';
//                       break;
//                   }
//                   default :{
//                       formalName = null;
//                       break;
//                   }
//               }

//               var currentType;
//               switch (connection.CurrentType.Title){
//                   case 'DC' : {
//                       currentType = 'DC';
//                       break;
//                   }
//                   case 'AC (Three-Phase)' : {
//                       currentType = 'AC_3_PHASE';
//                       break;
//                   }
//                   case 'AC (Single-Phase)' : {
//                       currentType = 'AC_1_PHASE';
//                       break;
//                   }default :{
//                       currentType = null;
//                       console.log("intra in default ba");
//                       break;
                      
//                   }
//               }

//               if(formalName && currentType){
//                   var littleConnector = new Connector({
//                       standard: formalName,
//                       format: connection.ConnectionType.Title.includes('Socket') ? 'SOCKET' : 'CABLE',
//                       power_type: currentType,
//                       max_voltage: connection.Voltage || 300,
//                       max_amperage: connection.Amps || 32,
//                       max_electric_power: connection.PowerKW * 1000,
//                       last_updated: new Date().toISOString()
//                   })

//                   listOfConnectorsPromises.push(req.db.Connector.create(littleConnector));
//               }
//           })

//           var listOfConnectors = await Promise.all(listOfConnectorsPromises);
          
//           var geoLocation = new GeoLocation({
//               latitude: `${element.AddressInfo.Latitude}`,
//               longitude: `${element.AddressInfo.Longitude}`
//           });

//           var listOfEVSE = [];

//           //console.log(listOfConnectors);

//           var littleEVSE = new EVSE({
//               status: 'AVAILABLE',
//               connectors: listOfConnectors,
//               last_updated: new Date().toISOString()
//           })

//           listOfEVSE.push(await req.db.EVSE.create(littleEVSE));


//           var createLocation = new Location({
//               country_code: element.AddressInfo.Country.ISOCode,
//               party_id: "AAA",
//               publish: false,
//               address: element.AddressInfo.AddressLine1,
//               city: element.AddressInfo.Town,
//               country: element.AddressInfo.Country.ISOCode,
//               coordinates: await req.db.GeoLocation.create(geoLocation),
//               evses: listOfEVSE,
//               time_zone: "europe/bucharest",
//               last_updated: new Date().toISOString()
//           });

//           const createdLocation = await req.db.Location.create(createLocation);

//           console.log(createdLocation);
//       }
//   });