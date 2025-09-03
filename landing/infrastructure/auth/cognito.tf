resource "aws_cognito_user_pool" "naval_nomad" {
  name = "naval-nomad-users"

  # Password policy
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # User attributes
  schema {
    name                = "instagram_handle"
    attribute_data_type = "String"
    developer_only_attribute = false
    mutable            = true
    required           = false
    string_attribute_constraints {
      min_length = 1
      max_length = 30  # Instagram usernames are limited to 30 characters
    }
  }

  schema {
    name                = "naval_nomad_status"
    attribute_data_type = "String"
    developer_only_attribute = false
    mutable            = true
    required           = false
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  schema {
    name                = "youtube_channel"
    attribute_data_type = "String"
    developer_only_attribute = false
    mutable            = true
    required           = false
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  # Verification message template
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  # Admin create user config
  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  # Auto verified attributes
  auto_verified_attributes = ["email"]
}

# Get Google OAuth secrets from Secrets Manager
data "aws_secretsmanager_secret" "google_oauth" {
  name = "naval-nomad/google-oauth"
}

data "aws_secretsmanager_secret_version" "google_oauth" {
  secret_id = data.aws_secretsmanager_secret.google_oauth.id
}

locals {
  google_oauth = jsondecode(data.aws_secretsmanager_secret_version.google_oauth.secret_string)
}

# Google OAuth provider
resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.naval_nomad.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes              = "email profile openid"
    client_id                     = local.google_oauth.client_id
    client_secret                 = local.google_oauth.client_secret
    attributes_url                = "https://people.googleapis.com/v1/people/me?personFields="
    attributes_url_add_attributes = "true"
    authorize_url                 = "https://accounts.google.com/o/oauth2/v2/auth"
    oidc_issuer                   = "https://accounts.google.com"
    token_request_method          = "POST"
    token_url                     = "https://www.googleapis.com/oauth2/v4/token"
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
    name     = "name"
  }
}

# IAM role for Cognito
resource "aws_iam_role" "cognito_auth_role" {
  name = "naval-nomad-cognito-auth-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = "cognito-identity.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "cognito-identity.amazonaws.com:aud" = aws_cognito_identity_pool.naval_nomad.id
          }
        }
      }
    ]
  })
}

# Identity pool
resource "aws_cognito_identity_pool" "naval_nomad" {
  identity_pool_name = "naval-nomad-identity-pool"
  allow_unauthenticated_identities = false
}

# Attach policy to the role
resource "aws_iam_role_policy_attachment" "cognito_auth_policy" {
  role       = aws_iam_role.cognito_auth_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoDeveloperAuthenticatedIdentities"
}
