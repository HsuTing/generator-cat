'use strict';

<% include server.js -%>

app.listen(ENV ? 80 : 8000);
