provider "aws" {
  version = "~> 2"
  region  = "eu-central-1"
}

data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

data "aws_route53_zone" "habitualizer_com" {
  name         = "habitualizer.com."
  private_zone = false
}

data "aws_kms_key" "ssm" {
  key_id = "alias/ssm"
}

data "aws_kms_key" "s3" {
  key_id = "alias/s3"
}
