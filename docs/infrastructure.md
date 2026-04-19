# Infrastructure as Code (IaC) Strategy

## Overview

The Smart EV Charging Orchestration Platform leverages **Infrastructure as Code (IaC)** to ensure that the environment is reproducible, scalable, and version-controlled. By defining the infrastructure in code, we eliminate manual configuration errors and enable automated deployments through CI/CD pipelines.

## Why Terraform?

We have chosen **HashiCorp Terraform** over AWS CloudFormation for the following reasons:
- **Cloud Agnostic**: While we are currently using AWS, Terraform supports multiple providers, allowing for easier multi-cloud or hybrid-cloud strategies in the future.
- **State Management**: Terraform's state file provides a reliable way to track resources and detect configuration drift.
- **Modular Design**: Terraform allows us to create reusable modules for common infrastructure patterns.
- **Improved Syntax (HCL)**: HashiCorp Configuration Language (HCL) is generally considered more readable and expressive than JSON/YAML-based CloudFormation templates.

## Component Breakdown

### 1. Networking (VPC & Subnets)
A dedicated **Virtual Private Cloud (VPC)** provides a logically isolated section of the AWS cloud. We use a **Public Subnet** to host internet-facing resources, secured by an **Internet Gateway**.

### 2. Compute (EC2)
A **t2.micro** instance (Free Tier eligible) serves as the primary compute resource for initial hosting or as a jump box. It is associated with an **IAM Instance Profile** for secure AWS service access without hardcoded credentials.

### 3. Storage (S3)
An **Amazon S3** bucket is provisioned for storing application logs, configuration files, and static assets. Access is restricted using IAM policies.

### 4. Security (IAM & Security Groups)
- **IAM Roles**: We follow the principle of least privilege, granting the EC2 instance only the specific permissions it needs (e.g., S3 ReadOnly access).
- **Security Groups**: Acts as a virtual firewall, restricting inbound traffic to essential ports (22, 80, 443).

## Scalability and Automation

This foundational infrastructure is designed to grow. In future iterations, we will move towards:
- **AWS Lambda** for serverless scaling of microservices.
- **Amazon RDS** for managed relational databases.
- **Auto Scaling Groups** for compute resilience.
- **CI/CD Integration** via GitHub Actions to automatically apply infrastructure changes on merge.
