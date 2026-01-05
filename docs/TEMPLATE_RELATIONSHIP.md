# Template Relationship

This document explains how NavalNomadUI relates to WebsiteUI-Template and how to manage updates between them.

## Overview

NavalNomadUI is built from **WebsiteUI-Template** as its foundation. The template provides the scaffolding, build system, and infrastructure patterns, while NavalNomadUI adds NavalNomad-specific content, branding, and features.

## What Was Inherited from the Template

### Build System
- **Vite Configuration**: Build tooling, dev server setup, output configuration
- **TypeScript Setup**: Type checking, project references, strict mode
- **Package Dependencies**: React, Chakra UI, routing, maps, etc.
- **Build Scripts**: `npm run dev`, `npm run build`, `npm run lint`

### Infrastructure Patterns
- **Terraform Structure**: Bootstrap and frontend infrastructure separation
- **AWS Resources**: S3, CloudFront, Route53 configuration patterns
- **State Management**: S3 backend with DynamoDB locking
- **CI/CD Setup**: GitHub OIDC provider and IAM role patterns
- **Deployment Flow**: Build → S3 → CloudFront → Route53

### Component Structure
- **Reusable Components**: HeroSection, FeatureGrid, SectionWrapper, CTASection, NetworkSection
- **Component Organization**: Pages vs components separation
- **Routing Pattern**: React Router setup with BrowserRouter
- **Theme System**: Chakra UI theme extension structure

### Application Architecture
- **File Organization**: `src/` structure, component exports
- **Styling Approach**: Chakra UI with custom theme
- **State Management**: React local state patterns
- **Error Handling**: SPA routing (404 → index.html)

## What's NavalNomad-Specific

### Content
- **Brand Name**: "Naval Nomad" (vs template's generic placeholders)
- **Tagline**: "Turning Marinas into Villages"
- **Page Content**: Maritime-focused features, marina explorer, route planning
- **Navigation**: Community, Marina Explorer, Route Planner, Contact

### Visual Identity
- **Colors**: Navy/blue palette (vs template's neutral colors)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Images**: Maritime-themed hero image
- **Branding**: Naval Nomad logo and styling

### Domain and Infrastructure
- **Domain**: `navalnomad.com` (vs template's variable domain)
- **S3 Bucket**: `navalnomad.com`
- **Resource Names**: NavalNomad-specific naming in infrastructure
- **GitHub Repo**: `DuckTapeDevOps/NavalNomadUI`

### Features
- **Maritime Pages**: Marina Explorer, Routes, Community (maritime-focused)
- **Map Components**: NauticalMap with maritime-specific features
- **Business Logic**: Domain-specific functionality

## How to Sync Template Updates to NavalNomadUI

### When to Sync

Sync template updates when:
- Template adds new infrastructure improvements
- Template fixes bugs in build system
- Template updates dependencies (security patches, new features)
- Template improves component patterns
- Template adds new reusable components

**Do NOT sync**:
- Template's generic placeholder content (NavalNomad has its own content)
- Template's neutral theme (NavalNomad has brand colors)
- Template's example pages (NavalNomad has maritime pages)

### Sync Process

1. **Review Template Changes**:
   - Check WebsiteUI-Template repository for updates
   - Review what changed (infrastructure, build, components)
   - Determine if changes are relevant to NavalNomadUI

2. **Identify What to Sync**:
   - Infrastructure improvements (Terraform files)
   - Build system updates (Vite, TypeScript config)
   - Reusable component improvements
   - Dependency updates (if compatible)

3. **Apply Changes**:
   - Copy relevant files from template
   - Preserve NavalNomad-specific values:
     - Domain names in `terraform.tfvars`
     - Brand content in components
     - Theme colors in `theme.ts`
   - Test build: `npm run build`
   - Test infrastructure: `tofu plan` in infra directories

4. **Document Sync**:
   - Update `docs/PHASE2_SYNC_TO_NAVALNOMADUI.md` or create new sync doc
   - Note what was synced and why
   - Document any NavalNomad-specific adaptations

### Example Sync Scenarios

**Scenario 1: Infrastructure Variable Abstraction**
- Template removes hardcoded defaults from `variables.tf`
- Sync: Copy updated `variables.tf` files
- Preserve: NavalNomad values in `terraform.tfvars`

**Scenario 2: Build System Update**
- Template updates Vite configuration
- Sync: Copy `vite.config.ts`
- Preserve: NavalNomad-specific base path and server settings

**Scenario 3: Component Pattern Improvement**
- Template improves reusable component (e.g., HeroSection)
- Sync: Copy improved component
- Preserve: NavalNomad-specific usage and props

**Scenario 4: Dependency Update**
- Template updates React or Chakra UI version
- Sync: Update `package.json` dependencies
- Test: Ensure NavalNomad components still work
- Preserve: NavalNomad-specific dependencies if any

## How NavalNomadUI Differs from Template

### Content Differences
- **Template**: Generic placeholder content ("Your Brand Name")
- **NavalNomadUI**: Maritime-specific content ("Naval Nomad", marina features)

### Theme Differences
- **Template**: Neutral colors (grays, generic blues)
- **NavalNomadUI**: Brand colors (navy #001D2E, blue #0057E6)

### Infrastructure Differences
- **Template**: Variable domain names (no defaults)
- **NavalNomadUI**: Fixed domain (`navalnomad.com`)

### Feature Differences
- **Template**: Generic example pages
- **NavalNomadUI**: Maritime-specific pages (Marina Explorer, Routes)

### Authentication
- **Template**: May include authentication setup
- **NavalNomadUI**: Authentication removed (v0.0.1 MVP)

## Maintaining Compatibility

### Build Output Compatibility
- Maintain same build output structure (`dist/` with `assets/`)
- Keep build commands unchanged (`npm run build`)
- Preserve asset path structure

### Infrastructure Compatibility
- Keep Terraform resource structure compatible
- Maintain deployment flow (Build → S3 → CloudFront → Route53)
- Preserve state management pattern (S3 backend, DynamoDB locks)

### Component Compatibility
- Keep reusable components compatible with template versions
- Maintain prop interfaces for shared components
- Preserve component export structure

## Reference

- **WebsiteUI-Template Repository**: The upstream template repository
- `docs/PROJECT_CONTEXT.md` - Current NavalNomadUI state
- `docs/DECISIONS.md` - Architectural decisions
- `docs/PHASE2_SYNC_TO_NAVALNOMADUI.md` - Example sync documentation

## Future Considerations

### Template Evolution
- Template may continue to evolve with new patterns
- NavalNomadUI should selectively adopt improvements
- Maintain NavalNomad-specific customizations

### Other Projects from Template
- DuckTapeDevOpsUI will also be built from the same template
- Each project maintains its own customizations
- Template serves as shared foundation

### Template Maintenance
- Template improvements benefit all projects
- NavalNomadUI can contribute improvements back to template
- Shared patterns reduce maintenance burden

