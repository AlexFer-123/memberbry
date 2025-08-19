# Componentes UI - shadcn-vue

Este diretório contém componentes UI baseados no shadcn-ui, adaptados para Vue.js 3.

## 🎨 Componentes Disponíveis

### Componentes Básicos
- **Button**: Botões com variantes (default, destructive, outline, secondary, ghost, link)
- **Input**: Campos de entrada com foco e validação
- **Label**: Labels para formulários
- **Spinner**: Indicador de carregamento animado

### Componentes de Layout
- **Card**: Container principal para conteúdo
- **CardHeader**: Cabeçalho do card
- **CardTitle**: Título do card
- **CardDescription**: Descrição do card
- **CardContent**: Conteúdo principal do card
- **CardFooter**: Rodapé do card

### Componentes de Feedback
- **Alert**: Alertas com variantes (default, destructive, success, warning, info)
- **AlertDescription**: Descrição do alerta

## 🚀 Como Usar

### Importação Individual
```vue
<script setup>
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
</script>
```

### Importação via Index
```vue
<script setup>
import { Button, Card, Alert } from '@/components/ui'
</script>
```

## 📝 Exemplos de Uso

### Button
```vue
<template>
  <!-- Botão padrão -->
  <Button>Clique aqui</Button>
  
  <!-- Botão com variante -->
  <Button variant="destructive">Excluir</Button>
  
  <!-- Botão outline -->
  <Button variant="outline">Cancelar</Button>
  
  <!-- Botão com loading -->
  <Button :disabled="loading">
    <Spinner v-if="loading" size="sm" class="mr-2" />
    {{ loading ? 'Carregando...' : 'Enviar' }}
  </Button>
</template>
```

### Card
```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>Título do Card</CardTitle>
      <CardDescription>Descrição opcional</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Conteúdo do card aqui</p>
    </CardContent>
    <CardFooter>
      <Button>Ação</Button>
    </CardFooter>
  </Card>
</template>
```

### Formulário Completo
```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">E-mail</Label>
          <Input 
            id="email" 
            v-model="form.email" 
            type="email" 
            placeholder="seu@email.com"
          />
        </div>
        
        <div class="space-y-2">
          <Label for="password">Senha</Label>
          <Input 
            id="password" 
            v-model="form.password" 
            type="password"
          />
        </div>
        
        <Alert v-if="error" variant="destructive">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>
        
        <Button type="submit" class="w-full">Entrar</Button>
      </form>
    </CardContent>
  </Card>
</template>
```

## 🎨 Personalização

### Classes CSS Customizadas
Todos os componentes aceitam classes CSS customizadas via `class` prop:

```vue
<Button class="bg-gradient-to-r from-purple-600 to-blue-600">
  Botão Gradiente
</Button>
```

### Variantes de Cores
Os componentes usam o sistema de cores do Tailwind CSS configurado com as variáveis CSS do shadcn:

- `primary`: Cor principal (roxo)
- `secondary`: Cor secundária (cinza claro)
- `destructive`: Cor de perigo (vermelho)
- `muted`: Cor neutra
- `accent`: Cor de destaque

### Dark Mode
O sistema suporta dark mode automático através da classe `.dark` no elemento root.

## 🛠️ Utilitários

### cn() Function
Localizada em `@/lib/utils.js`, combina classes CSS de forma inteligente:

```javascript
import { cn } from '@/lib/utils'

// Combina classes e remove duplicatas
const className = cn(
  'base-class',
  condition && 'conditional-class',
  props.variant === 'large' && 'large-class'
)
```

## 🎯 Boas Práticas

1. **Consistência**: Use sempre os componentes UI em vez de HTML puro
2. **Variantes**: Utilize as variantes apropriadas para cada contexto
3. **Acessibilidade**: Os componentes já incluem atributos de acessibilidade
4. **Performance**: Os componentes são otimizados para tree-shaking
5. **Manutenibilidade**: Mantenha a personalização através das classes CSS
