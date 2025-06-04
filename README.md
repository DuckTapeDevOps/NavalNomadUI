# Naval Nomad

A platform connecting boat owners (Shiplords) with digital nomads seeking to live aboard boats.

## Project Structure

- `/landing` - React landing page built with Vite
- `/terraform` - Infrastructure as Code for AWS deployment

## Development

1. Install dependencies:
```bash
cd landing
npm install
```

2. Start development server:
```bash
npm run dev
```

## Deployment

### GitHub Pages (Current)

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

1. Build the landing page:
```bash
cd landing
npm run build
```

2. The GitHub Action will automatically deploy the site to GitHub Pages.

### AWS S3 (Future)

When ready to deploy to AWS:

1. Build the landing page:
```bash
cd landing
npm run build
```

2. Deploy to S3:
```bash
cd ../terraform
terraform init
terraform plan
terraform apply
```

3. Upload the build files to S3:
```bash
aws s3 sync landing/dist/ s3://naval-nomad-landing/
```

## Infrastructure

The project uses Terraform to manage AWS infrastructure:

- S3 bucket for static website hosting
- Public access configuration
- Website endpoint configuration

## Future Enhancements

- Route53 for custom domain
- CloudFront for CDN
- API Gateway for backend services
- Database integration
- Authentication system
- GitHub Actions for CI/CD

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Intellectual Property Notice

While the code is open source under the MIT License, the Naval Nomad brand, business concept, and related assets remain proprietary. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on intellectual property rights and contribution guidelines.
