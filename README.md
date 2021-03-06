


# Uber For Electric Cars API

This is the documentation for the Uber For Electric Cars API.

I'd like to thank ChargeTrip API and ChargeTrip Team without whom this app would have not been possible.

https://chargetrip.com/

# Endpoints

The list below shows a list of all endpoints currently available in the API for each module.

>For all request there is a `Boolean` field in the body called "success". If the value of the field is `false` then besides the error code the field "message" contains the reason of the failed request.

# Auth Module


##  Login
### Endpoint
`POST /auth/login` 

Auth: None

#### Request Body

|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email			 |String  			         |yes			               |
|password		 |String		             	 |yes    				       |

#### Example Request Body:

```json
{
	"email": "user@test.com",
	"password": "user"
}
```


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |



#### Headers:

`Auth-Token: <String>`
`Refresh-Token: <String>`

#### Example Response

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Email or password incorrect"
}
```

#### Possible error codes and messages
```json 
404 Not Found - "Email or password incorrect"
403 Forbidden - "Email is not confirmed yet"
```



## Register
### Endpoint
`POST /auth/register` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|lastName|String  			         |yes			               |
|firstName|String		             	 |yes    				       |
|phoneNumber|String|yes
|email|String| yes
|password|String| yes|

#### Example Request Body:

```json
{
	"lastName": "Black",
	"firstName": "Estelle",
	"phoneNumber": "+40777777777",
	"email": "user@test.com",
	"password": "user"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "User already exists!"
}
```

#### Possible error codes and messages
```json 
409 Conflict - "User already exists!"
```

## Forgot Password
### Endpoint
`POST /auth/forgotPassword` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email|String  			         |yes			               |
|method|String("sms"/"email")		             	 |yes    				       |

#### Example Request Body:

```json
{
	"email": "user@test.com",
	"method": "email"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "There already exists a request for this email. Please try again in few minutes"
}
```

#### Possible error codes and messages
```json 
409 Conflict - "There already exists a request for this email. Please try again in few minutes"
400 Bad Request - "Invalid method"
403 Forbidden - "Email is not confirmed yet"
```

## Validate Forgot Password
### Endpoint
`POST /auth/forgotPassword/validate` 

Auth: None

#### Request Body


|FieldName		 |Datatype						 |Required					   |
|----------------|:-------------------------------:|:-----------------------------:|
|email|String  			         |yes			               |
|code|String		             	 |yes    				       |

#### Example Request Body

```json
{
	"email": "user@test.com",
	"code": "1234"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Headers:

`Auth-Token: <String>`

>Keep in mind that this Auth-Token will only be available for 10 minutes


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "The code has expired. Please try again. Keep in mind that the code is available only 10 minutes"
}
```

#### Possible error codes and messages
```json 
401 Unauthorized - "The code has expired. Please try again. Keep in mind that the code is available only 10 minutes"
404 Not Found - "The code is not valid. Please try again"
```

## Refresh Auth Token
### Endpoint
`GET /auth/refreshToken` 

Auth: (Header) `Refresh-Token: <String>`

#### Request Body
```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Headers:

`Auth-Token: <String>`



#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
```

# User Module

## User Profile
### Endpoint
`GET /profile` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body
```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|user|User or null|


#### Example Response Body

```json
{
"success":  true,
"user":  {
	"firstName":  "Neville",
	"lastName":  "Bradlee",
	"email": "user7@test.com",
	"phoneNumber": "+40777777777",
	"paypalEmail": "sb-av47lu1696170@personal.example.com",
	"address": "Tulcea, Romania",
	"listOfCars":  [
	{
		"id":  "5d161beec9eef4c250d9d225",
		"make":  "BMW",
		"carModel":  "i3s",
		"edition":  "94 Ah",
		"power":  135,
		"acceleration":  6.9,
		"topSpeed":  160,
		"torque":  270,
		"seats":  4,
		"weight":  1340,
		"width":  1791,
		"imagesData":  {
		"image":  {
			"id":  "5d9b3a0396801cc78502c3fc",
			"url":  "https://cars.chargetrip.io/5d9b3a0396801cc78502c3fc.png",
			"width":  1536,
			"height":  864,
			"type":  "image"
		},
		"image_thumbnail":  {
			"id":  "5d9b3a136731e7d8454f925d",
			"url":  "https://cars.chargetrip.io/5d9b3a0396801cc78502c3fc-1570454033.png",
			"width":  131,
			"height":  72,
			"type":  "image_thumbnail"
		},
		"brand":  {
			"id":  "5d9b3a0396801c8eb602c3fb",
			"url":  "https://cars.chargetrip.io/5d9b3a0396801c8eb602c3fb.png",
			"width":  768,
			"height":  432,
			"type":  "brand"
		},
		"brand_thumbnail":  {
			"id":  "5d9b3a116731e718854f925c",
			"url":  "https://cars.chargetrip.io/5d9b3a0396801c8eb602c3fb-1570454033.png",
			"width":  56,
			"height":  24,
			"type":  "brand_thumbnail"
		}
		}
	},
	],
	"listOfChargingStations":  []
	}
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Change Password
### Endpoint
`POST /profile/changePassword` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|oldPassword|String or null  			         |
|newPassword|String		             	 |

#### Example Request Body
```json
{
	"oldPassword":  "password",
	"newPassword":  "p@ssword"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|`Boolean`  			         |
|message|`String or null`		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
401 Unauthorized - "Old Password incorrect"
```

## Add Car
### Endpoint
`POST /profile/addCar` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|carId|String		             	 |

#### Example Request Body
```json
{
	"carId":  "5dcd60dd0b58c082922792ea"
}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Add Charging Station
### Endpoint
`POST /profile/addStation` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Datatype						 |Description
|----------------|-------------------------------|-|
|address|String		             	 | address where the station is located (Street, number, etc)
|city|String||
|price|Float or null| Price per kwH|
|status|[Status](#StatusEVSE)| Enum of String (pick one)
|connectors|Array<[Connector](#addConnector)>| List of available connectors
|geolocation|[GeoLocation](#Location)| Precise location of the staion
|password|String|Account password for validation

#### Example request body

```json
{
	"address" : "Tulcea, Primarie",
	"city": "Tulcea",
	"price": 1,
	"status": "AVAILABLE",
	"password": "password1234",
	"connectors": [
			{
				"standard": "CHADEMO",
				"format": "SOCKET",
				"power_type": "DC",
				"max_voltage": 300,
				"max_amperage": 32,
				"max_electric_power" : 50000
			} //add more here if needed separated by comma
		],
	"geolocation": {
		"latitude": "45.178396",
		"longitude": "28.804608"
	}
}
```

### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or

```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
403 Forbidden - "Invalid token"
403 Forbidden - "Password incorrect"
403 Forbidden - "Paypal account is not set yet. Please set your paypal account first in the profile section."
406 Not Acceptable - "You cannot add more than 2 charging stations. Keep it personal not comerical."
```

## Change Profile Info

`PUT /profile/reset` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

None of the below are Required. You can send the body with any of them or combinations of them

|FieldName		 |Datatype						 |Description
|----------------|-------------------------------|-|
|firstName|String		             	 |
|lastName|String||
|phoneNumber|String|
|address|String||
|paypalEmail|String|Without an paypal email an user cannot add a charging station|

#### Request body example

```json
{
	"firstName": "Mihai",
	"lastName": "Craciun"
}
```

#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Remove car

`POST /profile/removeCar` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body


|FieldName		 |Datatype						 |Description
|----------------|-------------------------------|-|
|carId|String		             	 | If the user have multiple cars with the same ID it will remove the first one


#### Request body example

```json
{
	"carId": "5d161beac9eef4a1f1d9d21a"
}
```

#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Remove station

`POST /profile/removeStation` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body


|FieldName		 |Datatype						 |Description
|----------------|-------------------------------|-|
|stationId|String		             	 | 


#### Request body example

```json
{
	"stationId": "5eaa17090030c541f84085a2"
}
```

#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## LogOut
### Endpoint
`POST /profile/logout` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

```json
{

}
```

#### Response Body


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |


#### Example Response Body

```json
{
	"success":  true
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

# Car Module

## Get All Cars

`GET /cars/getAll`

Auth: (Header) `Auth-Token: <String>`

#### Request Body


```json
{

}
```
#### Request query


|FieldName		 |Required| Description
|----------------|-------------------------------|-|
|make|no|Filter results by car producer

#### Example request

`/cars/getAll` 

`/cars/getAll?make=Tesla` 


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (carList: Array<[Car](#Car)>) or null |

#### Example Response

```json
{
	"success":  true,
	"data" : "carList" : 
		[
			{Car},
			{Car},
			...
		]
}
```
Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```




#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```


## Get Car Info

`GET /cars/getCarInfo/:id`

Auth: (Header) `Auth-Token: <String>`

#### Request Body


```json
{

}
```

#### Example request

`/cars/getCarInfo/5d161beac9eef4a1f1d9d21a` 


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (car: [Car](#Car)) or null |

#### Example Response

```json
{
	"success":  true,
	"data" : "car" : {Car}
}
```
Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```




#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```


### Car Object<a id="Car"></a>

|FieldName		 |Datatype						 |Description|
|----------------|-------------------------------|-|
|id|String| id from DB (to be used for addCar from User Module)
|make|String	             	 | Producer of the car (e.g. Tesla)
|carModel| String | Model of the car (e.g. Model S)
|edition| String | Edition of the model (e.g. Long Range Dual Motor)
|power|Integer| Power in kW
|acceleration|Float| seconds 0-100 km/h
|topSpeed| Integer| maximum km/h
|torque| Integer |
|seats| Integer||
|weight|Integer| weight in Kg
|width|Integer| width in cm
|imagesData|[ImageData](#ImageData)| Images to display

### ImageData<a id="ImageData"></a>

|FieldName		 |Datatype						 |Description|
|----------------|-------------------------------|-|
|image|[Image](#Image)| Image of the car
|image_thumbnail|[Image](#Image)| Thumbnail for the image of the car
|brand| [Image](#Image)| Image of the brand
|brand_thumbnail| [Image](#Image)| Thumbnail for the image of the brand

### Image<a id="Image"></a>

|FieldName		 |Datatype						 |Description|
|----------------|-------------------------------|-|
|id|String| id of the image
|url|String	             	 | image source
|width| Integer|
|height| Integer| 
|type| String|Same as parent name (e.g. image_thumbnail)|

# Routing Module

### Endpoint

`POST /routes/newRoute` 

Auth: (Header) `Auth-Token: <String>`


#### Request Body

|FieldName		 |Type| Description
|----------------|-------------------------------|-|
|carID|String|Id of the car that is choosed for the trip
|max_kilometers|Integer| Maximum km the car is able to do fully charged
|kilowats_now|Float| The charging state of the car in kwH
|plugs|Array<[Plug](#Plug)>| Array of plugs that the owner will take for the trip
|adapters|Array<[Plug](#Plug)>| Array of adapters that the owner will take for the trip
|number_of_passengers| Integer | Number of people in the car during the trip
|origin| [LLAddress](#LLAddress) | Where the trip starts
|destination|[LLAddress](#LLAddress) | Where the trip ends|


#### Example Request Body
```json
{
	"carID":"5d161beac9eef4a1f1d9d21a",
	"max_kilometers": 400,
	"kilowats_now": 72.5,
	"plugs": [{ "standard": "IEC_62196_T2_COMBO", "chargingPower": 150 }, { "standard": "IEC_62196_T2", "chargingPower": 150 }, { "standard": "CHADEMO", "chargingPower": 150 }],
	"adapters": [{ "standard": "IEC_62196_T2_COMBO", "chargingPower": 150 }],
	"number_of_passengers" : 1,
	"origin": {
		"latitude": "45.6917946",
		"longitude": "27.1916718",
		"address": "Focsani, Romania"
	},
	"destination":{
		"latitude": "44.837452",
		"longitude": "24.883163",
		"address": "Pitesti, Romania"
	}
}
```

#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|route| [Route](#Route) |



#### Example Response

```json
{
	"success":  true,
	"route":  {
		"status":  "done",
		"charges":  1,
		"distance":  269164,
		"duration":  16766,
		"consumption":  79.105,
		"rangeStartKwh":  60,
		"rangeEndKwh":  9.209177264774468,
		"legs":  [
			{
				"stationId":  "5e98b30f70d0454b9c54f195",
				"chargeTime":  1948,
				"chargeKW":  28.314999999999998
			}
		],
		"polyline":  "cd{uGg|}dDfA|@jCgJdA}DRWNWRWD?HCHIHM@K@I..."
	}
}
```

Or
```json
{

"success":  true,
"route":  {
	"route":  null,
	"status":  "not_found"
	}
}
```

Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

### Datatypes

### Route<a id="Route"></a>
|Field name|Type|Description
|-|-|-|
|status|String|"done" or "not_found"|
|charges|Integer|number of chargings during the trip|
|distance|Integer| Total distance (in m)
|duration|Integer| Total duration (in s)
|consumption|Integer| Total consumption (in kW)
|rangeStartKwh|Float| Capacity at the start of the trip
|rangeEndKwh|Float| Capacity at the finish of the trip
|legs| Array<[Leg](#Leg)> | Information about the stops
|polyline| String | Used to show the line of the trip

### Leg<a id="Leg"></a>
|Field name|Type|Description
|-|-|-|
|stationId|String|
|chargeTime|Float| Charging time (in s)
|chargeKW| Float | The amount of energy needed to be charged (in KW)


### Plug<a id="Plug"></a>
|Field name|Type|Description
|-|-|-|
|standard|[Standard](Standard)
|chargingPower|Integer|maximum charging power in KW the plug or adapter is able to output

### LLAddress<a id="LLAddress"></a>
|Field name|Type|Description
|-|-|-|
|latitude|String||
|longitude|String||
|address|String| A simple representation of the address in string (e.g. "Tulcea, Romania")

# Payment Module

## Intend

### Endpoint

`POST /payment/intend` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

|FieldName		 |Type| Description
|----------------|-------------------------------|-|
|stationId|String|Id of the station where the payment is headed
|kwH|Float| KwH that was charged at that station

#### Example Request Body

```json
{
	"stationId": "5eb315e3585c010017b04e57",
	"kwH": 17.40
}
```

#### Response Body

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|success|Boolean  			         |
|message|String or null		             	 |
|payment| String | Link to be redirected for payment

#### Example Response Body

```json
{
	"success":  true,
	"payment":  "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-3G715305G50383242"
}
```
Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

## Payments List
### Endpoint

`GET /payment/payments` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

`{
}`

#### Request Query

FieldName		 |Default| Description
|----------------|-------------------------------|-|
|last|false| if you want only the last payment set to true

#### Example Request

`/payment/payments` 

Or

`/payment/payments?last=true`

#### Response Body

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|success|Boolean  			         |
|message|String or null		             	 |
|payments| Array<[Payment](#Payment)>| Array of payments where the user is the consumer

#### Example Response Body

```json
{
	"success":  true,
	"payments":  [
		{
			"id":  "5eb41d4df0aaa47ac47fc7e3",
			"status":  "complete",
			"provider":  "Miruna Cezar",
			"providerEmail":  "user2@test.com",
			"consumer":  "Aysha Galvan",
			"consumerEmail":  "user8@test.com",
			"pricePerKwCharged":  1.5,
			"totalPrice":  49.349999999999994,
			"kwCharged":  32.9,
			"createdDate":  "2020-05-07T14:38:05.370Z",
			"lastStatusUpdate":  "2020-05-07T14:38:33.616Z"
		},
		...
	]
}
```

Or

```json
{
	"success":  false,
	"message":  "Token not found"
}
```

## Payouts List
### Endpoint

`GET /payment/payouts` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body

`{
}`

#### Request Query

FieldName		 |Default| Description
|----------------|-------------------------------|-|
|last|false| if you want only the last payout set to true

#### Example Request

`/payment/payouts` 

Or

`/payment/payouts?last=true`

#### Response Body

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|success|Boolean  			         |
|message|String or null		             	 |
|payments| Array<[Payment](#Payment)>| Array of payments where the user is the provider

#### Example Response Body

```json
{
	"success":  true,
	"payments":  [
		{
			"id":  "5eb41d4df0aaa47ac47fc7e3",
			"status":  "complete",
			"provider":  "Miruna Cezar",
			"providerEmail":  "user2@test.com",
			"consumer":  "Aysha Galvan",
			"consumerEmail":  "user8@test.com",
			"pricePerKwCharged":  1.5,
			"totalPrice":  49.349999999999994,
			"kwCharged":  32.9,
			"createdDate":  "2020-05-07T14:38:05.370Z",
			"lastStatusUpdate":  "2020-05-07T14:38:33.616Z"
		},
		...
	]
}
```

Or

```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

### Datatypes

### Payment<a id="Payment"></a>
|Field name|Type|Description
|-|-|-|
|id|String|id of the payment|
|status|String|"pending" or "complete" or "cancelled"|
|provider|String| Name of the provider (the one who received money)
|providerEmail|String| Email of the provider (the one who received money)
|consumer|String| Name of the consumer (the one who paid money)
|consumerEmail|String| Email of the consumer (the one who paid money)
|pricePerKwCharged|Float| price charged per KwH
|totalPrice| Float | Total price charged
|kwCharged| Float| How many kwH the total price means
|createdDate| String | ISOstring Date format meaning when the payment was created (status pending)
|lastStatusUpdate| String | ISOstring Date format meaning when the payment status was updated


# Station Module


##  Get All Stations
### Endpoint
`GET /station/getAll` 

Auth: (Header) `Auth-Token: <String>`

#### Request Body


```json
{

}
```


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (stationList : Array<[Station](#station)>) or null |



#### Example Response

```json
{
	"success":  true,
	"data" : "stationList" : 
		[
			{Station},
			{Station},
			...
		]
	
}
```


Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
```

##  Get Nearby Stations
### Endpoint
`GET /station/getNearby` 

Auth: (Header) `Auth-Token: <String>`

#### Query variables

|FieldName		 |Required					   |Notices |
|----------------|:-------------------------------:|-----------------------------|
|latitude|yes			               ||
|longitude|yes    				       ||
|distance|no  | default 5000
|amenities| no |If there are multiple amenities they should be separated with a comma|

#### Request Body
```json
{

}
```

#### Request Examples
`/station/getNearby?latitude=44.435398&longitude=26.102527`

`/station/getNearby?latitude=44.435398&longitude=26.102527&distance=4000`

`/station/getNearby?latitude=44.435398&longitude=26.102527&distance=4000&amenities=supermarket,hospital` 


#### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |
|data| (stationAround : Array<[Station](#station)>) or null |



#### Example Response

```json
{
	"success":  true,
	"data" : "stationAround" : 
		[
			{Station},
			{Station},
			...
		]
	
}
```


Or
```json
{
	"success":  false,
	"message":  "Token not found"
}
```

#### Possible error codes and messages
```json 
403 Forbidden- "Invalid token"
401 Unauthorized - "Token not found"
401 Unauthorized - "Token Expired"
400 Bad Request - "latitude and longitude are required for this request"
```

### Station Object <a id="station"></a>

|Field name|Type|Description
|-|-|-|
|id|String| ChargeTrip ID
|externalID|String| API database ID
|coordinates|[Coordinates](#Location)|The geo location coordinates
|evses|Array< [Evse](#Evse) >|An array of embedded Charger
|chargers|Array <[Charger](#Charger) >|Groups of EVSEs by power and type
|physical_address|[Address](#Address)|The embedded Address
|amenities|[Amenities](#Amenities) or null|An object with amenity types as key and number of amenities as value
|speed|[StationSpeedType](StationSpeedType)| The global charging speed type for the station
|user|[User](#Operator) or null| Information about the user who has the station (or null if public)
|price_per_kw| Float or null | Price in RON/kwH (null if unknown or public)


### Evse <a id="Evse"></a>
|Field name|Type|Description
|-|-|-|
|uid|String | ID from the API
|status|[StatusEVSE](#StatusEVSE) | ENUM of String
|connectors|Array <[Connector](#Connector)>  

### Charger <a id="Charger"></a>
|Field name|Type|Description
|-|-|-|
|standard|[Standard](#Standard) | Enum of String
|power|Float| output power in kW
|status| [Status](#Status) |
|speed|[StationSpeedType](#StationSpeedType)
|total|Int|Total number of chargers


### Address <a id="Address"></a>
|Field name|Type|Description
|-|-|-|
|city|String
|street|String
|number|String


### Coordinates<a id="Location"></a>
|Field name|Type|Description
|-|-|-|
|latitude|String
|longitude|String|

### Amenities <a id="Amenities"></a>

|Field name|Type|Description
|-|-|-|
|restaurant|Integer|
|bathroom|Integer|
|supermarket|Integer|
|playground|Integer| 
|coffee|Integer|
|shopping|Integer| 
|museum|Integer|
|hotel|Integer|
|park|Integer|
|pharmacy|Integer| 

### Operator<a id="Operator"></a>

|Field name|Type|Description
|-|-|-|
|_id| String | id from API
|firstName| String
|lastName| String
|email| String
|phoneNumber| String

### Connector <a id="Connector"></a>

|Field name|Type|Description
|-|-|-|
|id|String|Id from API (or null for some reason..)
|standard|[Standard](#Standard)| Enum of String
|format|[Format](#Format)| Enum of String
|power_type|[PowerType](#PowerType)| Enum of String
|max_amperage|Integer| max amperage in A
|max_voltage|Integer| max voltage in V
|max_electric_power|Integer| max output electric power in W
|power|Integer| max output electric power in kW

### Status<a id="Status"></a>

|Field name|Type|Description
|-|-|-|
|free|Integer|
|busy|Integer|
|unknown|Integer|
|error|Integer|

### Connector(add Station Request)<a id="addConnector"></a>
|FieldName|Type| Description|
|-|-|-|
|standard|[Standard](#Standard) | Enum of String (pick one)
|format|[Format](#Format) | Enum of String (pick one)
|power_type|[PowerType](#PowerType) | Enum of String (pick one)
|max_voltage| Integer | Max voltage in V
|max_amperage| Integer | Max amperage in A
|max_electric_power| Integer | Max power in W !!! (not kW)

### StationSpeedType(ENUM) <a id="StationSpeedType"></a>
|Field name|
|-|
|"slow"|
|"fast"|
|"turbo"|

### StatusEVSE(ENUM) <a id="StatusEVSE">

|Field name|
|-|
  |'AVAILABLE'
 | 'BLOCKED'
  |'CHARGING'
  |'INOPERATIVE'
  |'OUTOFORDER'
  |'PLANNED'
  |'REMOVED'
  |'RESERVED'
  |'UNKNOWN'


### Format(ENUM) <a id="Format"></a>
|Field name|
|:-|
|CABLE
|SOCKET

### PowerType(ENUM)<a id="PowerType"></a>
|Field name|
|:-|
|AC_1_PHASE
|AC_3_PHASE
|DC



### Standard(ENUM) <a id="Standard"></a>
|Field name|
|:-|
|'CHADEMO'|
|'DOMESTIC_A'|
|'DOMESTIC_B'|
|'DOMESTIC_C'|
|'DOMESTIC_D'|
|'DOMESTIC_E'|
|'DOMESTIC_F'|
|'DOMESTIC_G'|
|'DOMESTIC_H'|
|'DOMESTIC_I'|
|'DOMESTIC_J'|
|'DOMESTIC_K'|
|'DOMESTIC_L'|
|'IEC_60309_2_single_16'|
|'IEC_60309_2_three_16'|
|'IEC_60309_2_three_32'|
|'IEC_60309_2_three_64'|
|'IEC_62196_T1'|
|'IEC_62196_T1_COMBO'|
|'IEC_62196_T2'|
|'IEC_62196_T2_COMBO'|
|'IEC_62196_T3A'|
|'IEC_62196_T3C'|
|'PANTOGRAPH_BOTTOM_UP'|
|'PANTOGRAPH_TOP_DOWN'|
|'TESLA_R'|
|'TESLA_S'|