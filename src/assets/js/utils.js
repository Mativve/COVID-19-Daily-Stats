const countries = require("../js/countries.json");
const dayjs = require('dayjs');
const dayjs_customParseFormat = require('dayjs/plugin/customParseFormat');
require('dayjs/locale/pl');
dayjs.extend(dayjs_customParseFormat);

function numberWithSpaces(x){
    if( x === 0 ){
        return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function searchCountry(x, y = ""){

    let find = countries.find((el) => {
        if( y.length === 0 ){
            return (el.iso2.includes(x) || el.iso3.includes(x) || el.name.includes(x));
        }
        else{
            return (el[y].includes(x));
        }
    });

    return find;
}

function filterCountries(x, y = "name"){

    let filtered = [];
    const countries_dup = JSON.parse(JSON.stringify(countries))

    if( y !== "" ){
        filtered = countries_dup.filter((el) => {
            const string = el.name.toLowerCase();
            return ( string.includes( x.toLowerCase() ) );
        });
    }
    else{
        console.log("[filterCountries] 'y' cannot be empty!");
    }

    return filtered;
}

function returnCountries(){
    return countries;
}

function parseDateToHuman($date){
    return dayjs($date).format('DD.MM.YYYY HH:mm');
}

function getTitle(vm){
    const { metaTags } = vm.$data;
    if (metaTags.title) {
      return typeof title === 'function' ? metaTags.title.call(vm) : metaTags.title
    }
}

function verticalLineChartjs(v){
    const chart = document.querySelector(`[${v}] .chartjs-render-monitor`);
    chart.parentNode.setAttribute("style","position:relative;");

    console.log(v, chart);

    const cursor = document.createElement("canvas");
    cursor.setAttribute("width", chart.width);
    cursor.setAttribute("height", chart.height);
    cursor.setAttribute("id", "cursor-"+v);
    cursor.setAttribute("style", "pointer-events:none;position:absolute;top:0;left:0;display:block;z-index:1;" + chart.getAttribute("style"));

    chart.parentNode.appendChild(cursor);

    chart.addEventListener('mousemove', (evt) => {
      let ratio = window.devicePixelRatio;
      let offsetLeft = cursor.getBoundingClientRect().left;
      let clientX = parseInt(evt.clientX - offsetLeft)  * ratio;
      let ctx = cursor.getContext('2d');
  
      if( clientX < 42 && clientX < chart.width - 130 ) return;
      ctx.clearRect(0, 0, chart.width, chart.height);
      ctx.beginPath();
      ctx.moveTo(clientX, 30);
      ctx.lineTo(clientX, chart.height-50);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "#333";
      ctx.stroke();
    });

    chart.addEventListener('mouseleave', () => {
      let ctx = cursor.getContext('2d');
  
      ctx.clearRect(0, 0, chart.width, chart.height);
    });
}


async function cropImage(url){
    const canvas = document.createElement('canvas');
    canvas.setAttribute("id", "imgcrop");
    document.body.appendChild(canvas);

    let ctx = canvas.getContext('2d');
    ctx.canvas.width = 150;
    ctx.canvas.height = 150;

    let img = new Image();
    img.onload = await function(event){
        let img = event.target;
        let imgSize = Math.min(img.width, img.height);
        // The following two lines yield a central based cropping.
        // They can both be amended to be 0, if you wish it to be
        // a left based cropped image.
        let left = (img.width - imgSize) / 2;
        let top = (img.height - imgSize) / 2;
        //var left = 0; // If you wish left based cropping instead.
        //var top = 0; // If you wish left based cropping instead.
        ctx.drawImage(event.target, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);

        let imgurl = canvas.toDataURL();

        canvas.remove();

        return imgurl;
    };
    img.crossOrigin = "anonymous";
    img.src = url;
}

function boldString(str, substr) {
    var strRegExp = new RegExp(substr, 'g');
    return str.replace(strRegExp, '<span class="highlight">'+substr+'</span>');
}

module.exports = {
    countries,
    numberWithSpaces,
    searchCountry,
    filterCountries,
    getTitle,
    returnCountries,
    parseDateToHuman,
    verticalLineChartjs,
    cropImage,
    boldString
};