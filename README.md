# Next.js Teslo Shop App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

Para listar los contenedores
```
docker ps - a
```

Para detener el contenedor
```
docker stop teslo-database
```

* El -d, signitica __detached__


* MongoDB URL Local:
```
mongodb=//localhost:27017/entriesdb
```


## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Reconstruir los modulos de node y levantar next
```
    npm install
    npm run dev
```

## Llenar la base de datos con informacion de pruebas

Llamar a 
```
http://localhost:3000/api/seed
```