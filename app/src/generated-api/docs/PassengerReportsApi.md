# PassengerReportsApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPassengerReport**](PassengerReportsApi.md#createpassengerreportoperation) | **POST** /reportReason/passenger | Cria um novo relato anónimo de problema por um passageiro. |



## createPassengerReport

> createPassengerReport(createPassengerReportRequest)

Cria um novo relato anónimo de problema por um passageiro.

Recebe os dados básicos e anónimos de um passageiro sobre um problema no veículo. O *backend* processará esta informação (triagem) e decidirá se uma Ordem de Serviço será criada com base nos requisitos atendidos. 

### Example

```ts
import {
  Configuration,
  PassengerReportsApi,
} from '';
import type { CreatePassengerReportOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PassengerReportsApi();

  const body = {
    // CreatePassengerReportRequest | Dados do relatório de problema fornecidos pelo passageiro.
    createPassengerReportRequest: ...,
  } satisfies CreatePassengerReportOperationRequest;

  try {
    const data = await api.createPassengerReport(body);
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
| **createPassengerReportRequest** | [CreatePassengerReportRequest](CreatePassengerReportRequest.md) | Dados do relatório de problema fornecidos pelo passageiro. | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | O relato foi recebido e aceito para processamento (triagem). O *backend* iniciará a análise para determinar se uma Ordem de Serviço será gerada.  |  -  |
| **400** | Requisição inválida. Erro de validação de dados (e.g., campo obrigatório ausente). |  -  |
| **404** | Recurso não encontrado. (Ex: O vehicleId referenciado no relatório não existe). |  -  |
| **500** | Erro interno do servidor. (Inclui falhas inesperadas de infraestrutura/DB). |  -  |
| **0** | Erro inesperado não mapeado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

