# Configuración del Formulario de Contacto EmailJS

## Pasos para activar el formulario de contacto:

### 1. Crear una cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar el servicio de email
1. En el dashboard, ve a **Email Services**
2. Click en **Add New Service**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Copia el **Service ID** que se genera

### 3. Crear una plantilla de email
1. Ve a **Email Templates**
2. Click en **Create New Template**
3. Usa esta plantilla HTML:

```html
Nuevo mensaje desde tu portafolio:

De: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}
```

4. Copia el **Template ID** que se genera

### 4. Obtener tu Public Key
1. Ve a **Account** → **General**
2. Copia tu **Public Key**

### 5. Actualizar el código
Abre `app/components/ContactForm.tsx` y reemplaza las siguientes líneas:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',    // ← Reemplazar con tu Service ID
  'YOUR_TEMPLATE_ID',   // ← Reemplazar con tu Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  'YOUR_PUBLIC_KEY'     // ← Reemplazar con tu Public Key
);
```

### Ejemplo de configuración:
```typescript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  'publicKey_123456'
);
```

## ¡Listo! 
Ahora el formulario de contacto enviará los mensajes directamente a tu email.

## Límites del plan gratuito:
- 200 emails por mes
- Ideal para portafolios personales
