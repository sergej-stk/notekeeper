function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

window.onload = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const responseText = httpGet("/list.json");
  let json = null;

  try {
    json = JSON.parse(responseText);
  } catch (e) {
    console.log(e);
    return;
  }

  if (json === null) {
    return;
  }

  const listRootElement = document.getElementById("body");

  for (const element of json) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(element);
    newDiv.onclick = () => {
      window.location.replace('/?file='+element);
    }

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    listRootElement.appendChild(newDiv);
  }

  let file = json[0];

  if (urlParams.has("file")) {
    file = urlParams.get("file");
  } else {
    window.location.replace('/?file='+file);
  }

  window.ui = SwaggerUIBundle({
    url: "swagger/"+file,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};

