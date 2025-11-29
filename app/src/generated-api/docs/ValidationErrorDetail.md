
# ValidationErrorDetail

Detalhes de falha de validação em um campo específico.

## Properties

Name | Type
------------ | -------------
`field` | string
`issue` | string
`targetValue` | string

## Example

```typescript
import type { ValidationErrorDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "field": null,
  "issue": null,
  "targetValue": null,
} satisfies ValidationErrorDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ValidationErrorDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


