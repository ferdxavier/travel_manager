
# CreateDriverRequest

Dados necessários para criar ou atualizar um motorista (sem o ID gerado).

## Properties

Name | Type
------------ | -------------
`name` | string
`cpf` | string
`rg` | string
`dateBirth` | Date
`cnhNumber` | string
`validityCnh` | Date
`validityToxicological` | Date

## Example

```typescript
import type { CreateDriverRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Fernando Castro de Abreu,
  "cpf": 06556256359,
  "rg": 13569569,
  "dateBirth": Fri Jun 14 21:00:00 BRT 1985,
  "cnhNumber": 2536565936616546,
  "validityCnh": Sun Oct 24 21:00:00 BRT 2027,
  "validityToxicological": Thu Feb 29 21:00:00 BRT 2024,
} satisfies CreateDriverRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateDriverRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


