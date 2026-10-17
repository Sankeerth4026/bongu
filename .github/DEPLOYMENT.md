# EC2 deployment

The workflow in `workflows/deploy.yml` runs validation on pull requests and pushes to `main`. A push to `main` deploys the Docker Compose app to EC2 over SSH. The instance must already have Docker Engine and the Docker Compose plugin installed.

## Configure GitHub

In the repository, open **Settings → Secrets and variables → Actions** and add:

| Name | Type | Value |
| --- | --- | --- |
| `EC2_HOST` | Secret | The instance's public IPv4 address or DNS name |
| `EC2_SSH_KEY` | Secret | The private SSH key for the deployment user |
| `EC2_KNOWN_HOSTS` | Secret | The verified SSH host-key line for this instance |
| `EC2_USER` | Variable | The SSH user, such as `ubuntu` or `ec2-user` |
| `EC2_APP_DIR` | Variable | An absolute deployment directory, such as `/home/ubuntu/test` |

Never commit the private key or application `.env` file. Obtain the EC2 host key from a trusted source and verify its fingerprint before saving it as `EC2_KNOWN_HOSTS`; do not disable SSH host-key checking.

The SSH user needs permission to run Docker commands and write to `EC2_APP_DIR`. Allow inbound TCP port `4000` in the instance's security group for the clients that should reach the app. Restrict SSH (port `22`) to trusted addresses.

The workflow intentionally excludes `backend/.env` and `backend/node_modules` from the deployment archive. Compose sets the app's container port to `4000`. If the app needs production secrets later, keep them off GitHub and pass them into the container through Compose environment settings backed by files or variables stored on EC2.

## Deploy

Open a pull request targeting `main` to run CI. Merging or pushing to `main` runs CI and, if it succeeds, deploys the application. You can also start the workflow manually from the **Actions** tab; manual runs validate/build but do not deploy.
