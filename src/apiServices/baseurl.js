let url = "";

if (window.location.href.includes("localhost")) {
  //url = "http://audit.capmtech.com/";
  url = "http://brainmidas.com/";
} else if (window.location.href.includes("139.162.5.110")) {
  url = "http://audit.capmtech.com/";
} else {
  url = "http://beta.capmtech.com/";
}

console.log("localhost", window.location.href.includes("localhost"));

export const BACKEND_BASE_URL = url;
