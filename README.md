# Email Writer AI

Email Writer AI is a Chrome extension integrated with Gmail that helps you compose emails using AI.  
The frontend is built with **React.js** and the backend uses **Spring Boot (Java)**, powered by the **Gemini API** for AI-driven text generation.

---

## 🚀 Features
- Gmail integration as a Chrome Extension
- AI-powered email drafting and suggestions using Gemini API
- React.js frontend extension UI
- Spring Boot backend for API communication and logic
- Secure handling of API keys via environment variables or config files

---

## 🛠️ Project Structure
```
Email-Writer-Ai/
  Email-Writer-Ai/
    Email_Writer_Frontend/
      .gitignore
      Explaination.txt
      README.md
      eslint.config.js
      index.html
      package-lock.json
      package.json
      vite.config.js
      public/
        vite.svg
      src/
        App.css
        App.jsx
        index.css
        main.jsx
        assets/
          react.svg
    Email_writer_Extensions/
      content.css
      content.js
      image.png
      manifest.json
      test1.png
    email_writer/
      .gitattributes
      .gitignore
      mvnw
      mvnw.cmd
      pom.xml
      .mvn/
        wrapper/
          maven-wrapper.properties
      src/
        main/
          java/
            com/
              email/
                writer/
                  EmailWriterApplication.java
                  controller/
                    EmailGeneratorController.java
                  model/
                    EmailRequest.java
                  service/
                    EmailGeneratorService.java
          resources/
            application.properties
        test/
          java/
            com/
              email/
                writer/
                  EmailWriterApplicationTests.java
```

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Email-Writer-Ai.git
cd Email-Writer-Ai
```

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend folder.
2. Add your **Gemini API key** in `application.properties` or as an environment variable:
   ```properties
   gemini_api_key=YOUR_API_KEY
   ```
3. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

### 3. Frontend Setup (React Extension)
1. Navigate to the frontend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run dev
   ```
4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**

---

## ⚙️ Usage
1. Open Gmail in Chrome.
2. Click the Email Writer AI extension icon.
3. Enter your email context and get AI-generated draft suggestions.

---

## 🔑 API Key Setup
- Get your **Gemini API key** from [Google AI Studio](https://aistudio.google.com/).  
- Add it to backend `application.properties` or configure via environment variables.  
- **Do not hardcode API keys in source files.**

---

## 📌 Tech Stack
- **Frontend:** React.js, Chrome Extension APIs
- **Backend:** Spring Boot (Java)
- **AI Model:** Gemini API

---



