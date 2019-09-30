function getResponse() {
  let website = document.getElementById("domain").value
  console.log(website)
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText)
      console.log(response)
      document.getElementById("success").innerHTML = response['returnedUrl'] + " is " + (response['isDown'] ? "not working" : "working")
    }
  }
  xhttp.open("GET", "https://api.downfor.cloud/httpcheck/" + website, true)
  xhttp.send()
}