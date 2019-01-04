const $search_div = $('#search');
const $search_box = $('#search-box');
const $search_btn = $('#search-button');
const $weatherlocation = $('#weather-location');
const $response = $('#response');
const $units = $('#units');
const $htmlUnit = $('#unit');

$search_btn.on('click', ()=>{
    var location = $search_box.val();
    var selectValue = $units.val();
    var formatQuery = '&units=';
    var tempUnit = '&#8490;';
    if(selectValue == '1')
    {
        formatQuery += 'metric';
        tempUnit = '&#8451;';
    }
    else if(selectValue == '2')
    {
        formatQuery += 'imperial';
        tempUnit = '&#8457;';
    }
    else
        formatQuery = ''; //set to default value by OpenWeatherMap is Kelvin

    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?APPID=449605309b7cc1c4dab96ca2b913cf15&q=${location}${formatQuery}`, (response) => {
        console.log(response);
        $weatherlocation.text(response.name);
        $response.html('Temperature: '+response.main.temp+'<span id="unit">'+tempUnit+'</span>');
    }).fail((jqXHR)=>{
        var errorMsg = `Error(${jqXHR.responseJSON.cod}): ${jqXHR.responseJSON.message}`;
        $weatherlocation.text('');
        $response.text(errorMsg);
    });
});
