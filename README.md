# 🚜 FarmFinder

Welcome to the **FarmFinder** repository. This project is a comprehensive and scalable platform designed to modernize and streamline agricultural community interactions, asset management, and support. 

Built with a modern **microservices architecture**, FarmFinder ensures high availability, easy scalability, and strict security compliance.

---

## 🏗️ Architecture Overview

The system is designed with a service-oriented mindset, decoupling domains into focused, independently deployable microservices. 

![Microservices Architecture](https://img.shields.io/badge/Architecture-Microservices-success?style=for-the-badge&logo=architecture)

### 🛡️ Security (Identity & Access Management)
Security is a first-class citizen in this architecture. We utilize **Keycloak** as our central Identity Provider (IdP).
- **Authentication & Authorization:** Securing all endpoints using OAuth 2.0 and OpenID Connect (OIDC).
- **Role-Based Access Control (RBAC):** Granular permissions ensuring appropriate access levels across services.
- **Gateway Integration:** Token validation and routing are handled at the API Gateway level to ensure zero-trust communication.

### ⚙️ Backend Architecture
The backend is a robust mix of Java (Spring Boot), Node.js (Express), and Python, orchestrated seamlessly.
- **API Gateway & Service Discovery:**
  - **Netflix Eureka:** Service registry to keep track of all microservice instances dynamically.
  - **Spring Cloud Gateway:** The single entry point for all client requests, handling routing, rate limiting, and CORS.
- **Core Services:**
  - `service_users` (Java/Spring Boot): Manages user profiles and coordinates with Keycloak.
  - `service_event` (Java/Spring Boot): Handles community events and scheduling.
  - `service_notifications` (Java/Spring Boot): Messaging and real-time alerts.
  - `Post-Service` (Node.js/Express): Manages the social feed, including posts, text, images, videos, and real-time reactions.
  - `reclamation-service` (Node.js/Express): A dedicated pipeline for user reports and issues.
- **AI & NLP:**
  - `chatbot` (Python/PyTorch/NLTK): An embedded NLP-powered conversational agent that assists users with common farming inquiries.

### 🌐 Frontend (Web Application)
The web portal provides a rich, responsive interface for users managing complex data and workflows.
- **Framework:** Angular 17+
- **Styling:** Tailwind CSS for a modern, utility-first design system.
- **State Management & Routing:** Standard Angular RxJS paradigms for highly reactive UI updates.

### 📱 Mobile (Android)
The mobile client provides on-the-go access to the platform's core functionalites, built for optimal performance on agricultural sites.
- **Technology:** Native Android apps using **Kotlin** (`mobile_version_kotlin`).
- **Features:** Direct integration with the API Gateway, utilizing modern Android architectural components (MVVM, Coroutines, Retrofit).

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose (for infrastructure like Keycloak and databases)
- [Java 17+](https://adoptium.net/) (for Spring Boot microservices)
- [Node.js 18+](https://nodejs.org/en/) (for Express microservices & Angular frontend)
- [Python 3.9+](https://www.python.org/) (for training and running the Chatbot)
- [Android Studio](https://developer.android.com/studio) (for the Kotlin app)

### Quick Run Guide
1. **Infrastructure:** Start Keycloak and your respective databases (PostgreSQL/MongoDB based on the service).
2. **Discovery & Gateway:** Start the **Eureka Server**, followed by the **API Gateway**.
3. **Microservices:** Start the individual domain services (`Users`, `Posts`, `Reclamations`, etc.). Ensure they successfully register with Eureka.
4. **Frontend:** Navigate to the `Frontend` folder, run `npm install` and then `npm start`.
5. **Mobile:** Open `mobile_version_kotlin` in Android Studio and build the project via Gradle.
