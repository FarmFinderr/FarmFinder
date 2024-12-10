import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import NotifiactionsRoutes from './routes/NotifiactionsRoutes.js';


// import { Eureka } from 'eureka-js-client';

// dotenv.config();

// const eurekaHost = process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1';
// const eurekaPort = 8761;
// const hostName = process.env.HOSTNAME || 'localhost';
// const ipAddr = '192.168.1.168';

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(bodyParser.json());

// const registerWithEureka = function (appName, PORT) {
//   const client = new Eureka({
//     instance: {
//       app: appName,
//       hostName: hostName,
//       ipAddr: ipAddr,
//       port: {
//         '$': PORT,
//         '@enabled': 'true',
//       },
//       vipAddress: appName,
//       dataCenterInfo: {
//         '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
//         name: 'MyOwn',
//       },
//     },
//     eureka: {
//       host: eurekaHost,
//       port: eurekaPort,
//       servicePath: '/eureka/apps/',
//       maxRetries: 10,
//       requestRetryDelay: 2000,
//     },
//   });

//   client.logger.level('debug');

//   client.start((error) => {
//     console.log(error || "Post service registered");
//   });

//   function exitHandler(options, exitCode) {
//     if (options.cleanup) {
//       console.log('Cleaning up...');
//     }
//     if (exitCode || exitCode === 0) console.log(exitCode);
//     if (options.exit) {
//       client.stop(() => {
//         console.log('Eureka client stopped.');
//       });
//     }
//   }

//   client.on('deregistered', () => {
//     process.exit();
//     console.log('After deregistered');
//   });

//   client.on('started', () => {
//     console.log(`Eureka host: ${eurekaHost}`);
//   });

//   process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// };

//registerWithEureka('Posts-service', PORT);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notifs")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define your routes
app.get('/', (req, res) => {
 // res.send('Welcome to the Posts Microservice!');
 res.status(200).send('Microservice Express.js is working correctly');
});

app.use('/notifs', NotifiactionsRoutes);


// Start Express server
app.listen(PORT, () => {
  console.log(`Express service running on http://localhost:${PORT}`);
});
