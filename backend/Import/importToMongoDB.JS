const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://zivorad:123@cluster0.pf2r2iy.mongodb.net/levelup?retryWrites=true&w=majority'; 
const DB_NAME = 'levelup';  
const COLLECTION_NAME = 'items';  
const FOLDER_PATH = "C:/Users/Zivorad/Personal/Projekti/DESADV project/data/DESADVdata";

function parseLine(line, fileName) {
  const [
    Material, Quantity, DeliveryID, DocumentID, TrackingNumber, HWB, ContractNumber,
    PONR_LINE, SONR, InvoiceNr, DespatchDate, ArrivalDate, IncoTerm, DAPackages,
    PackListNR, TransportMode, Carrier, VanID, ICR,
    MessageDate, LIG1, CTR1, FV1, LIG2, CTR2, FV2, LIG3, CTR3, FV3,
    SupplierMaterial, Weight, KEY, Line
  ] = line.split('|'); 

  const data = {
    Material,
    Quantity: parseInt(Quantity),
    DeliveryID,
    DocumentID,
    TrackingNumber,
    HWB,
    ContractNumber,
    PONR_LINE,
    SONR,
    InvoiceNr,
    DespatchDate,
    ArrivalDate,
    IncoTerm,
    DAPackages,
    PackListNR,
    TransportMode,
    Carrier,
    VanID,
    ICR,
    MessageDate,
    LIG1,
    CTR1,
    FV1,
    LIG2,
    CTR2,
    FV2,
    LIG3,
    CTR3,
    FV3,
    SupplierMaterial,
    Weight: parseFloat(Weight),
    KEY,
    Line: parseInt(Line),
    FileName: fileName
  };

  return data;
}

async function convertToMongoDB(folderPath) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Konekcija sa MongoDB-om uspesna!');

    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    async function processFile(filePath) {
      const fileName = path.basename(filePath);
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of rl) {
        const data = parseLine(line, fileName);
        await collection.insertOne(data);
      }

      console.log(`Ubacen fajl: ${filePath}`);
    }

    async function processDirectory(directoryPath) {
      const files = fs.readdirSync(directoryPath);

      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
          await processFile(filePath);
        } else if (stat.isDirectory()) {
          await processDirectory(filePath);
        }
      }
    }

    await processDirectory(folderPath);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

convertToMongoDB(FOLDER_PATH);