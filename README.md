# FENALCO Sur de Santander - Sitio Web Oficial

Sitio web moderno y profesional para FENALCO Sur de Santander, construido con React, Vite, TailwindCSS y Framer Motion.

## 🚀 Características

- ✅ **Diseño Moderno**: Interfaz profesional con animaciones fluidas
- ✅ **Totalmente Responsive**: Optimizado para móviles, tablets y desktop
- ✅ **Performance**: Carga rápida con Vite y optimizaciones modernas
- ✅ **Animaciones**: Transiciones suaves con Framer Motion
- ✅ **SEO Friendly**: Estructura optimizada para motores de búsqueda
- ✅ **Componentes Reutilizables**: Arquitectura modular y escalable

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 16 o superior)
- npm o yarn

Puedes verificar si los tienes instalados ejecutando:
```bash
node --version
npm --version
```

## 🛠️ Instalación

### 1. Navega a la carpeta del proyecto
```bash
cd fenalco-santander
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Inicia el servidor de desarrollo
```bash
npm run dev
```

El sitio estará disponible en: `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
fenalco-santander/
├── public/
│   └── images/              # Imágenes públicas
├── src/
│   ├── components/
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── home/            # Componentes de inicio
│   │   │   └── Hero.jsx
│   │   ├── services/        # Componentes de servicios
│   │   │   └── ServiceCard.jsx
│   │   ├── ui/              # Componentes UI reutilizables
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx     # (Por crear)
│   │   ├── Affiliate.jsx    # (Por crear)
│   │   ├── Events.jsx       # (Por crear)
│   │   ├── Agreements.jsx   # (Por crear)
│   │   └── Jobs.jsx         # (Por crear)
│   ├── styles/
│   │   └── globals.css      # Estilos globales
│   ├── utils/
│   │   └── constants.js     # Constantes y datos
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Reemplazar Imágenes

Los placeholders de imágenes están marcados como:
```jsx
<div className="image-placeholder">
  [IMAGEN: Descripción]
</div>
```

Para reemplazarlas:

1. Coloca tus imágenes en `/public/images/`
2. Reemplaza el placeholder con:
```jsx
<img 
  src="/images/nombre-imagen.jpg" 
  alt="Descripción" 
  className="w-full h-full object-cover"
/>
```

## 🎨 Colores Corporativos

Los colores están configurados en `tailwind.config.js`:

```javascript
primary: {
  500: '#00C78E',  // Verde principal
  600: '#00a86b',  // Verde oscuro
}
secondary: {
  500: '#7FDBCA',  // Verde claro
}
```

Uso en componentes:
- `bg-primary-500` - Fondo verde
- `text-primary-500` - Texto verde
- `border-primary-500` - Borde verde

## 📝 Páginas Pendientes

Las siguientes páginas están marcadas como "En construcción" y deben ser creadas:

- [ ] `/servicios` - Página de servicios completa
- [ ] `/afiliate` - Formulario de afiliación con validación
- [ ] `/eventos` - Calendario y listado de eventos
- [ ] `/convenios` - Alianzas y convenios
- [ ] `/fenalempleo` - Bolsa de empleo

## 🔧 Configuración Adicional

### Agregar Google Analytics
Edita `index.html` y agrega tu tracking ID de Google Analytics.

### Configurar Meta Tags
Edita `index.html` para personalizar meta tags de SEO.

### Configurar Dominio
Para producción, configura tu dominio en el hosting y actualiza las URLs absolutas.

## 🚀 Deploy a Producción

### Opción 1: Netlify
1. Construye el proyecto: `npm run build`
2. Sube la carpeta `dist` a Netlify
3. O conecta tu repositorio Git para deploy automático

### Opción 2: Vercel
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

### Opción 3: Hosting tradicional
1. Ejecuta: `npm run build`
2. Sube el contenido de la carpeta `dist` a tu servidor
3. Configura tu servidor para servir el `index.html` en todas las rutas

## 📞 Soporte

Para dudas o problemas:
- Email: direccionsursantander@fenalco.com.co
- Teléfono: 3185840599 - 3185794050

## 📄 Licencia

Este proyecto es propiedad de FENALCO Sur de Santander.

---

**Desarrollado con ❤️ para FENALCO Sur de Santander**
