# Guia de commits

## Commits

-   **Cada commit deve fazer apenas uma aleração.** - Evite de concetrar muitas mudanças em um commit, isso pode dificultar o trabalho para caso algo precise ser mudado. Sinta-se livre para criar quantos commits forem necessário, pois a quantidade de commit é menos importante do que a organização.

-   **Não faça mais de um commit para apenas uma mudança** - Da mesma forma que deve-se separar mudanças em mais de um commit, não se deve separar em mais de um commit uma única mudança lógica.

-   **Commits devem seguir uma ordem lógica** - Um commit "B" que depende de um commit "A", este deve vir depois para que nada possa quebrar na aplicação.

## Padrão de mensagem

A mensagem do commit deve seguir o seguinte padrão:

```
<tipo>: <descrição>

<corpo>

<rodapé>
```

### **\<tipo>** - O tipo do commit deve ser um dos listados abaixo:

-   **feat**: Uma nova funcionalidade (feature);
-   **fix**: Uma correção de erro;
-   **chore**: Alguma mudança qualquer que não afeta o usuário do sistema, como configurções por exemplo;
-   **docs**: Mudanças na documentação;
-   **perf**: Uma mudança de código para melhora de performance;
-   **refactor**: Uma mudança no código a fins de organização e/ou legibilidade;
-   **style**: Esitlização do código (adição de espaços em branco, ponto e vírgula, etc);
-   **BREAKING CHANGE**: Foi feito uma alteração que pode quebrar parte da aplicação.

### **<descrição>** - Breve descrição do que foi feito

### **\<corpo> (Opicional)** - Descrição do motivo do commit.

Nem todos os commits irão precisar de um corpo pois nem todos são complexos o suficiente.
Use o corpo para explicar o **oque** e o **porque** do commit, e não o **como** pois o código é suposto fazer isso.

Quando estiver escrevendo uma mensagem para o corpo do commit, pense como que se tivesse que explicar para alguém que esta lendo esta mensagem daqui um ano e precisa entender o que foi feito.

O corpo deve ter no máximo 72 caracteres por linha

### **\<rodapé> (Opicional)** - Mais informações sobre o commit

O rodapé deve ser utilizado quando for feito um BREAKING CHANGE contendo uma descrição do que foi mudado e o que afetará daquele ponto em diante.

Outro motivo que podemos usar o rodapé é para anexarmos mais informações sobre o commit. Por exemplo, caso o commit se origine de um Issue, podemos colocar no final do commit

```
Sobre: Issue #132 - Nome da issue.
```

## Exemplos de commits:

```
fix: Correção na validação na tela X

Adicionado nova validação "required" no campo desPessoa dentro da tela X para evitar possíveis erros no banco.
```

```
feat: Tela X
```

```
perf: Remoção de código desnecessário na tela X

Remoção de validações desnecessárias na hora de mandar os dados para o backend ao salvar para aumentar a performance.
```

## Criação de branches

-   Uma branch necessita de ter um nome descritivo conforme o seguinte exemplo:

```
# BOM
$ git checkout -b feature/tela-nomeDaTela

# RUIM
$ git checkout -b nova-tela
```

Quando possuimos mais de uma pessoa trabalhando em uma mesma branch, podemos criar novas branches com o nome de cada um.

```
$ git checkout -b feature-a/main # Branch principal do time

$ git checkout -b feature-a/joao # Branch pessoal do João

$ git checkout -b feature-a/maria # Branch pessoal da Maria
```

## Execução de merges

-   **Não escreva por cima do histórico já existente**

Deve-se manter o histórico do repositório, pois isto no facilitará a concertar potenciais problemas se tivermos a infromação de onde este se originou.

Poderá sim ocorrer situações onde sobrescrever o histórico não é algo errado. Por exemplo, caso você seja o único trabalhando em uma branch e queira arrumar algo para que o merge ocorra mais facilmente.

-   Mantenha o histórico simples e organizado. Antes que você execute o merge:

    -   Tenha certeza que os commits estão dentro dos conformes segundo este guia. Caso for necessário, reordene ou junte (squash) para simplificar.
    -   Execute um `rebase` antes de der merge para garantir a integridade da branch principal
