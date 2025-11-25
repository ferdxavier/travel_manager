
# CreatePassengerReportRequest

Dados coletados de passageiros via link público/QR Code. Anónimo e leve.

## Properties

Name | Type
------------ | -------------
`vehicleId` | string
`description` | string
`reportReason` | [PassengerReportReason](PassengerReportReason.md)
`imageBase64` | string
`videoBase64` | string

## Example

```typescript
import type { CreatePassengerReportRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": a1b2c3d4-e5f6-7890-1234-567890abcdef,
  "description": null,
  "reportReason": null,
  "imageBase64": null,
  "videoBase64": null,
} satisfies CreatePassengerReportRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePassengerReportRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


