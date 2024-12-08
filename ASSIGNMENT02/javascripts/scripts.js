const Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', function (date) {
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
});
