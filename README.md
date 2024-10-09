# Entre Astronautas - BackEnd 1
* Aplicação desenvolvida durante o Entre Astronautas com a turnma de BackEnd 1 do Curso EuProgr{amo}.
* Esta aplicação calcula a média das notas de alunes, e verifica se estão aprovades ou reprovades, salvando esta informação em uma lista.

## Endpoints desenvolvidos

### Cadastrar alune
`POST /alunes`

**request body:**
```
{
	"nome": string,
	"notas": number[]
}
```
**response body:**
```
{
	"id": string,
	"nome": string,
	"notas": number[],
	"situacao": string
}
```

### Listar alunes aprovades (apenas nomes)
`GET /alunes/aprovades`

**response:**
```
string[]
```

### Listar alunes reprovades (apenas nomes)
`GET /alunes/reprovades`

**response:**
```
string[]
```

### Listar alunes (todes)
`GET /alunes`

**response:**
```
[
  {
    "id": string,
    "nome": string,
    "notas": number[],
    "situacao": string
  },
  ...
]
```

### Corrigir alune
`PATCH /alunes/:id`

**request body:**
```
{
	"nome": string,
	"notas": number[]
}
```
**response:**
```
[
  {
    "id": string,
    "nome": string,
    "notas": number[],
    "situacao": string
  },
  ...
]
```

### Apagar alune
`DELETE /alunes/:id`

**response:**
```
[
  {
    "id": string,
    "nome": string,
    "notas": number[],
    "situacao": string
  },
  ...
]
```