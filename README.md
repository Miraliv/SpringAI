# 🤖 Chatbot Java com Spring AI + Ollama (Llama3)

Chatbot inteligente desenvolvido em **Java 21 com Spring Boot**, utilizando **Spring AI** para integrar com o modelo **Llama3** (via Ollama). Interface web simples com HTML, CSS e JavaScript (Axios para chamadas assíncronas).

![Interface do Chatbot](Captura%20de%20Tela.png) *(Interface do projeto)*

## 🛠️ Tecnologias Utilizadas
### Back-end
- Java 21
- Spring Boot 3.2.5
- Spring AI
- Ollama (com modelo Llama3)

### Front-end
- HTML5 + CSS3
- JavaScript
- Axios

## ⚠️ Pré-requisitos (Windows)
1. **Ollama instalado**:
   - Baixe em [ollama.com](https://ollama.com)
   - Instale normalmente (.exe)

2. **Java 21 JDK**:
   - [Amazon Corretto 21](https://corretto.aws/) ou
   - [Eclipse Temurin 21](https://adoptium.net/)

3. **Maven 3.9.9** (opcional - pode usar `mvnw` incluso)

## 🚀 Como Executar (Windows)
1. **Inicie o Ollama**:
   ```cmd
   ollama run llama3
   ```
   *Mantenha esta janela do CMD aberta!*

2. **Execute o projeto** (em outro CMD):
   ```cmd
   .\mvnw spring-boot:run
   ```

3. **Acesse no navegador**:
   ```
   http://localhost:8080
   ```

## 🔧 Configuração
O arquivo `src/main/resources/application.properties` já vem configurado:
```properties
# Configuração do Ollama
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.model=llama3
```

## 🎯 Funcionalidades
- Chat interativo com IA local
- Interface responsiva
- Histórico de conversa
- Fácil troca de modelos (editando `application.properties`)

## ⚠️ Solução de Problemas
Se não funcionar:
1. Verifique se o Ollama está respondendo:
   ```cmd
   curl http://localhost:11434/api/tags
   ```
   (deve mostrar os modelos instalados)

2. Confira a versão do Java:
   ```cmd
   java -version
   ```
   *Deve mostrar "21.x.x"*

3. Problemas de memória?
   ```cmd
   ollama pull llama3:7b  # Versão menor se tiver pouca RAM
   ```

## 📂 Estrutura do Projeto
```
chatbot-spring-ai/
Spring-AI [chatbot]
├── src
    └── main
    │   ├── java
    │       └── com
    │       │   └── ai
    │       │       └── chatbot
    │       │           ├── ChatbotApplication.java
    │       │           ├── config
    │       │               └── ChatConfig.java
    │       │           ├── controller
    │       │               ├── ChatRestController.java
    │       │               └── PageController.java
    │       │           ├── model
    │       │               └── Mensagem.java
    │       │           └── service
    │       │               └── ChatService.java
    │   └── resources
    │       ├── application.properties
    │       ├── static
    │           ├── css
    │           │   └── style.css
    │           └── js
    │           │   └── chat.js
    │       └── templates
    │           └── chat.html
├── LICENSE
├── README.md
├── pom.xml
```

## 📄 Licença
MIT License - [LICENSE](./LICENSE)

---

**Desenvolvido por Kauã Vilarim**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/kaua-vilarim/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/Miraliv)

> ℹ️ Testado no Windows 11 com Java 21 e Ollama 0.1.34
