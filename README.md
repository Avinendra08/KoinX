# KoinX_CryptoCoin
KoinX_Crypto is a Node.js-based backend service designed for handling cryptocoin data. It includes a background task which updates crypto stats after every two hours, storing it in MongoDB, 
and APIs for querying latest stats and standard deviation of price of any CryptoCoin.

## Prerequisites
1. MongoDB running locally or on Atlas and its URL
2. Nodejs installed locally ([How to install NodeJS ?](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))


## Setup
### Local Nodejs Instance
1. Clone the repository using ```git clone https://github.com/Avinendra08/KoinX.git``` and navigate to the folder.
2. Create a ```.env``` file in root folder
   
   ``` bash
   touch .env
   ```
3. Enter the following details in the ```.env``` file

   ``` bash
   MONGODB_URI = YOUR_MONGO_URL
   PORT = 8000
   
4. Open the terminal in the root folder and run the following commands :

   ``` bash
   npm install
   ```
5. Run the server in Dev mode using
    ``` bash
    npm run dev
    ```
    or use command
   ``` bash
    npm start
   ``` 
6. Once this is done, the server is up and runnning at port 8000

   ``` bash
    MongoDB connected !! DB HOST: cluster0-shard-00-02.ebe6f.mongodb.net
    Server is running at port : 8000
   ```
   

## Architecture
### Tech Stack
- Backend - **NodeJS**

  Node.js is used for making the backend as it is developer friendly and allows use to build scalable application at ease.
- Database - **MongoDB**

  MongoDB is as it provides complete flexibility over schema and facilitates faster & accessible development with help of its cloud clusters.
  It can also cater to handle large data and it read/write using various features like indexes.


## API Endpoints
## Get latest stats for crypto coin
   Endpoint: /crypto/getLatestCryptoStats
   
   Method: GET
   
   Description: Get latest price,marketCap and 24 hour change for given Crypto Coin

   Request: query paramter giving coin name.

   GET https://koinx-1-xi6m.onrender.com/crypto/getLatestCryptoStats?coin=bitcoin

   Sample output:

   {
   
    "message": "Latest stats for bitcoin are:",
    "price": 60942,
    "marketCap": 1204576964618.615,
    "24hChange": -2.447817589359127
   }

## Get standard deviation of price for crypto coin
   Endpoint: /api/getAssetBalance
   
   Method: GET
   
   Description: Get the standard deviation of price for last 100 entries of crypto coin.
   
   Request: query paramter giving coin name.

   GET https://koinx-1-xi6m.onrender.com/crypto/getCryptoDeviation?coin=bitcoin

    Sample output:

  {
  
    "deviation": 47.6386397790701
  }
   
