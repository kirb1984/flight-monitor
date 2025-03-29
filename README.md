# Flight monitor

A web app simulating a plane's instruments, saving their data to a remote server.

## Usage

### Server

To build the app, run

```
pnpm build
```

to create the js and css bundles.
You can then run the app with `build/server/index.js`, or deploy on your chosen hosting provider.

### Web app

In the web app you can input the plane's altitude, heading and attitude through a form dialog and then view that data in either text form or visualized.

### API

The server provides an API allowing you to make GET and POST requests directly without the web interface.
