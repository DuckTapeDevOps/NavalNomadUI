# Architecture Decisions

This document records key architectural decisions for the NavalNomadUI repository.

## Why NavalNomadUI Uses WebsiteUI-Template

NavalNomadUI is built from **WebsiteUI-Template** as its foundation. This decision provides:

- **Proven Build System**: Vite + React + TypeScript setup that works
- **Working Deployment Architecture**: S3 + CloudFront + Route53 infrastructure that's tested and deployed
- **Reusable UI Component Patterns**: Component structure and patterns that can be customized
- **Infrastructure as Code**: Terraform/OpenTofu setup with proper state management
- **Faster Development**: Start with working infrastructure rather than building from scratch

By using the template, NavalNomadUI can focus on product-specific features and content rather than infrastructure setup.

## What Stays from Template vs What's NavalNomad-Specific

### Inherited from Template (Preserve Structure)
- **Build System**: Vite configuration, TypeScript config, build scripts
- **Infrastructure Architecture**: Terraform resource definitions, deployment flow
- **Component Patterns**: Reusable UI components (HeroSection, FeatureGrid, etc.)
- **Application Structure**: Router setup, provider patterns, file organization
- **Deployment Process**: Build → S3 → CloudFront → Route53 flow

### NavalNomad-Specific (Customized)
- **Content**: Page text, feature descriptions, navigation labels (maritime-focused)
- **Visual Identity**: Colors (navy/blue palette), fonts (Playfair Display, Inter), images, logos
- **Domain/Infrastructure**: Domain name (`navalnomad.com`), bucket names, resource names
- **Business Logic**: Domain-specific pages (Marina Explorer, Routes, Community)
- **Branding**: "Naval Nomad" brand name, "Turning Marinas into Villages" tagline

## Build and Deployment Preservation

**Critical:** The build output structure and deployment behavior must remain compatible with the template.

### Build Output
- Output directory: `landing/dist/`
- Structure: `index.html` + `assets/` directory
- Build command: `npm run build` (unchanged)
- Asset paths: Relative paths from root (unchanged)

### Deployment Flow
1. Build → `dist/` directory
2. Upload → S3 bucket (via GitHub Actions or manual)
3. Invalidate → CloudFront cache
4. Route → Route53 DNS

**Why Preserve:**
- Maintains compatibility with template updates
- Ensures deployment process remains predictable
- Allows reuse of CI/CD workflows
- Simplifies infrastructure management

## Infrastructure Decisions

### Why S3 + CloudFront + Route53

**S3 (Static Hosting)**:
- Cost-effective for static sites
- Scalable and reliable
- Integrates well with CloudFront

**CloudFront (CDN)**:
- Global content delivery
- SSL/TLS termination
- Cache optimization
- Origin Access Identity for security (private S3 bucket)

**Route53 (DNS)**:
- AWS-native DNS management
- Seamless integration with CloudFront
- Supports both root and www subdomain aliases

### Why OIDC for CI/CD

**GitHub Actions OIDC**:
- No stored AWS credentials in GitHub
- Secure, short-lived tokens
- IAM role-based permissions
- Follows AWS security best practices

### Why OpenTofu/Terraform

**Infrastructure as Code**:
- Version-controlled infrastructure
- Reproducible deployments
- State management via S3 backend
- Locking via DynamoDB table

**State Management**:
- Separate state files for bootstrap and frontend
- Remote state in S3 for team collaboration
- DynamoDB table prevents concurrent modifications

## Authentication Removal Decision

**Decision**: Authentication functionality was removed in v0.0.1 MVP.

**Why**:
- Simplifies the MVP to focus on core content and features
- Removes complexity of user management
- Allows faster iteration on product features
- Can be re-added later when needed

**What Was Removed**:
- `src/config/amplify.ts` - Amplify configuration
- `src/contexts/AuthContext.tsx` - Authentication context
- Sign-in/sign-out UI from Navbar
- Auth callback route from App.tsx
- Cognito infrastructure still exists but is not used

**Future Considerations**:
- Authentication can be re-enabled when user accounts are needed
- Cognito infrastructure is already in place
- Will need to restore AuthContext and configure Amplify

## Configuration Patterns

### Infrastructure Variables
- Variables defined in `variables.tf` files
- Values provided in `terraform.tfvars` files
- No hardcoded defaults (after Phase 2 sync)
- Example files provided for reference

### Component Props
- Text content is prop-driven where possible
- Brand-specific content in components (Navbar, Contact)
- Reusable components accept props for flexibility

### Theme System
- Chakra UI theme extension structure
- Brand colors and fonts in `theme.ts`
- Color mode support (light/dark) with system preference detection

## Future Architecture Considerations

### State Management
- Currently using React local state only
- May need global state management (Redux, Zustand, Context API) as features grow
- Consider when user data, authentication, or complex state is needed

### Content Management
- Currently content is in component files
- May need CMS or content files as content grows
- Consider markdown files or headless CMS for blog/guides

### API Integration
- Currently static site only
- Will need backend API for user features (profiles, connections, location sharing)
- Consider API architecture when building community features

### Authentication Re-introduction
- Cognito infrastructure exists but unused
- Will need to restore AuthContext when user accounts are needed
- Consider OAuth providers (Google) for easy sign-in

### Performance Optimization
- Current build is optimized via Vite
- May need code splitting for larger bundles
- Consider lazy loading for routes as app grows

## Reference Documents

- `docs/PROJECT_CONTEXT.md` - Current repository state (authoritative)
- `docs/TEMPLATE_RELATIONSHIP.md` - Relationship to WebsiteUI-Template
- `docs/CURRENT_STATE.md` - Current deployment state
- `docs/PHASE2_SYNC_TO_NAVALNOMADUI.md` - Historical sync documentation

