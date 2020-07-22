module "s3_cdn_habit_web" {
  source = "rosskuyper/s3-cloudfront/aws"

  name = local.service_name

  s3_kms_key_id   = data.aws_kms_key.s3.arn
  zone_id         = data.aws_route53_zone.habitualizer_com.zone_id
  certificate_arn = data.terraform_remote_state.environment.outputs.habitualizer_com_acm_arn
  domain_names = [
    "habitualizer.com",
    "www.habitualizer.com",
  ]
}

resource "aws_ssm_parameter" "web_cdn_bucket_name" {
  name      = "/${local.service_name}/web_cdn_bucket_name"
  type      = "String"
  value     = s3_cdn_habit_web.s3_bucket_name
  overwrite = "true"
}

resource "aws_ssm_parameter" "web_cdn_distribution_id" {
  name      = "/${local.service_name}/cloudfront_id"
  type      = "String"
  value     = s3_cdn_habit_web.cloudfront_id
  overwrite = "true"
}
