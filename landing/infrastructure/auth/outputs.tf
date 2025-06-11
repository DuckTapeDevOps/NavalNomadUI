output "user_pool_id" {
  description = "The ID of the Cognito User Pool"
  value       = aws_cognito_user_pool.naval_nomad.id
}

output "user_pool_arn" {
  description = "The ARN of the Cognito User Pool"
  value       = aws_cognito_user_pool.naval_nomad.arn
}

output "identity_pool_id" {
  description = "The ID of the Cognito Identity Pool"
  value       = aws_cognito_identity_pool.naval_nomad.id
}

output "cognito_auth_role_arn" {
  description = "The ARN of the Cognito Auth Role"
  value       = aws_iam_role.cognito_auth_role.arn
} 