'use strict';

module.exports = function(app) {
  require('./controllers/notes_controller')(app);
};
