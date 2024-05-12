- Copy local DB data
  mongodump --host localhost --port 27017 --db turboship --out .

- Restore remote
  mongorestore --uri "mongodb+srv://primetimetran:4pWLgLLS1Bm7FgJk@cluster0.xfhlaio.mongodb.net/next_unicorn" ./turboship
