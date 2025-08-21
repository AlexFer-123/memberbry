# Login Microfrontend - Memberbry

Fully decoupled and reusable login component for integration into any Vue.js application.

## Features

- Fully configurable (API, texts, styles)
- Multiple pre-defined themes
- Customizable validations
- Events for parent application integration
- JWT support and session persistence
- Responsive design

## Basic Usage

```vue
<template>
  <LoginMicrofrontend
    api-base-url="https://your-api.com"
    title="Your Application"
    @login-success="handleLogin"
  />
</template>

<script setup>
import LoginMicrofrontend from './LoginMicrofrontend.vue'

const handleLogin = (authData) => {
  console.log('User logged in:', authData)
}
</script>
```

## Advanced Configuration

```vue
<template>
  <LoginMicrofrontend v-bind="loginConfig" />
</template>

<script setup>
import { createLoginConfig } from './index.js'

const loginConfig = createLoginConfig({
  theme: 'minimal',
  apiConfig: {
    apiBaseUrl: 'https://api.example.com'
  },
  texts: {
    title: 'My Company',
    subtitle: 'Corporate Portal'
  },
  features: {
    showRememberMe: true
  }
})
</script>
```

## Main Props

- `apiBaseUrl`: API base URL
- `title`: Application title
- `subtitle`: Subtitle
- `showRememberMe`: Show "remember me" option
- `showRegisterOption`: Show register button
- `containerClass`: Container CSS classes
- `emailValidation`: Custom validation function

## Events

- `@login-success`: Emitted when login is successful
- `@login-error`: Emitted when there's a login error
- `@register-click`: Emitted when user clicks "register"
- `@forgot-password-click`: Emitted for "forgot password"

## Available Themes

- `default`: Default theme with gradient
- `minimal`: Minimalist theme
- `dark`: Dark theme

## Complete Example

See the `examples/LoginMicrofrontendExample.vue` file for complete usage examples.

## Integration Options

### 1. Direct Import
```javascript
import LoginMicrofrontend from '@/components/microfrontend/LoginMicrofrontend.vue'
```

### 2. As NPM Library
```bash
npm install @memberbry/login-microfrontend
```

### 3. Module Federation
Configure webpack to consume as remote microfrontend.

## Configuration Factory

Use `createLoginConfig()` to easily create configurations:

```javascript
import { createLoginConfig, MicrofrontendConfig } from './index.js'

const config = createLoginConfig({
  theme: 'dark',
  apiConfig: { apiBaseUrl: 'https://api.company.com' },
  texts: { title: 'Corporate System' },
  validations: {
    email: MicrofrontendConfig.validations.email.format,
    password: MicrofrontendConfig.validations.password.minLength(8)
  }
})
```
