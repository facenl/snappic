{
    "version": 2,
    "builds": [
        {
            "src": "snappic.html",
            "use": "@vercel/static"
        },
        {
            "src": "script.js",
            "use": "@vercel/static"
        }

    ],
    "routes": [
        {
            "src": "/",
            "dest": "/snappic.html"
        },
        {
            "src": "/script.js",
            "dest": "/script.js",
            "headers": {
                "Content-Type": "text/plain"
            }
        }
    ]
}