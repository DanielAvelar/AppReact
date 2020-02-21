<p class="has-line-data" data-line-start="0" data-line-end="1"><img src="https://miro.medium.com/max/1024/1*FVSOuHIt8ehMBeevin_8cA.png" alt="picture"></p>
<h1 class="code-line" data-line-start=2 data-line-end=3 ><a id="AppReact_2"></a>AppReact</h1>
<p class="has-line-data" data-line-start="4" data-line-end="5">Aplicação criada para inserção, edição e exclusão de pessoas e seus respectivos endereços, utilizando como front-end React com Redux e o back-end utilizando Api em .NET Core, Entity Framework com Postgres.</p>
<h3 class="code-line" data-line-start=6 data-line-end=7 ><a id="Installation_6"></a>Installation</h3>
<p class="has-line-data" data-line-start="8" data-line-end="9">O AppReact requer que o Visual Studio ou Visual Code com .NET Core 2.1, o Node JS (<a href="https://nodejs.org/">https://nodejs.org/</a>) versão atual, para instalação das dependências com o npm e o Protgres (<a href="https://www.postgresql.org/">https://www.postgresql.org/</a>) para armazenar os dados.</p>
<p class="has-line-data" data-line-start="10" data-line-end="11">Instalar as dependências do package.json utilizado no front-end:</p>
<pre><code class="has-line-data" data-line-start="13" data-line-end="17" class="language-sh">$ git <span class="hljs-built_in">clone</span> https://github.com/DanielAvelar/AppReact.git
$ <span class="hljs-built_in">cd</span> AppReact\AppReact\AppReact\ClientApp
$ npm install
</code></pre>
<h3 class="code-line" data-line-start=18 data-line-end=19 ><a id="Configurao_do_banco_de_dados_Postgres_18"></a>Configuração do banco de dados Postgres:</h3>
<ul>
<li class="has-line-data" data-line-start="20" data-line-end="21">Após instalar o Postgres, acessar o pgAdmin para executar o script de criação do Banco de Dados e suas respectivas tabelas.</li>
<li class="has-line-data" data-line-start="21" data-line-end="22">O script se encontra na pasta SQL, na raiz do projeto - AppReact\SQL\script.sql</li>
<li class="has-line-data" data-line-start="22" data-line-end="24">A string de conexão com o banco de dados está nas propriedades do projeto AppReact, depois em Depurar e Variáveis de Ambiente.</li>
</ul>
<h3 class="code-line" data-line-start=24 data-line-end=25 ><a id="Executando_no_Visual_Code_24"></a>Executando no Visual Code:</h3>
<ul>
<li class="has-line-data" data-line-start="26" data-line-end="27">Efetuar uma copia do repositório do GitHub: git clone <a href="https://github.com/DanielAvelar/AppReact.git">https://github.com/DanielAvelar/AppReact.git</a></li>
<li class="has-line-data" data-line-start="27" data-line-end="28">Abrir com o Visual Code a pasta aonde estão os arquivos do projeto.</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">Abrir o terminal do Visual Code e acessar a pasta AppReact-master\AppReact\ClientApp.</li>
<li class="has-line-data" data-line-start="29" data-line-end="30">Executar o comando npm install, para instalar as dependências do NPM.</li>
<li class="has-line-data" data-line-start="30" data-line-end="31">Retornar uma pasta para AppReact-master\AppReact e executar o comando dotnet build para compilar o projeto.</li>
<li class="has-line-data" data-line-start="31" data-line-end="32">Depois executar o comando dotnet run, para executar o projeto.</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">Abra o projeto no navegador <a href="http://localhost:56823">http://localhost:56823</a></li>
</ul>
