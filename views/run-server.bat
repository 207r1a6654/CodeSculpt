ECHO OFF
ECHO Running web server
browser-sync start --server --directory --files "*" --watch true --browser "chrome"
PAUSE