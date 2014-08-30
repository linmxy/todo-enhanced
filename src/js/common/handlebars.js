/**
 * Created by linmin on 30/8/14.
 */
define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper("prettyDate", function (timestamp) {

        var date,
            monthNames,
            secs = ((new Date()).getTime()  - timestamp) / 1000,
            minutes = secs / 60,
            hours = minutes / 60,
            days = hours / 24,
            weeks = days / 7,
            months = weeks / 4.34812,
            years = months / 12;

        if (minutes < 1) {
            secs = Math.floor(secs % 60);
            return secs + (secs > 1 ? " seconds ago" : " second ago");
        }
        if (hours < 1) {
            hours = Math.floor(minutes % 60);
            return hours + (minutes > 1 ? " minutes ago" : " minute ago");
        }
        if (days < 1) {
            hours = Math.floor(hours % 24);
            return hours + (hours > 1 ? " hours ago" : " hour ago");
        }
        else if (days < 4) {
            days = Math.floor(days % 7);
            return days + (days > 1 ? " days ago" : " day ago");
        }
        else {
            date = new Date(timestamp * 1000);
            monthNames = [ "January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December" ];
            return monthNames[date.getMonth()] + " " + date.getDate();
        }

    });

    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    return Handlebars;
});
