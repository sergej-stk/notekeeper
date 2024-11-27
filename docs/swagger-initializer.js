function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let activeDiv = null;

function loadListData() {
  const responseText = httpGet("/list.json");
  let responseObject = null;
  
  try {
    responseObject = JSON.parse(responseText);
  } catch (e) {
    console.log(e);
    return null;
  }

  return {
    swaggerFiles: responseObject.swaggerFiles,
    asyncApiFiles: responseObject.asyncApiFiles
  };
}

function loadAsyncApiHtml(file) {
  return httpGet("/asyncapi/docs/" + file + "/index.html");
}

window.onload = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const listData = loadListData();

  if (listData === null) {
    return;
  }

  let file = listData.swaggerFiles[0];

  if (urlParams.has("file")) {
    file = urlParams.get("file") + ".swagger.json";
  } else {
    window.location.replace('/?file='+file.replace(".swagger.json", ""));
  }

  const listRootElement = document.getElementById("body");

  for (const element of listData.swaggerFiles) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(element.replace(".swagger.json", ""));

    if (element.replace(".swagger.json", "") === file.replace(".swagger.json", "")) {
      newDiv.classList.add("active");
      activeDiv = newDiv;
    } 

    newDiv.onclick = () => {
      if (activeDiv === newDiv) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('file', element.replace(".swagger.json", ""));
      window.history.pushState({}, '', currentUrl);

      initSwagger(element);

      if (activeDiv !== null) {
        activeDiv.classList.remove("active");
      }
      activeDiv = newDiv;
      newDiv.classList.add("active");
    } 

    newDiv.appendChild(newContent);
  
    listRootElement.appendChild(newDiv);
  }

  for (const element of listData.asyncApiFiles) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(element.replace(".yaml", ""));

    if (element.replace(".yaml", "") === file.replace(".yaml", "")) {
      newDiv.classList.add("active");
      activeDiv = newDiv;
    } 

    newDiv.onclick = () => {
      if (activeDiv === newDiv) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('file', element.replace(".yaml", ""));
      window.history.pushState({}, '', currentUrl);

      initAsyncApi(element);

      if (activeDiv !== null) {
        activeDiv.classList.remove("active");
      }
      activeDiv = newDiv;
      newDiv.classList.add("active");
    } 

    newDiv.appendChild(newContent);
  
    listRootElement.appendChild(newDiv);
  }

  if (file.endsWith(".yaml")) {
    initAsyncApi(file);
    return;
  }
  initSwagger(file);
};

function initSwagger(file) {
  const swaggerUiElement = document.getElementById("swagger-ui");
  
  swaggerUiElement.innerHTML = "";

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
}

function initAsyncApi(file) {
  const swaggerUiElement = document.getElementById("swagger-ui");
  swaggerUiElement.innerHTML = "";
  window.ui = null;
  const newDiv = document.createElement("iframe");
  newDiv.style.width = "100%";
  newDiv.style.height = "100%";
  newDiv.src = "asyncapi/docs/" + file + "/index.html";

  swaggerUiElement.appendChild(newDiv);
}