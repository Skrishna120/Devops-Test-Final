# Cloud Infrastructure and Kubernetes Deployment
### Steps to Deploy the Solution

#### 1. Clone the Repository

```bash
git clone https://github.com/Skrishna120/Devops-Test-Final.git
cd TASK
```
## 2. Containerize the Web Application
- i) docker build -t yourdockerhubusername/bookstore-app:latest . 
- ii)  docker push yourdockerhubusername/bookstore-app:latest
#### note:  yourdockerhubusername = username
## 3. Provision Infrastructure Using Terraform

#### run following commands
 - terraform init
 - terraform plan
 - terraform apply

## 4. Deploy the Application to Kubernetes 
  - kubectl apply -f deployment.yaml
  - kubectl apply -f service.yaml
## 5. Set Up Monitoring with Prometheus & Check the Pods and Services
  - kubectl get pods
  - kubectl get svc
#### Look for the EXTERNAL-IP of the bookstore-service to access the application.
```bash
  http://EXTERNAL-IP
```


Deployed version http://a13dec5e8ddef43f7a576c273ba5fc30-2120350676.us-east-1.elb.amazonaws.com/#/home

![image](https://github.com/user-attachments/assets/c8cc94ef-98e6-495e-9c9a-3e7848488be8)


![image](https://github.com/user-attachments/assets/fd49dbee-47d5-43f7-9700-d9174b7c8ed7)








