'use strict';

<% include server.js -%>

app.listen(process.env.PORT || (ENV ? 80 : 8000));
