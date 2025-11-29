# DriversApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createDriver**](DriversApi.md#createdriveroperation) | **POST** /drivers | Cria um novo motorista no sistema. |
| [**listDrivers**](DriversApi.md#listdrivers) | **GET** /drivers | Lista todos os motoristas da empresa. |



## createDriver

> Driver createDriver(createDriverRequest)

Cria um novo motorista no sistema.

Registra um novo motorista.

### Example

```ts
import {
  Configuration,
  DriversApi,
} from '';
import type { CreateDriverOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DriversApi(config);

  const body = {
    // CreateDriverRequest | Dados do motorista a ser criado.
    createDriverRequest: ...,
  } satisfies CreateDriverOperationRequest;

  try {
    const data = await api.createDriver(body);
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
| **createDriverRequest** | [CreateDriverRequest](CreateDriverRequest.md) | Dados do motorista a ser criado. | |

### Return type

[**Driver**](Driver.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Motorista criado com sucesso. |  -  |
| **400** | Requisição inválida. Erro de validação de dados (e.g., campos obrigatórios ausentes). |  -  |
| **401** | Não autorizado. |  -  |
| **403** | Proibido. O usuário não tem permissão para criar motoristas. |  -  |
| **409** | Conflito. (Ex: O número da CNH ou CPF já está registrado). |  -  |
| **500** | Erro interno do servidor. |  -  |
| **0** | Erro inesperado não mapeado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listDrivers

> Array&lt;Driver&gt; listDrivers(limit, offset)

Lista todos os motoristas da empresa.

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
    // number | Número de itens a ignorar antes de começar a retornar os resultados (para paginação baseada em offset). Use 0 para a primeira página. (optional)
    offset: 56,
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
| **offset** | `number` | Número de itens a ignorar antes de começar a retornar os resultados (para paginação baseada em offset). Use 0 para a primeira página. | [Optional] [Defaults to `0`] |

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
| **200** | Uma lista paginada de motoristas. |  -  |
| **401** | Não autorizado. Token de autenticação ausente ou inválido. |  -  |
| **403** | Proibido. O usuário está autenticado, mas não tem permissão para listar motoristas. |  -  |
| **500** | Erro interno do servidor. |  -  |
| **0** | Erro inesperado não mapeado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

