<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="AppSage_0"></a>AppSage</h1>
<p class="has-line-data" data-line-start="2" data-line-end="3">Aplicação criada para inserção, edição e exclusão de pessoas e seus respectivos endereços, utilizando como front-end React com Redux e o back-end utilizando Api em .NET Core, Entity Framework com Postgres.</p>
<h3 class="code-line" data-line-start=4 data-line-end=5 ><a id="Installation_4"></a>Installation</h3>
<p class="has-line-data" data-line-start="6" data-line-end="7">O AppSage requer que o Visual Studio ou Visual Code com .NET Core 2.1, o Node JS (<a href="https://nodejs.org/">https://nodejs.org/</a>) versão atual, para instalação das dependências com o npm e o Protgres (<a href="https://www.postgresql.org/">https://www.postgresql.org/</a>) para armazenar os dados.</p>
<p class="has-line-data" data-line-start="8" data-line-end="9">Instalar as dependências do package.json utilizado no front-end:</p>
<pre><code class="has-line-data" data-line-start="11" data-line-end="15" class="language-sh">$ git <span class="hljs-built_in">clone</span> https://github.com/DanielAvelar/AppSage.git
$ <span class="hljs-built_in">cd</span> AppSage\AppSage\AppSage\ClientApp
$ npm install
</code></pre>
<h3 class="code-line" data-line-start=16 data-line-end=17 ><a id="Configurao_do_banco_de_dados_Postgres_16"></a>Configuração do banco de dados Postgres:</h3>
<ul>
<li class="has-line-data" data-line-start="18" data-line-end="19">Após instalar o Postgres, acessar o pgAdmin para executar o script de criação do Banco de Dados e suas respectivas tabelas.</li>
<li class="has-line-data" data-line-start="19" data-line-end="20">O script se encontra na pasta SQL, na raiz do projeto - AppSage\SQL\script.sql</li>
<li class="has-line-data" data-line-start="20" data-line-end="22">A string de conexão com o banco de dados está nas propriedades do projeto AppSage, depois em Depurar e Variáveis de Ambiente.</li>
</ul>
<h3 class="code-line" data-line-start=22 data-line-end=23 ><a id="Configurao_do_Docker_Alternativa_para_o_Postgres_22"></a>Configuração do Docker (Alternativa para o Postgres):</h3>
<p class="has-line-data" data-line-start="23" data-line-end="25"><img src="https://img.icons8.com/dusk/2x/docker.png" alt="picture"><br>
Caso não queria instalar o Postgres localmente na máquina, podemos utilizar o Docker e subir a image do Postgres:</p>
<ul>
<li class="has-line-data" data-line-start="27" data-line-end="28">Instalar o Docker (<a href="https://www.docker.com/">https://www.docker.com/</a>).</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">Na raiz do projeto executar o comando: docker-compose up -d</li>
<li class="has-line-data" data-line-start="29" data-line-end="30">Para verificar se a imagem do docker subiu corretamente, acessar a url: <a href="http://localhost:8080">http://localhost:8080</a></li>
</ul>
