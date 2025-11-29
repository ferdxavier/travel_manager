
# ErrorResponse

Representa a resposta padrão de erro da API.

## Properties

Name | Type
------------ | -------------
`timestamp` | Date
`status` | number
`errorCode` | string
`message` | string
`traceId` | string
`details` | [Array&lt;ValidationErrorDetail&gt;](ValidationErrorDetail.md)

## Example

```typescript
import type { ErrorResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "status": null,
  "errorCode": null,
  "message": null,
  "traceId": null,
  "details": null,
} satisfies ErrorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ErrorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


