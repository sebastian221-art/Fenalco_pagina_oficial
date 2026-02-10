# Guía de Desarrollo - FENALCO Sur de Santander

## 🎯 Cómo Agregar Nuevas Páginas

### Paso 1: Crear el componente de la página
Crea un archivo en `/src/pages/` siguiendo la convención:

```jsx
// src/pages/NombrePagina.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const NombrePagina = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="gradient-primary py-32 wave-divider">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Título de la Página
            </h1>
            <p className="text-xl text-white/90">
              Descripción breve
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tu contenido aquí */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* ... */}
        </div>
      </section>
    </div>
  );
};

export default NombrePagina;
```

### Paso 2: Registrar la ruta
Edita `/src/App.jsx` y agrega la ruta:

```jsx
import NombrePagina from './pages/NombrePagina';

// Dentro de <Routes>
<Route path="/ruta" element={<NombrePagina />} />
```

### Paso 3: Agregar al menú de navegación (opcional)
Si quieres que aparezca en el navbar, edita `/src/utils/constants.js`:

```javascript
export const NAV_ITEMS = [
  // ... existentes
  { id: 'nueva', label: 'Nueva Página', path: '/ruta' }
];
```

## 🎨 Componentes UI Disponibles

### Button
```jsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Texto del botón
</Button>

// Variantes: primary, outline, secondary, ghost
// Tamaños: sm, md, lg
```

### Card
```jsx
import Card from '@/components/ui/Card';

<Card padding="md" hover={true}>
  Contenido de la tarjeta
</Card>

// Padding: none, sm, md, lg, xl
// hover: true/false (efecto hover)
```

## 📐 Clases CSS Útiles

### Contenedores
```css
.container-custom    /* Contenedor principal con max-width */
.section-padding     /* Padding vertical de sección */
```

### Colores
```css
.gradient-primary    /* Gradiente verde */
.text-gradient       /* Texto con gradiente */
.bg-primary-500      /* Fondo verde */
```

### Botones
```css
.btn-primary         /* Botón primario */
.btn-outline         /* Botón con borde */
.btn-secondary       /* Botón secundario */
```

### Efectos
```css
.card-hover          /* Efecto hover en tarjetas */
.wave-divider        /* Divisor ondulado inferior */
.wave-divider-top    /* Divisor ondulado superior */
```

## 🎭 Animaciones con Framer Motion

### Fade In al hacer scroll
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Contenido
</motion.div>
```

### Stagger (animación escalonada)
```jsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

## 📝 Formularios con React Hook Form

```jsx
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const MiFormulario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Formulario enviado exitosamente');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Campo requerido
        </label>
        <input
          {...register('campo', { required: 'Este campo es obligatorio' })}
          className="input-field"
        />
        {errors.campo && (
          <p className="text-red-500 text-sm mt-1">{errors.campo.message}</p>
        )}
      </div>
      
      <Button type="submit">Enviar</Button>
    </form>
  );
};
```

## 🔔 Notificaciones con React Hot Toast

```jsx
import toast from 'react-hot-toast';

// Success
toast.success('Operación exitosa');

// Error
toast.error('Ocurrió un error');

// Loading
const loadingToast = toast.loading('Cargando...');
// Luego actualizar:
toast.success('Completado', { id: loadingToast });

// Custom
toast.custom((t) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    Mensaje personalizado
  </div>
));
```

## 🎨 Paleta de Colores

```javascript
// Verde principal
primary-50   #e6faf4
primary-100  #b3f0de
primary-200  #80e6c8
primary-300  #4ddcb2
primary-400  #1ad29c
primary-500  #00C78E  ← Principal
primary-600  #00a86b
primary-700  #008954
primary-800  #006a3d
primary-900  #004b26

// Verde secundario
secondary-500  #7FDBCA
secondary-600  #5fd1b8
```

## 📱 Responsive Design

Breakpoints de Tailwind:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Ejemplo:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 columna móvil, 2 tablet, 3 desktop */}
</div>
```

## 🔍 Iconos (Lucide React)

```jsx
import { 
  Home, 
  Users, 
  Mail, 
  Phone,
  // ... etc
} from 'lucide-react';

<Users className="w-6 h-6 text-primary-500" />
```

Ver todos los iconos en: https://lucide.dev/icons/

## 🚨 Mejores Prácticas

1. **Siempre usa motion.div** para animaciones al hacer scroll
2. **Mantén los colores consistentes** usando las variables de Tailwind
3. **Usa Card y Button** para mantener UI consistente
4. **Agrega alt text** a todas las imágenes para accesibilidad
5. **Testea en móvil** - usa Chrome DevTools responsive mode
6. **Optimiza imágenes** antes de subirlas (usa TinyPNG o similar)
7. **Usa semántica HTML** - section, article, nav, etc.

## 📞 Contacto para Desarrollo

Si necesitas ayuda con el desarrollo:
- Revisa este documento primero
- Consulta la documentación de React/Tailwind
- Contacta al equipo técnico

---

¡Feliz desarrollo! 🚀
