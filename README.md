# 🛍️ Angular E-Commerce Frontend

This project is the **frontend** for an e-commerce web application, developed using **Angular 20** and **Angular Material 20**. It currently features fully functional **Login** and **Signup** pages with secure client-side encryption for transmitting sensitive user data (e.g., passwords) to the backend.

---

## 🚀 Features Implemented

- ✅ **Login & Signup UI** using Angular Material components.
- ✅ **Client-side AES encryption** for securely sending passwords and sensitive data.
- ✅ **Reactive Forms with validation** (email, password strength, etc.)
- ✅ **Theme-ready UI** (custom Material 20 palette support)
- ✅ Responsive design for mobile & desktop

---

## 🔐 Security

Sensitive form data (e.g., passwords) is encrypted in the browser before being sent to the backend using AES encryption. The encryption uses:

- Dynamic IV (Initialization Vector)
- Shared key exchange protocol
- Base64 encoding for transmission

> ⚠️ Backend must implement matching decryption logic using the same IV/key mechanism.

---

## 📦 Installation

Ensure [Node.js](https://nodejs.org/) is installed. Then run:

```bash
npm install

---

## 🧪 Running the App

To start the development server:

```bash
ng serve

---


