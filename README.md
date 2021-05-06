# Informe Practica 10

## Procesador de notas a traves de un cliente que realiza peticiones a un servidor.

Para realizar la practica hacemos uso de un fichero cliente, el cual hace las peticiones al servidor, este, le responde con los datos que ha obtenido, o si la peticion se ha cumplido exitosamente.

## Modo de uso

En una terminal ejecutamos al servidor:

```bash
node dist/server/server.js
```

Leugo en otra terminal hacemos la peticion desde el cliente:

```bash
node dist/client/client.js add --user="Roberto" --title="Titulo" --body="Cuerpo" --color="green"
```