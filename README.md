# **Keep Safe**

## **Project Overview**

**Keep Safe** is a web application that allows users to securely store, manage, and retrieve passwords for various services. Built with **Python (Flask)** on the backend and **React** on the frontend, it leverages **AWS DynamoDB** for cloud-based storage and **AWS Secrets Manager** for secure encryption key management. The project demonstrates the use of design patterns like **Singleton**, **Facade**, and **Factory Method**, alongside a **layered architecture** for modularity and scalability.

## **Features**

- **User Registration and Login**: Users can securely register and log in to the application.
- **Password Management**: Users can add, edit, delete, and retrieve encrypted passwords.
- **Password Encryption**: All passwords are stored in encrypted form using **AES encryption**.
- **Password Categories**: Users can categorize their passwords (e.g., "Social Media", "Work").
- **Secure Password Generation**: Built-in password generator with different complexity levels (simple, complex).
- **AWS Integration**: Uses **AWS DynamoDB** for cloud-based data storage and **AWS Secrets Manager** for encryption key storage.

## **Tech Stack**

- **Backend**: Python, Flask, Boto3 (AWS SDK), Cryptography, bcrypt
- **Frontend**: React.js, React Router
- **Database**: AWS DynamoDB (NoSQL)
- **Cloud Services**: AWS Secrets Manager (for encryption keys), AWS DynamoDB (for data storage)
