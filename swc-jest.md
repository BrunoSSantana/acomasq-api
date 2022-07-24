# usando swc/jest nos seus test

## Instalação

Neste conteúdo, vamos assumir que o jest já está instalado na aplicação e devidamente configurado para uso. Assim como é indicado na [documentação](https://swc.rs/docs/usage/jest) da ferramenta, a instalação do `@swc/jest` podem ser feitas da seguinte maneira.

```bash
# if you use npm
npm i -D jest @swc/core @swc/jest

# if you use yarn
yarn add -D jest @swc/core @swc/jest
```

## Uso

Para que a ferramenta seja usada pelo jest é necessário indicar o seu uso na propriedade `transform` da configuração do jest, no `jest.config.json` ou na chave `"jest"` do `package.json`. a depender de como está configurado na aplicação.

```ts
export default {
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};
```

## Configurações Básicas

Por padrão não é necessário adiconar configurações para poder rodar os testes, toda via, caso no projeto deja usado decorator, fato que não é muito incomum sugerimos a seguinte configuração.

```json
{
    "jsc": {
      "parser": {
        "syntax": "typescript",
        "tsx": false,
        "decorators": true
      },
      "target": "es2017",
      "keepClassNames": true,
      "transform": {
        "legacyDecorator": true,
        "decoratorMetadata": true
      }
    },
    "module": {
      "type": "commonjs"
    }
  }
```

Além das configurações vistas acima, existem na [documentação da ferramenta](https://swc.rs/docs/configuration/compilation) uma vasta possibilidade que pode ajudar em alguns casos específicos, mas principalmente quando os testes são de frontend.