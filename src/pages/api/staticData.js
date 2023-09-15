// import path from 'path';
// import { promises as fs } from 'fs';

// export default async function handler(req, res) {
//   //Find the absolute path of the json directory
//   const jsonDirectory = path.join(process.cwd(), 'json');
//   //Read the json data file data.json
//   const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
//   //Return the content of the data file in json format
//   res.status(200).json(fileContents);
// }

import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '/tmp/data.json');

export default async function handler(req, res) {

  if (req.method === 'GET') {
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    res.status(200).json(objectData);
  }else if(req.method === "POST"){
    try {
        // Read the existing data from the JSON file
        const jsonData = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(jsonData);
        console.log("object Data :",objectData)
        // Get the data from the request body
        const { name, email } = req.body;
        
        // Add the new data to the object
        const newData = {
          name,
          email
        };
        // objectData.push(newData);
        console.log("New Data :",newData)
        // Convert the object back to a JSON string
        const updatedData = JSON.stringify(newData);
  
        // Write the updated data to the JSON file
        await fsPromises.writeFile(dataFilePath, updatedData);
  
        // Send a success response
        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ message: 'Error storing data' });
      }
  }

}