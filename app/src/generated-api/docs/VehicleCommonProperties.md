
# VehicleCommonProperties


## Properties

Name | Type
------------ | -------------
`licensePlate` | string
`model` | string
`vehicleManufacturer` | string
`modelYear` | number
`manufacturerYear` | number
`renavan` | string
`passengerNumber` | number
`motorNumber` | string
`chassisNumber` | string
`fleetNumber` | number
`fuelTankCapacity` | number
`entryMileage` | number
`averageConsumption` | number
`bodyManufacturer` | string
`bodyModel` | string
`axesNumber` | number
`engineDescription` | string
`hasBathroom` | boolean
`status` | string

## Example

```typescript
import type { VehicleCommonProperties } from ''

// TODO: Update the object below with actual values
const example = {
  "licensePlate": ABC1F34,
  "model": 520 HP,
  "vehicleManufacturer": Scania,
  "modelYear": 2024,
  "manufacturerYear": 2023,
  "renavan": 4566546465,
  "passengerNumber": 50,
  "motorNumber": 20234565,
  "chassisNumber": BDH546SDFG565465SD5656BR,
  "fleetNumber": 1803,
  "fuelTankCapacity": 500.5,
  "entryMileage": 3000000,
  "averageConsumption": 2.6,
  "bodyManufacturer": Marcopolo,
  "bodyModel": G6 1200,
  "axesNumber": 3,
  "engineDescription": B10 M Intercooler,
  "hasBathroom": true,
  "status": null,
} satisfies VehicleCommonProperties

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VehicleCommonProperties
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


