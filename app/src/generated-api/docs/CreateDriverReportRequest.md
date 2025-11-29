
# CreateDriverReportRequest

Dados coletados de motoristas (integrantes da empresa) via link público. Mais granular.

## Properties

Name | Type
------------ | -------------
`vehicleId` | string
`userId` | string
`description` | string
`reportReason` | [DriverReportReason](DriverReportReason.md)
`imageBase64` | string
`videoBase64` | string

## Example

```typescript
import type { CreateDriverReportRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": a1b2c3d4-e5f6-7890-1234-567890abcdef,
  "userId": f0e9d8c7-b6a5-4321-fedc-ba9876543210,
  "description": null,
  "reportReason": null,
  "imageBase64": null,
  "videoBase64": null,
} satisfies CreateDriverReportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateDriverReportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


