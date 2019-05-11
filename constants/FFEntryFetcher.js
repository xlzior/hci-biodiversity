
const getFFEntryDetails = (dbName, data) => {
  for(let entry in data){
    let details = data[entry];
    if(entry == dbName) return details;
  }
}

export default getFFEntryDetails;