var env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if( env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://palakkeni:palakkeni5@ds127771.mlab.com:27771/sih-supply-chain';
    console.log("db connected")
  } else if( env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/SupplyChainTest';
  } else if( env === 'production' ) {
    process.env.MONGODB_URI = 'mongodb://palakkeni:palakkeni5@ds127771.mlab.com:27771/sih-supply-chain'
  }