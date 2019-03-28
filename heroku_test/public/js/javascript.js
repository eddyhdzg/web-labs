console.log('Javascript del lado cliente')


fetch('http://localhost:3000/omdb?search=Bandersnatch', {mode: 'cors'}).then(function(response) {
  response.json().then(function (data) {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.title); 
      console.log(data.plot);
    }
  })
})