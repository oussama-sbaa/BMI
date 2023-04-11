
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3299


const fs = require('fs');
const https = require('https');
const path = require('path');
const key = fs.readFileSync('server.key');
const cert = fs.readFileSync( 'server.cert');
const options = { key, cert };

const jwt = require('jsonwebtoken');
// clé secrète qui sera utilisée pour signer le jeton JWT
const secretKey = 'ma-clé-secrete';


app.use(express.json())



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true })); 

function BMIChecker( Weight,  Height) {
  var BMI = (Weight / ( Height * 2) ) * 100;  
  return BMI;
}

    
app.post('/api/imc', (req, res) => {
  console.log(req.body)
    var Weight = req.body.weight;
    var Height = req.body.height;
    BMI_Result = null;

    
    BMI_Result = BMIChecker( Weight, Height );
    console.log(BMI_Result);
    res.send({ BMI_Result });
   

       
})



https.createServer(options, app).listen(port, () => {
  console.log('App is running ! Go to https://localhost:'+port);
});



// cette route  générera un jeton JWT pour le client
app.get('/authentifier', (req, res) => {
  const token = jwt.sign({}, secretKey, { expiresIn: '1h' });
  res.json({ token });
});


// Fonction middleware  qui vérifiera le jeton JWT , Ici, nous définissons une fonction middleware qui vérifie l'en-tête Authorization pour un jeton JWT. Si le jeton est manquant, nous renvoyons une erreur 401. Si le jeton est présent, nous utilisons la méthode jwt.verify() pour vérifier le jeton en utilisant la secretKey. Si le jeton est valide, nous définissons la propriété req.user sur un objet qui contient l'id de l'utilisateur décodé à partir du jeton, et appelons la fonction next() pour passer le contrôle à la prochaine fonction middleware.
function authentifier(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'L\'authentification a échoué' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = { id: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'L\'authentification a échoué' });
  }
}

// on utilise la fonction authentifier pour protger notre route
app.get('/api/imc', authentifier, (req, res) => {
  res.json({ message: 'Protected data' });
});

