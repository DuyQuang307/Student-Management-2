library(plumber)

# Path to API definition
r <- plumb("api.R")

r$run(port = 8000) # Specify API port

