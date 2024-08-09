# TrapFocus

TrapFocus é uma biblioteca JavaScript simples para criar uma "armadilha de foco" dentro de um elemento contêiner, garantindo que o foco permaneça dentro do contêiner ao navegar com o teclado. Isso é útil para criar modais acessíveis, diálogos e outros componentes que requerem foco restrito.

## Instalação

Você pode instalar o TrapFocus via npm:

```bash
npm install @jobs/trapfocus
```

## Uso

### Importando o TrapFocus

Importe o módulo em seu código:

```typescript
import { trapFocus } from "@jobs/trapfocus"
```

### Criando uma armadilha de foco

Aqui está um exemplo de como criar uma armadilha de foco em um modal:

```typescript
const focusTrap = trapFocus()

focusTrap.create({
  container: "#modal", // O seletor ou o elemento do contêiner
  initialFocusElement: "#firstInput" // Opcional: o seletor ou o elemento que deve receber o foco inicial
})
```

## API

### trapFocus()

Cria uma nova instância da armadilha de foco.

#### Retorno

- TrapFocus: Um objeto com os métodos create e destroy.

### create(config: TrapFocusConfig)

Cria a armadilha de foco no contêiner especificado.

#### Parâmetros

- config.container (string | HTMLElement) (obrigatório): O contêiner onde a armadilha de foco será aplicada. Pode ser um seletor CSS ou um elemento DOM.
- config.initialFocusElement (string | HTMLElement) (opcional): O elemento que deve receber o foco inicial. Pode ser um seletor CSS ou um elemento DOM. Se não for especificado, o foco será aplicado ao primeiro elemento focável.

### destroy()

Remove a armadilha de foco, limpando quaisquer recursos criados.

## Contribuição

Se você encontrar algum bug ou tiver sugestões de melhorias, fique à vontade para abrir uma issue ou enviar um pull request.
