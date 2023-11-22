# NL Web II

Projeto do NLWeb com React

# Baixar o projeto

Para baixar o projeto basta executar o seguinte comando no seu terminal:

```
git clone http://gitlab.nl.com.br/nl_informatica/nlwebii.git
```

# Work in progress

## Backend

-   [Spring-boot](https://spring.io/projects/spring-boot) - Framework para construção de aplicações standalone facilmente

## Front

-   [React](https://pt-br.reactjs.org/) - Framework de interface;
-   [Redux](https://redux.js.org/) - Administração de estados globais da aplicação react;
-   [Material-UI](https://material-ui.com/) - Biblioteca de componentes de UI;
-   [Tailwind CSS](https://tailwindcss.com/) - CSS rápido para customizações.

<h1 id="build-section">Build</h1>

Para gerar a build do projeto, basta executar o comando no seu terminal:

```
mvn clean package -DskipTests
```

# Executar o projeto

## Desenvolvimento:

Para o <b>Backend</b>, devemos importar o projeto na IDE Java de sua preferência, e executa-lo usando o <b>Wildfly</b>.

Para o <b>Frontend</b>, podemos executar o seguinte comando na pasta do projeto pelo terminal:

```
yarn start
```

## Produção:

Para produção, deve-se [gerar a build](#build-section) do projeto e executá-la usando o <b>Wildfly</b>

**ATENÇÃO:** <br />
Sempre que for gerado uma nova build para o cliente, devemos trocar o secret do token JWT no arquivo
**src/main/resources/application.properties**.<br />

```
nl.security.authentication.jwt.base64-secret=SECRET
```

Para gerar um novo secret, devemos executar o comando no linux:

```
openssl rand -base64 512
```

# Para desenvolvedores:

Antes de começar a desenvolver no projeto, é obrigatória a leitura dos padrões de
organização dentro do git.
Estes padrões estão listados dentro dos nossos guias abaixo:

-   [Guia de commits](./docs/commit-guide.md)
-   [Guia de branches](./docs/branch-guide.md)
-   [Guia de merges](./docs/merge-guide.md)
-   [Guia de Componentes](./docs/components-guide.md)

Para desenvolvimento Java, lembre-se de importar o code style disponível em:

-   [Eclipse](./docs/coding-style/eclipse-java-google-style.xml)
-   [IDEA](./docs/coding-style/intellij-java-google-style.xml)

<h1 style="text-align: center; margin-top: 40px; font-weight: bold">
    Guia de instalação
</h1>
<p style="text-align: center;">
    Abaixo temos todos os guias de instalações das ferramentas utilizadas no projeto:
</p>

-   [Git](#git)
-   [Java SE Development Kit 11](#jdk11)
-   [Maven](#maven)
-   [NodeJS](#nodejs)
    -   [NVM](#nvm)
-   [Yarn](#yarn)
    -   [Instalação](#instalacao-yarn)
-   [Insomnia](#insomnia)
-   [VSCode](#vscode)
    -   [Extensões](#extensões-necessárias---vscode)
    -   [Fonte](#fontes)

<div style="margin-bottom: 30px"></div>

<h1 id="jdk11">Java Development Kit 11</h1>

Baixar e instalar o Java SE Development Kit 11 a partir [deste link](https://adoptium.net/temurin/releases/?version=11).

# Git

Para instalar, basta executar o seguinte comando:

```
sudo apt-get install git
```

# Maven

Baixar e instalar o Maven a partir [deste link](https://maven.apache.org/download.cgi) ou usando o seguinte comando:

```
sudo apt-get install maven
```

# NodeJS

<h3 id="nvm">NVM</h3>

Instalar o NVM (Node Version Manager), pois com ele é possível instalar e gerenciar de forma mais prática as versões do Node.
Faça a instalação seguindo [este link](https://github.com/nvm-sh/nvm).

<h3 id="instalacao-node">Instalação do NodeJS</h3>

```
nvm install --lts

# Após o termino da instalação

nvm use --lts
```

Para verificar se instalou com sucesso, rodar o comando:

```
node -v
```

Para por a versão recém baixada como a versão do node padrão no sistema inteiro, devemos primeiro anotar o número da versão informada pelo comando acima, e após isso podemos executar o seguinte comando.

```
nvm alias default <versão>
```

# Yarn

Yarn é um gerenciador de pacotes.

<h3 id="instalacao-yarn">Instalação</h3>
Instalar o Yarn de forma global com o seguinte comando:

```
npm install -g yarn
```

# Insomnia

Ferramenta para testes de requisições à API.
[Download](https://insomnia.rest/).

> Algumas versões mais antigas do Linux Mint foram reportadas de terem problemas na hora da instalação onde o aplicativo não abre. Para isso, uma alternativa é a instalação do software usando o [snap](https://snapcraft.io/insomnia).

# VSCode

<h2 id="instalacao-vscode">Instalação:</h2>

Baixar e instalar o VSCode a partir [deste link](https://code.visualstudio.com/).

Ver extensões [aqui](#extensões-necessárias---vscode):

## Extensões necessárias - VSCode

-   **Tailwind CSS IntelliSense** - Ferramenta de auto complete para classes do Tailwind CSS
-   **EditorConfig for VS Code** - Suporte para o Editor Config utilizado no projeto
-   **ESLint** - Apontar melhorias no código
-   **GitLens** - Adiciona um pacote de funcionalidades novas no VSCode para Git
-   **Prettier - Code formatter** - Aplica formatação ao código
-   **SonarLint** - Indica possíveis problemas no código

## Extensões recomendadas - VSCode

-   **Material Icon Theme** - Pacote de icones para a árvore de arquivos do VSCode
-   **React Hooks Snippets** - Adiciona Snippets para hooks no React
-   **Color Hightlight** - Adiciona ferramentas para utilização de cores na hora de programar

Também é possível achar temas para personalizar o VSCode dentro da sua loja de extensões. Alguns temas recomendados são: Dracula Official, Omni, One Dark Pro, Winter Is Coming, Palenight e Atom One

## Fontes

As fontes **não** são obrigatórias. Você pode escolher qualquer fonte que preferir. É recomendado que se use fontes monospace.

Para trocar a fonte do VSCode, basta executar o comando `ctrl + shift + p`, pesquisar por `Preferences: Open Settings (JSON)` e adicionar as seguintes linhas para o arquivo:

```JSON
"editor.fontFamily": "Nome da Fonte",
"editor.fontLigatures": true,
```

E necessário recarregar o VSCode para que a fonte mude. Para isso execute novamente o comando `ctrl + shift + p` e procure por `Developer: Reload Window`.

Caso não queira usar a fonte padrão, aqui seguir segue uma lista de fontes recomendadas para desenvolvimento:

-   **Fira Code**:

Baixar e instalar a fonte Fira Code: [link](https://github.com/tonsky/FiraCode/releases)

-   **JetBrains Mono**:

Baixar e instalar a fonte JetBrains Mono: [link](https://www.jetbrains.com/pt-br/lp/mono/)
