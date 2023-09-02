# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário autenticado;
- [x] Deve ser possível obter o número de check-ins realizados por um usuário autenticado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar um academia;


## RN (Regras de Negócios)

- [x] O usuário deve se cadastrar com um email único;
- [x] O usuário deve fazer apenas um check-in por dia;
- [ ] O usuário deve estar perto da academia (100m) para fazer check-in;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF (Requisitos não Funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados a aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)


docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=api-solid -p 5432:5432 bitnami/postgresql

começar a criação de uma funcionalidade pelo caso de uso

TDD -> test driven development
escrever os testes antes de desenvolver a funcionalidade
recomendado para funcionalidades mais complexas como regras de negócios

TDD stages
- red: erro no teste
- green: codar o minimo possível para o teste passar
- refactor: 