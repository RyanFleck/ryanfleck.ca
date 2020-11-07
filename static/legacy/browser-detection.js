//!!!MNP

var exemption;
// get the browser name and version
function get_browser() {
    // var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+(\.?\d+)+)/i) || [];
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident|WorxWeb(?=\/))\/?\s*(\d+(\.?\d+)+)/i) || [];
    console.log("DEBUG: User-agent string: "+ua);
    exemption = navigator.userAgent.includes("Chrome");
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Edge', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }
// if number 1 is >= number 2 it return true,
// false otherwise
function compareVersion(number1, number2){
   if(number1 == number2){ return true; }
   var num1 = number1.split(".");
   var num2 = number2.split(".");
   for (var i = 0; i < num1.length && i < num2.length; i++) {
      if(parseInt(num1[i]) > parseInt(num2[i])){ return true; }
      if(parseInt(num1[i]) < parseInt(num2[i])){ return false; }
   }
   return false;
}
// call the function as, check_browser_support({chrome:"44.0.2403.133", internetExplorer: "10.0", firefox: "45.0", safari: "8.0"})
// returns true if the browser's version is greater than or equal to passed parameter, false otherwise
function check_browser_support(browserVersions){
  var browser=get_browser();
  var name = browser.name;
  console.log("DEBUG: Detected "+browser.name+" browser.");

  var version = browser.version;
  var flag = false;
  switch(name){
    case "IE":
    case "MSIE":
      flag = compareVersion(version, browserVersions.internetExplorer);
      break;
    case "Firefox":
      flag = compareVersion(version, browserVersions.firefox);
      break;
    case "Chrome":
      flag = compareVersion(version, browserVersions.chrome);
      break;
    case "Edge":
      flag = true;
      break;
    case "Safari":
      flag = compareVersion(version, browserVersions.safari);
      break;
    case "WorxWeb":
        flag = compareVersion(version, browserVersions.WorxWeb);
        break;
    default:
      flag = false;
  }
  return flag;
}


if(!check_browser_support({chrome:"44.0.2403.133", internetExplorer: "10.0", firefox: "45.0", safari: "8.0", WorxWeb:"10.8.20"}) && sessionStorage.getItem('warningshown') != "1"){
  //alert("Browser not supported! Please update your browser");
  console.log("DEBUG: Browser warning activated, please upgrade.");
  sessionStorage.setItem('warningshown', '1');
} else if (sessionStorage.getItem('warningshown') == "1") {
  console.log("DEBUG: Warning has already been shown, or browser is supported. Alert hidden.");
} else {
  sessionStorage.setItem('warningshown', '1');
  console.log("DEBUG: Browser supported. Session storage item set.");
}

if(!exemption){
console.log("DEBUG: Exemption = "+exemption);}

if(exemption){
  console.log("EXEMPTION DETECTED")
  sessionStorage.setItem('warningshown', '1');
}
