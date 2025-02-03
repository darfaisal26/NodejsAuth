const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {sql, connectToDB} = require("./Config/db");
const app = express();
app.use(cors());
app.use(bodyParser.json());


const testQuery = async () => {
  try {
    await connectToDatabase();

    // const result = await sql.query`SELECT TOP 10 * FROM SomeTable`; 
    // console.log(result.recordset); 

    sql.close();
  } catch (error) {
    console.error('Error running query', error);
  }
};

testQuery();


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
