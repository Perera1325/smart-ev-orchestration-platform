# Infrastructure as Code (Terraform)

This directory contains the Terraform configuration files to provision the core AWS infrastructure for the Smart EV Charging Orchestration Platform.

## Architecture Overview

The infrastructure consists of:
- **VPC**: A dedicated Virtual Private Cloud.
- **Subnet**: A public subnet with internet access.
- **Internet Gateway**: Allows traffic between the VPC and the internet.
- **Security Group**: Configured to allow traffic on ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).
- **EC2 Instance**: A free-tier eligible instance running Amazon Linux 2.
- **S3 Bucket**: A bucket for general storage and logging.
- **IAM Role**: An execution role for EC2 with read-only access to S3.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) installed (v1.0.0+).
- AWS CLI configured with appropriate credentials.

## Deployment Commands

Follow these steps to deploy the infrastructure:

1. **Initialize Terraform**:
   Download the necessary providers and initialize the backend.
   ```bash
   terraform init
   ```

2. **Plan the Deployment**:
   Preview the changes that Terraform will make to your AWS account.
   ```bash
   terraform plan
   ```

3. **Apply the Changes**:
   Provision the resources in your account.
   ```bash
   terraform apply
   ```

4. **Verify Outputs**:
   After the deployment, the public IP of the EC2 instance and the S3 bucket name will be displayed in the terminal.

## Variables

You can customize the deployment by modifying `variables.tf` or provide a `terraform.tfvars` file. Key variables include:
- `aws_region`: The AWS region to deploy to (default: `us-east-1`).
- `instance_type`: The EC2 instance type (default: `t2.micro`).
- `project_name`: Used for tagging resources.
