
const getFFEntryDetails = (dbName, data) => {
  console.log(dbName);
  for(let entry in data){
    let details = data[entry];
    console.log(entry + " comp " + dbName);
    if(entry == dbName) return details;
  }
}

export default getFFEntryDetails;