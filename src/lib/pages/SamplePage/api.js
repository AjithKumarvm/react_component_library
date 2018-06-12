/*
  //POST CALL
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const headers = {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify({})
  };
  fetch(`url`,headers).then(function(response) {
    return response.json();
  }).then(function(json) {
    if(json){
      //execute
    }else{
      throw "error";
    }
  }).catch(function(error){
    console.error('error',error);
    //error handling
  });
*/