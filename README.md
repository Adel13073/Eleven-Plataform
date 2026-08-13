# ELEVEN Platform

Landing page da ELEVEN Technology, uma plataforma de inteligência artificial para empresas.

## Sobre o projeto

Esta é a página principal da ELEVEN Technology. Apresenta os cinco módulos de IA que a empresa desenvolve: Atendimento Inteligente, Reconhecimento de Voz, Análise de Dados, Otimização de Rotas e Geração de Imagens. A página inclui um dashboard interativo, uma secção de planos e um assistente virtual que pode ser testado diretamente no site.

A página foi construída para ser funcional, visualmente consistente e mostrar o que a plataforma oferece de forma clara.


## Funcionalidades principais

- Design responsivo que se adapta a qualquer ecrã
- Animação suave ao fazer scroll pela página
- Dashboard com indicadores de desempenho e gráfico de barras
- Efeito 3D nos cartões dos serviços ao passar o rato
- Assistente virtual integrado que responde a perguntas básicas sobre a empresa
- Formulário de contacto com validação e feedback visual

## Tecnologias utilizadas

- HTML5
- CSS3 (com variáveis, grid, flexbox e animações)
- JavaScript (ES6+)
- Groq API com o modelo LLaMA 3.3

## Estrutura do projeto
Eleven-Plataform/
├── index.html 
├── css/
│ └── style.css 
├── js/
 └── script.js 


## Como correr o projeto localmente

1. Descarregue ou clone o repositório.
2. Abra o ficheiro `index.html` no seu navegador.
3. A página funciona sem necessidade de servidor, pois é estática.

## Assistente virtual

O chat que aparece no canto inferior direito responde a perguntas sobre a ELEVEN, os seus serviços e preços.

Por defeito, o assistente está em modo de demonstração. Isso significa que as respostas são pré-definidas e não dependem de ligação à internet ou de chave API. É uma forma de testar a funcionalidade sem complicações.

Se quiser ligar o assistente à API real da Groq, precisa de fazer o seguinte:

1. Obtenha uma chave gratuita em console.groq.com.
2. Crie um ficheiro chamado `js/config.js` com o seguinte conteúdo:
   ```javascript
   const GROQ_KEY = 'gsk_a_sua_chave_aqui';


 ## Créditos
Este projeto foi desenvolvido pela equipa de Devs da ELEVEN Techonoly.
