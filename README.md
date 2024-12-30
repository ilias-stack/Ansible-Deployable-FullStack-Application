# DevOps Application

This project provides a robust deployment-ready solution featuring a chatbot with a centralized PostgreSQL database, frontend (Angular), backend (Spring Boot and Spring AI), and automated deployment using Ansible.

---

## Features

- **Frontend**: Built with Angular, featuring a responsive design and user-friendly interfaces.
- **Backend**: Spring Boot application with AI integration using OpenAI.
- **Database**: Centralized PostgreSQL instance for data integrity and secure session storage.
- **CI/CD**: Deployment automation with Ansible for efficiency and cost reduction.
- **Containerization**: Dockerized services for portability and scalability.

---

## Prerequisites

- **Docker & Docker Compose**: Ensure Docker and Docker Compose are installed.
- **Git**: For cloning the repository.
- **Ansible**: Required in master node for deployment automation.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ilias-stack/Ansible-Deployable-FullStack-Application.git
cd Ansible-Deployable-FullStack-Application
```
> [!NOTE]  
> **Separation of Deployment and Application**: The `ansible-deployer` folder should be copied to and executed from a separate master node that will handle the deployment process. The application code (`application` folder) is maintained separately and deployed to the target machines where it will run after the Ansible playbooks are executed.


### 2. Configure Ansible
- Edit the `ansible-deployer/inventory.yml` file to define your server hosts. Replace <server-ip> with the IP addresses of your servers.
- Add your AI token to the **`ansible-deployer/token.txt`** file. This token will be passed to the backend during deployment.

  ### 3. Initialize the Instances
Prepare the servers by running the following Ansible playbook. This will install dependencies and configure the environment:
```bash
ansible-playbook -i ansible-deployer/inventory.yml ansible-deployer/init-instance.yml
```

### 4. Configure the Backend & Database
Before running the application, you need to ensure the backend has access to a PostgreSQL instance for text embedding.
- **Option 1: Use Remote PostgreSQL Instance**, If you are using a remote PostgreSQL instance (e.g., hosted on a different server or a managed database service), make sure the backend's `application.properties` file is configured to point to the correct PostgreSQL host and credentials.

Example application.properties configuration:
```properties
spring.datasource.url=jdbc:postgresql://<remote-server-ip>:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```
- **Option 2: Run PostgreSQL Locally**.

Example application.properties configuration:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```


### 5. Deploy the Application
Deploy the application to all defined servers using the following command:
```bash
ansible-playbook -i ansible-deployer/inventory.yml ansible-deployer/deploy.yml
```

This playbook will:
1. Read the AI token from the `token.txt` file.
2. Transfer necessary files to the servers.
3. Execute the `deploy.sh` script on each server to build and run Docker containers for the application.


## Testing the Application
Once the application is deployed, access the frontend via the browser. You should be able to interact with the chatbot and perform necessary tasks. If there are any issues, check the logs of the backend or database for more information.
`docker logs <container-id>`


## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

