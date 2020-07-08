var myDate = "26-02-2012";
myDate = myDate.split("-");
var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
console.log(new Date(newDate).getTime());

//July 3, 2020 - 10:00 UTC
