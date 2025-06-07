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
    name                = "email"
    attribute_data_type = "String"
    mutable            = true
    required           = true
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    mutable            = true
    required           = true
  }

  schema {
    name                = "naval_nomad_status"
    attribute_data_type = "String"
    mutable            = true
    required           = false
  }

  schema {
    name                = "instagram_handle"
    attribute_data_type = "String"
    mutable            = true
    required           = false
  }

  schema {
    name                = "youtube_channel"
    attribute_data_type = "String"
    mutable            = true
    required           = false
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

# Google OAuth provider
resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.naval_nomad.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "email profile openid"
    client_id        = local.google_oauth.client_id
    client_secret    = local.google_oauth.client_secret
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
    name     = "name"
  }
}

# User pool client
resource "aws_cognito_user_pool_client" "naval_nomad" {
  name = "naval-nomad-web-client"

  user_pool_id = aws_cognito_user_pool.naval_nomad.id

  generate_secret = false

  # OAuth settings
  callback_urls = ["https://${var.domain_name}/auth/callback"]
  logout_urls   = ["https://${var.domain_name}"]

  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true

  # Token validity
  refresh_token_validity = 30
  access_token_validity  = 1
  id_token_validity     = 1

  token_validity_units {
    refresh_token = "days"
    access_token  = "hours"
    id_token     = "hours"
  }

  # Prevent user existence errors
  prevent_user_existence_errors = "ENABLED"

  # Enable OAuth flows
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]

  # Enable token revocation
  enable_token_revocation = true
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

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.naval_nomad.id
    provider_name           = aws_cognito_user_pool.naval_nomad.endpoint
    server_side_token_check = true
  }
}

# Attach policies to the role
resource "aws_iam_role_policy_attachment" "cognito_auth_policy" {
  role       = aws_iam_role.cognito_auth_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognito-DeveloperAuthenticatedIdentities"
}

# Add additional policy for Cognito Identity Pool access
resource "aws_iam_role_policy_attachment" "cognito_identity_policy" {
  role       = aws_iam_role.cognito_auth_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognito-DeveloperAuthenticatedIdentities"
} 