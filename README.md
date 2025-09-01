
<p align="center">
  <a href="https://www.vigy-storefront.vercel.app">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/images/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/images/logo-light.svg">
    <img alt="VIGY Logo" src="public/images/logo-light.svg" width="150">
    </picture>
  </a>
</p>

<h1 align="center">
  VIGY Storefront
</h1>

<p align="center">
VIGY es una marca de moda fundada por Valentín González y Ángel Martínez, dos jóvenes leoneses con una visión clara: crear prendas que fusionen la estética deportiva vintage con la versatilidad moderna. Cada colección está diseñada para personas que buscan autenticidad, calidad y comodidad en su vestimenta. Ya sea para el día a día o para ocasiones especiales, estas están creadas para ofrecer lo mejor en estilo y confort. Este storefront proporciona una experiencia de compra moderna, fluida y accesible.
</p>

<p align="center">
  <a href="https://github.com/amartfpro/vigy-storefront">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://instagram.com/vigysport">
    <img src="https://img.shields.io/badge/Instagram-%40vigysport-4c7d7e.svg" alt="Follow @vigysport on Instagram" />
  </a>
</p>

## Características

- **Diseño responsivo y elegante**: La tienda está optimizada para adaptarse a todos los dispositivos (móviles, tabletas, escritorios), ofreciendo una experiencia fluida en cualquier plataforma.
  
- **Catálogo interactivo**: Gestión dinámica de productos, colecciones y variantes, permitiendo a los usuarios explorar fácilmente diferentes opciones, con una visualización atractiva para cada artículo.

- **Carrito de compras y checkout completo**: Integración con **Stripe** para ofrecer pagos rápidos, seguros y sin complicaciones. Los usuarios pueden completar su compra de manera eficiente y confiable.

- **Búsqueda avanzada y filtros personalizados**: Uso de **Algolia** para implementar una búsqueda rápida y precisa, permitiendo a los usuarios filtrar productos según sus preferencias.

- **Autenticación y perfil de usuario**: Los usuarios pueden registrarse, iniciar sesión y gestionar sus direcciones de envío y facturación, facilitando la compra y el seguimiento de pedidos.

- **Internacionalización (i18n)**: La tienda es accesible en varios idiomas, lo que permite una experiencia personalizada para usuarios de diferentes países.

- **Optimización SEO**: El frontend está diseñado con las mejores prácticas de SEO en mente, para mejorar el posicionamiento de productos y colecciones en los motores de búsqueda.

- **Gestión de inventario y stock en tiempo real**: La plataforma permite la actualización en tiempo real del inventario, asegurando que los productos disponibles sean precisos y actualizados.

- **Seguridad avanzada**: Implementación de las mejores prácticas de seguridad en el sitio, incluyendo la encriptación de datos sensibles y la protección contra vulnerabilidades comunes.

## Estructura del Proyecto

```
/components              - Componentes reutilizables como botones, formularios y menús
/pages                   - Páginas del storefront (Home, Producto, Carrito, etc.)
/public/images           - Archivos públicos como imágenes y fuentes, incluyendo el logo
/styles                  - Estilos globales utilizando Tailwind CSS
/lib                     - Funciones y utilidades compartidas entre componentes
```

## Instalación

### Requisitos previos

1. **Node.js** >= 16.0.0
   - Puedes verificar la versión instalada con:
     ```bash
     node -v
     ```

2. **npm** >= 8.0.0
   - Verifica la versión con:
     ```bash
     npm -v
     ```

3. **Backend de Medusa**:
   - Este frontend está integrado con el backend de **Medusa**. Necesitas tener el backend corriendo, configurado en el repositorio [vigy-store](https://github.com/amartfpro/vigy-store). Si no tienes Medusa configurado, consulta su [documentación oficial](https://docs.medusajs.com/learn/installation).

4. **Docker** (opcional):
   - Si usas Docker para ejecutar Medusa, asegúrate de tenerlo instalado. Verifica la instalación con:
     ```bash
     docker -v
     ```
   - Si no usas Docker, asegúrate de tener **PostgreSQL** correctamente configurado.

5. **PostgreSQL**:
   - Medusa utiliza PostgreSQL por defecto como base de datos. Asegúrate de que esté instalado y corriendo. Si usas Docker, puedes encontrar configuraciones predefinidas en el repositorio de Medusa.

6. **Stripe**:
   - Necesitarás una cuenta de **Stripe** para integrar el sistema de pagos. Regístrate en [Stripe](https://stripe.com) y configura tus claves API.

7. **Algolia**:
   - Si utilizas búsqueda avanzada, necesitarás una cuenta en [Algolia](https://www.algolia.com) y configurar tus claves API.

8. **Editor de código**:
   - Se recomienda un editor como **Visual Studio Code** para trabajar con el proyecto.

9. **Dependencias adicionales (opcional)**:
   - Herramientas como **Prettier** o **ESLint** para formateo y calidad de código.


### Clonación del repositorio

```bash
git clone https://github.com/amartfpro/vigy-storefront.git
cd vigy-storefront
```

### Instalación de dependencias

```bash
npm install
```

### Configuración de entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega tus variables de entorno:

```env

#MEDUSA
NEXT_PUBLIC_MEDUSA_BACKEND_URL
NEXT_PUBLIC_BASE_URL
MEDUSA_BACKEND_URL
NEXT_PUBLIC_DEFAULT_REGION
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
REVALIDATE_SECRET

# CORS
AUTH_CORS
STORE_CORS

# ALGOLIA
NEXT_PUBLIC_ALGOLIA_API_KEY
NEXT_PUBLIC_ALGOLIA_APP_ID
NEXT_PUBLIC_ALGOLIA_APP_ID

#STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY


```

### Ejecución del servidor de desarrollo para el entorno de desarrollo

```bash
npm run dev
```

El puerto por defecto en el que se despliega es el **8000**, por lo que podrás acceder al storefront en `http://localhost:8000`.

## Despliegue

Este proyecto está optimizado para ser desplegado en **Vercel**, un entorno de despliegue rápido y sin complicaciones. Para hacerlo, simplemente vincula tu repositorio con **Vercel** y configura las variables de entorno adecuadas.

## Contribuciones

Se ha realizado un primer sprint, dando lugar a un VMP. Se considera realizar un segundo sprint para aumentar las funcionalidades
y mejorar la experiencia del cliente además de seguir personalizando el servicio con la estética y valores de la marca.

Las contribuciones son bienvenidas. Si tienes alguna mejora o corrección, por favor abre un **issue** o un **pull request**. Estamos comprometidos a mejorar continuamente la experiencia del usuario y te agradecemos encarecidamente por cualquier aporte.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Para más detalles, consulta el archivo [LICENSE](./LICENSE).
