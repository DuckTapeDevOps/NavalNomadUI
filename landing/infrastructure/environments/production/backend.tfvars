bucket         = "naval-nomad-terraform-state"
key            = "frontend/production/terraform.tfstate"
region         = "us-east-1"
dynamodb_table = "naval-nomad-terraform-locks"
encrypt        = true
