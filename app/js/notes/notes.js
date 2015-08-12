'use strict';

module.exports = function(app) {
  require('./directives/note_form_directive')(app);
  require('./controllers/notes_controller')(app);
};
