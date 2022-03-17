# WooComerce Reactjs ui


### Instalación wordpress

Variables necesarias para la instalación
DB_HOST=db
DB_USER=exampleuser
DB_PASSWORD=examplepass
DB_NAME=exampledb
ROOT_PASSWORD=examplepass


##### Ejecucion mediante docker
Copiar archivo env_example como .env y establezca las variables de entorno.


```bash
DB_HOST=db
DB_USER=exampleuser
DB_PASSWORD=examplepass
DB_NAME=exampledb
ROOT_PASSWORD=examplepass
```


Docker-compose.yaml

```yaml
version: '3.1'

services:

  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: $DB_HOST
      WORDPRESS_DB_USER: $DB_USER
      WORDPRESS_DB_PASSWORD: $DB_PASSWORD
      WORDPRESS_DB_NAME: $DB_NAME
      WPJM_REST_API_ENABLED: 1
      JWT_AUTH_SECRET_KEY: $JWT_AUTH_SECRET_KEY
    volumes:
      - ./www/html:/var/www/html

  db:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: $DB_NAME
      MYSQL_USER: $DB_USER
      MYSQL_PASSWORD: $DB_PASSWORD
      MYSQL_ROOT_PASSWORD: $ROOT_PASSWORD
    volumes:
      - db:/var/lib/mysql

volumes:
  db:

```

Ejecución
```bash
docker-compose up
```

Configuración mínima .htaccess debe ser agregado en el directorio raiz de wordpress
```
# BEGIN WordPress
# Las directivas (líneas) entre "BEGIN WordPress" y "END WordPress" son
# generadas dinámicamente y solo deberían ser modificadas mediante filtros de WordPress.
# Cualquier cambio en las directivas que hay entre esos marcadores serán sobrescritas.
SetEnvIf Authorization “(.*)” HTTP_AUTHORIZATION=$1

<IfModule mod_rewrite.c>
RewriteEngine On

    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]


    RewriteBase /
    RewriteRule ^index\.php$ - [L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]


</IfModule>

# END WordPress
```


##### Plugins requeridos.
* Woocomerce
* Headless CMS
* Perfect-woocommerce-brands
* Simple JWT Login


###### Configuración mínima Simple JWT Login 
* Login status
* Authentication Status
* CORS Status

Dashboard ![Darsboard](/img/dashboard.png)
General ![General](/img/general.png)
Login ![Login](/img/login.png)
Reset Password ![Reset password](/img/reset-password.png)
Authentication ![Authentication](/img/authentication.png)
Auth Codes ![Auth Codes](/img/auth-codes.png)
CORS ![CORS](/img/cors.png)

### Ejecución de uiwoo

Copiar archivo env_example como .env y establezca las variables de entorno.

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WORDPRESS_SITE_URL=http://localhost:8080
WC_CLIENT_KEY=
WC_CLIENT_SECRET=
AUTH_KEY=token
```

Lanzar desarrollo ui next - reactjs
```
yarn dev
```


# Enlaces de interes
[Instalación de wordpress](https://es-mx.wordpress.org/support/article/how-to-install-wordpress/)
[Wordpress docker](https://hub.docker.com/_/wordpress)
[Woocomerce document](https://woocommerce.com/document/)
[Woocomerce api](http://woocommerce.github.io/woocommerce-rest-api-docs/)
[Headless cms](https://es-mx.wordpress.org/plugins/headless-cms/)
[Perfect woocommerce brands api](https://github.com/quadlayers/perfect-woocommerce-brands/wiki/REST-API-docs)
[Plugin enable JWT  protect endpoind](https://docs.simplejwtlogin.com/)