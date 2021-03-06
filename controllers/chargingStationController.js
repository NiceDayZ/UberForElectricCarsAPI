const HttpStatusCodes = require("http-status-codes");
const chargetrip = require("./chargetrip");
const Location = require("../models").Location;


const getListOfAllChargingStations = async (req, res) => {
    try{
        
          const data = await chargetrip.getListOfChargingStations();

          //console.log(data);

          let locationPromisesArray = [];
          data.stationList.forEach(location => {
            locationPromisesArray.push(req.db.Location.findOne({
              _id: location.id
            }).populate('user'));
          });

          let locationArray = await Promise.all(locationPromisesArray);

          locationArray.forEach((location, index) => {
            if(location.user){
              data.stationList[index].user = {
                _id: location.user._id,
                firstName: location.user.firstName,
                lastName: location.user.lastName,
                email: location.user.email,
                phoneNumber: location.user.phoneNumber
              };
            }else{
              data.stationList[index].user = null;
            }
            if(location.price_per_kw){
              data.stationList[index].price_per_kw = location.price_per_kw;
            }else{
              data.stationList[index].price_per_kw = null;
            }
          });
            
          return res.status(HttpStatusCodes.OK).json({
            success: true,
            data: data
          });
            

    }catch(err){
        console.error(err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something bad happen!"
          });
    }
}

const getNearbyChargingStations = async (req, res) => {
    try{

      
      if(!req.query.latitude || !req.query.longitude){
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            success: false,
            message: "latitude and longitude are required for this request"
          });
      }
      
      const latitude = Number(req.query.latitude);
      const longitude = Number(req.query.longitude);

      let distance = 5000;
      if(req.query.distance){
        distance = Number(req.query.distance);
      }

      const amenities = req.query.amenities;
      let amenitiesArray = amenities ? amenities.split(',') : null;

      const data = await chargetrip.getNearbyListOfChargingStations(latitude, longitude, distance, amenitiesArray);

          let locationPromisesArray = [];
          data.stationAround.forEach(location => {
            locationPromisesArray.push(req.db.Location.findOne({
              _id: location.id
            }).populate('user'));
          });

          let locationArray = await Promise.all(locationPromisesArray);

          locationArray.forEach((location, index) => {
            if(location.user){
              data.stationAround[index].user = {
                _id: location.user._id,
                firstName: location.user.firstName,
                lastName: location.user.lastName,
                email: location.user.email,
                phoneNumber: location.user.phoneNumber
              };
            }else{
              data.stationAround[index].user = null;
            }
            if(location.price_per_kw){
              data.stationAround[index].price_per_kw = location.price_per_kw;
            }else{
              data.stationAround[index].price_per_kw = null;
            }
          });
            
      return res.status(HttpStatusCodes.OK).json({
        success: true,
        data: data
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
    getListOfAllChargingStations,
    getNearbyChargingStations
  };