# Get the existing ACM certificate for navalnomad.com
data "aws_acm_certificate" "navalnomad" {
  domain      = "navalnomad.com"
  statuses    = ["ISSUED"]
  most_recent = true
}

# Get the Route53 hosted zone for navalnomad.com
data "aws_route53_zone" "navalnomad" {
  name = "navalnomad.com"
}

# Get current AWS account ID
data "aws_caller_identity" "current" {}
