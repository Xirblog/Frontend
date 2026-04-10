## Build

```sh
docker build -t frontend .
```

```sh
docker run -p 5173:5173 \
  --env NODE_ENV=production \
  --env PORT=5173 \
  --env VITE_API_URL=http://localhost:8080/api \
  --env BACKEND_URL=http://localhost:8080 \
  frontend
```