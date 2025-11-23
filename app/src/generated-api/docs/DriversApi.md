# DriversApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listDrivers**](DriversApi.md#listdrivers) | **GET** /drivers | Lista todos os motorista do empresa. |



## listDrivers

> Array&lt;Driver&gt; listDrivers(limit)

Lista todos os motorista do empresa.

Recupera uma lista paginada de todos os motoristas registados na empresa.

### Example

```ts
import {
  Configuration,
  DriversApi,
} from '';
import type { ListDriversRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DriversApi(config);

  const body = {
    // number | Número máximo de itens a retornar por página. (optional)
    limit: 56,
  } satisfies ListDriversRequest;

  try {
    const data = await api.listDrivers(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **limit** | `number` | Número máximo de itens a retornar por página. | [Optional] [Defaults to `50`] |

### Return type

[**Array&lt;Driver&gt;**](Driver.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Uma lista paginada de motorista. |  -  |
| **0** | Erro inesperado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

