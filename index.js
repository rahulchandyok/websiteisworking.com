function getResponse() {
  let website = document.getElementById("domain").value
  console.log(website)
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText)
      console.log(response)
      if (response['statusCode'] != 200) {
        let errorResponse = response['returnedUrl'] + " " + response['statusText']
        document.getElementById("error").innerHTML = errorResponse
      }
      else {
        let successResponse = response['returnedUrl'] + " is " + (response['isDown'] ? "not working" : "working")
        console.log(successResponse)
        document.getElementById("success").innerHTML = successResponse
      }
    }
  }
  xhttp.open("GET", "https://api.downfor.cloud/httpcheck/" + website, true)
  xhttp.send()
}