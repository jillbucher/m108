# m108

This is the interface for the m108.  It is built using React.  There is an express web server used for development only.

## Development

In development, you can run the server and watch for changes by running:
```
npm run dev
```
The site will runs on port 3000.  To avoid CORS errors, you can hit it on your IP address on port 3000.  You can also access it on `localhost:3000`.

To connect to the preamp, update `DataService` to prepend "http://[IP of the preamp]" to the url variable.

## Publishing changes
Run:
```
npm run build
```

It will build for production, which will bundle the files into the `src/client/public` folder.  The public directory should then be installed on the m108.
