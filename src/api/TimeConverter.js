function TimeConverter(year,month,day,hour,minute,second)
{
    var date = new Date(year, month, day, hour, minute, second);

    // Get the Unix timestamp by calling getTime() method and dividing by 1000 to convert from milliseconds to seconds
    var unixTimestamp = Math.floor(date.getTime() / 1000);

    console.log(unixTimestamp);
}

module.exports = TimeConverter;