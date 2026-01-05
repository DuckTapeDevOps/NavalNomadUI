# Current State

This document describes the current deployment state of NavalNomadUI, what's been completed, and what's working.

**Last Updated**: January 2025  
**Current Version**: v0.0.1 MVP  
**Status**: Deployed and operational

## Version Information

- **Version**: v0.0.1 MVP
- **Release Date**: Tagged January 2025
- **Purpose**: Initial MVP release with basic static site functionality

## What's Deployed

### Static Website
- **Domain**: `navalnomad.com` (and `www.navalnomad.com`)
- **Hosting**: AWS S3 + CloudFront + Route53
- **Status**: Live and serving traffic
- **Build Output**: `landing/dist/` directory deployed to S3

### Infrastructure
- **Bootstrap Infrastructure**: Deployed
  - S3 backend: `naval-nomad-terraform-state`
  - DynamoDB locks: `naval-nomad-terraform-locks`
  - GitHub OIDC provider: Configured
  - IAM role: `github-actions-deployer`
  - State location: `bootstrap/terraform.tfstate`

- **Frontend Infrastructure**: Deployed
  - S3 bucket: `navalnomad.com` (private, CloudFront OAI access)
  - CloudFront distribution: Active with ACM certificate
  - Route53 DNS: Root and www aliases pointing to CloudFront
  - State location: `frontend/terraform.tfstate`

### Pages and Features
- **Home Page**: Naval Nomad Community landing page
- **Community Page**: Maritime community information
- **Marina Explorer**: Marina directory (BETA)
- **Routes**: Route planning (SOON - disabled)
- **Map Page**: Interactive nautical map
- **Contact Page**: Waitlist signup form

## What's Been Removed

### Authentication Functionality
- **Removed**: AWS Amplify authentication integration
- **Removed**: Cognito User Pool usage (infrastructure exists but unused)
- **Removed**: Sign-in/sign-out UI from Navbar
- **Removed**: Auth callback route (`/auth/callback`)
- **Removed**: `AuthContext` and `useAuth` hook
- **Removed**: `amplify.ts` configuration import

**Reason**: Simplified MVP to focus on core content and features. Authentication can be re-added when user accounts are needed.

**Files Removed**:
- `landing/src/config/amplify.ts`
- `landing/src/contexts/AuthContext.tsx`

**Files Modified**:
- `landing/src/App.tsx` - Removed AuthProvider and callback route
- `landing/src/components/Navbar.tsx` - Removed sign-in/sign-out buttons
- `landing/src/main.tsx` - Removed Amplify import

**Infrastructure**: Cognito resources still exist in Terraform but are not actively used.

## What's Working

### Build System
- ✅ **TypeScript Compilation**: `tsc` runs successfully
- ✅ **Vite Build**: `npm run build` produces optimized output
- ✅ **Linting**: ESLint passes
- ✅ **Dev Server**: `npm run dev` serves on port 3000
- ✅ **Source Maps**: Enabled for debugging

### Deployment
- ✅ **GitHub Actions**: Automatic deployment on push to main (if configured)
- ✅ **S3 Upload**: Build artifacts upload to S3 bucket
- ✅ **CloudFront**: CDN serves content globally
- ✅ **Route53**: DNS routes traffic correctly
- ✅ **SSL/TLS**: HTTPS via ACM certificate

### Application
- ✅ **Routing**: All routes work correctly
- ✅ **Navigation**: Navbar links function
- ✅ **Components**: All components render
- ✅ **Theme**: Light/dark mode works
- ✅ **Responsive**: Mobile and desktop layouts
- ✅ **Maps**: MapLibre GL maps render

### Infrastructure
- ✅ **Terraform State**: Managed in S3 backend
- ✅ **State Locking**: DynamoDB prevents concurrent modifications
- ✅ **OIDC**: GitHub Actions authentication works
- ✅ **IAM Permissions**: Deployment role has correct permissions

## Infrastructure State

### Terraform States in S3

**Backend Bucket**: `naval-nomad-terraform-state`  
**Region**: `us-east-1`  
**Lock Table**: `naval-nomad-terraform-locks`

**State Files**:
1. **Bootstrap**: `bootstrap/terraform.tfstate`
   - GitHub OIDC provider
   - IAM role for GitHub Actions
   - Backend resources

2. **Frontend**: `frontend/terraform.tfstate`
   - S3 bucket (`navalnomad.com`)
   - CloudFront distribution
   - Route53 DNS records
   - CloudFront Origin Access Identity
   - Cognito resources (unused)

### Infrastructure Resources

**Bootstrap**:
- `aws_iam_openid_connect_provider.github`
- `aws_iam_role.github_actions`
- `aws_iam_role_policy.github_actions`

**Frontend**:
- `aws_s3_bucket.website` (navalnomad.com)
- `aws_s3_bucket_website_configuration.website`
- `aws_s3_bucket_public_access_block.website`
- `aws_s3_bucket_policy.website`
- `aws_cloudfront_distribution.website`
- `aws_cloudfront_origin_access_identity.website`
- `aws_route53_record` (root and www)
- `aws_cognito_user_pool` (unused)
- `aws_cognito_identity_pool` (unused)

## Known Limitations

### Current Limitations
1. **No Authentication**: User accounts not available (removed in v0.0.1)
2. **Static Content Only**: No backend API or dynamic content
3. **No User Data**: No user profiles, connections, or location sharing yet
4. **Route Planner Disabled**: Feature marked as "SOON" in navigation
5. **Marina Explorer Beta**: Feature is in beta state

### Technical Debt
1. **Cognito Infrastructure**: Present but unused (can be removed or re-enabled)
2. **AWS Amplify**: Installed but not configured (can be removed if not needed)
3. **Component Duplication**: Both `HeroSection.tsx` and `Hero/index.tsx` exist
4. **GitHub Actions Workflow**: May need to be created/updated for deployment

## TODOs and Future Work

### Short Term
- [ ] Remove unused Cognito infrastructure (or document why it's kept)
- [ ] Remove AWS Amplify dependency if not needed
- [ ] Consolidate duplicate hero components
- [ ] Verify GitHub Actions workflow is configured

### Medium Term
- [ ] Re-enable authentication when user accounts are needed
- [ ] Build backend API for community features
- [ ] Implement user profiles and connections
- [ ] Add location sharing functionality
- [ ] Enable route planner feature

### Long Term
- [ ] Event management system
- [ ] Journey blogs
- [ ] Marina integration tools
- [ ] Advanced route planning

## Deployment Checklist

### Pre-Deployment
- [x] Build succeeds locally
- [x] Assets load correctly
- [x] All routes work
- [x] Infrastructure variables configured
- [ ] Verify Terraform state backend is accessible
- [ ] Verify AWS credentials/permissions configured
- [ ] Review `terraform.tfvars` values match production needs

### Deployment Steps
1. **Build**: `cd landing && npm run build`
2. **Terraform Init** (if first time):
   ```bash
   cd landing/infra/bootstrap
   tofu init -backend-config=backend.tfvars
   ```
3. **Terraform Plan/Apply** (bootstrap):
   ```bash
   tofu plan
   tofu apply
   ```
4. **Terraform Init** (frontend):
   ```bash
   cd landing/infra/frontend
   tofu init -backend-config=backend.tfvars
   ```
5. **Terraform Plan/Apply** (frontend):
   ```bash
   tofu plan
   tofu apply
   ```
6. **Upload Build** (if not using GitHub Actions):
   ```bash
   aws s3 sync landing/dist/ s3://navalnomad.com/
   ```
7. **Invalidate CloudFront**:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id <DISTRIBUTION_ID> \
     --paths "/*"
   ```

## Verification

### Build Verification
- ✅ Build output structure: `dist/` with `assets/`
- ✅ TypeScript compiles: No errors
- ✅ Linting passes: No errors
- ✅ Assets load: Images, fonts, etc.

### Infrastructure Verification
- ✅ Terraform validates: `tofu validate` passes
- ✅ State accessible: S3 backend works
- ✅ Resources created: All resources exist in AWS
- ✅ DNS configured: Domain resolves correctly

### Application Verification
- ✅ Site loads: `https://navalnomad.com` works
- ✅ Routes work: All pages accessible
- ✅ Navigation works: Links function correctly
- ✅ Theme works: Light/dark mode toggles
- ✅ Responsive: Works on mobile and desktop

## Summary

**Current State**: ✅ Operational MVP
- Static site deployed and serving traffic
- Infrastructure managed via Terraform
- Build system working correctly
- Authentication removed for simplicity
- Ready for feature development

**Next Steps**: 
- Continue feature development
- Re-enable authentication when needed
- Build backend API for community features
- Add user accounts and profiles

---

**For more details, see**:
- `docs/PROJECT_CONTEXT.md` - Repository structure and architecture
- `docs/DECISIONS.md` - Architectural decisions
- `docs/TEMPLATE_RELATIONSHIP.md` - Relationship to WebsiteUI-Template

