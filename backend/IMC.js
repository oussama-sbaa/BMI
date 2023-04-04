
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

function getSuggestions(imc){
  let suggestions = {
    recommandations : "",
    conseils : ""
  }
  if ( imc < 18.5) {
    suggestions.recommandations = "consulter un médecin pour évaluer la cause de la maigreur et établir un plan de traitement, incluant une alimentation équilibrée et de l'exercice régulier"
    suggestions.conseils = "Manger des aliments riches en protéines et en calories, comme des noix, des graines, des légumineuses, des viandes maigres, des produits laitiers, des fruits et des légumes"
  } else if ( imc >= 18.5 && imc <= 24.9 ) {
    suggestions.recommandations = "maintenir une alimentation saine et équilibrée, ainsi qu'un mode de vie actif et sain"
    suggestions.conseils = "faire régulièrement de l'exercice, manger des aliments variés riches en nutriments, éviter les aliments transformés et riches en gras, en sucre et en sel"
  } else if ( imc >= 25 && imc <= 29.9 ) {
    suggestions.recommandations = "réduire progressivement le poids corporel à l'aide d'une alimentation saine et d'un programme d'exercice physique régulier"
    suggestions.conseils = "manger des aliments sains et équilibrés en quantité modérée, faire régulièrement de l'exercice, réduire la consommation d'aliments riches en graisses, en sucre et en sel"
  } else if ( imc >= 30 && imc <= 34.9 ) {
    suggestions.recommandations = "consulter un médecin pour évaluer les risques pour la santé et mettre en place un plan de perte de poids adapté."
    suggestions.conseils = "réduire la consommation de graisses saturées et de sucres, manger des aliments riches en fibres, faire régulièrement de l'exercice physique modéré"
  } else if ( imc >= 35 && imc <= 39.9 ) {
    suggestions.recommandations = "consulter un médecin pour évaluer les risques pour la santé et mettre en place un plan de perte de poids adapté"
    suggestions.conseils = "réduire la consommation de graisses saturées et de sucres, manger des aliments riches en fibres, faire régulièrement de l'exercice physique modéré"
  } else if ( imc >= 40 ) {
    suggestions.recommandations = "consulter un médecin pour évaluer les risques pour la santé et mettre en place un plan de perte de poids adapté"
    suggestions.conseils = "suivre un régime alimentaire équilibré et surveillé par un professionnel de la santé, pratiquer une activité physique régulière adaptée, envisager des traitements médicaux ou chirurgicaux pour perdre du poids"
  }

  return suggestions
}
    
app.post('/api/imc', (req, res) => {
  console.log(req.body)
    var Weight = req.body.weight;
    var Height = req.body.height;
    BMI_Result = null;

    
    BMI_Result = BMIChecker( Weight, Height );
    console.log(BMI_Result);

    const suggestions = getSuggestions(BMI_Result)
    res.send({ 
      imc:  BMI_Result,
      suggestions: suggestions
    });
   

       
})



https.createServer(options, app).listen(port, () => {
  console.log('App is running ! Go to https://localhost:'+port);
});
