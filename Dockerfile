# Usa una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]