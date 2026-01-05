# Phase 2 Sync to NavalNomadUI

**Date**: January 5, 2025  
**Purpose**: Sync Phase 2 infrastructure abstraction changes from WebsiteUI-Template to NavalNomadUI  
**Status**: Historical reference (sync operation documentation)

> **Note**: This document is a historical record of a sync operation from WebsiteUI-Template. For information about how NavalNomadUI relates to the template, see [`TEMPLATE_RELATIONSHIP.md`](TEMPLATE_RELATIONSHIP.md).

## Overview

This document describes the Phase 2 changes that were synced from WebsiteUI-Template to NavalNomadUI. These changes abstract infrastructure variables and resource names to make the template more reusable while maintaining deployment functionality.

**Context**: NavalNomadUI is built from WebsiteUI-Template as its foundation. This sync operation brought infrastructure abstraction improvements from the template to NavalNomadUI. See [`TEMPLATE_RELATIONSHIP.md`](TEMPLATE_RELATIONSHIP.md) for more information about the template relationship.

## Phase 2 Changes Summary

### Infrastructure Variable Abstraction
- Removed NavalNomad-specific defaults from Terraform variables
- All variables now required (no defaults)
- Added `resource_name_prefix` variable for resource naming

### Resource Name Abstraction
- Cognito client name: `"naval-nomad-web-client"` → `"${var.resource_name_prefix}-web-client"`
- IAM role name: `"naval-nomad-cognito-auth-role"` → `"${var.resource_name_prefix}-cognito-auth-role"`
- Secrets Manager secret: `"naval-nomad/google-oauth"` → `"${var.resource_name_prefix}/google-oauth"`

### Documentation Files
- Created `terraform.tfvars.example` files for both bootstrap and frontend infrastructure
- Provides template for future projects

## Files to Modify in NavalNomadUI

### 1. `landing/infra/frontend/variables.tf`
**Changes:**
- Remove `default = "navalnomad.com"` from `domain_name` variable
- Add new variable:
```hcl
variable "resource_name_prefix" {
  description = "Prefix for AWS resource names (e.g., 'naval-nomad', 'ducktape-devops'). Used for Cognito, Secrets Manager, and IAM resources."
  type        = string
}
```

### 2. `landing/infra/frontend/cognito.tf`
**Changes:**
- Line 3: `name = "naval-nomad-web-client"` → `name = "${var.resource_name_prefix}-web-client"`
- Line 78: `name = "naval-nomad-cognito-auth-role"` → `name = "${var.resource_name_prefix}-cognito-auth-role"`

### 3. `landing/infra/frontend/secrets.tf`
**Changes:**
- Line 2: `name = "naval-nomad/google-oauth"` → `name = "${var.resource_name_prefix}/google-oauth"`
- Line 3: `description = "Google OAuth credentials for Naval Nomad"` → `description = "Google OAuth credentials for ${var.domain_name}"`
- Line 10: Update comment to use `${var.resource_name_prefix}` instead of hardcoded value

### 4. `landing/infra/frontend/terraform.tfvars`
**Add:**
```hcl
resource_name_prefix = "naval-nomad"
```

### 5. `landing/infra/bootstrap/variables.tf`
**Changes:**
- Remove `default = "krypton/NavalNomadUI"` from `github_repo`
- Remove `default = "naval-nomad-frontend"` from `s3_bucket_name`
- Remove `default = "navalnomad.com"` from `domain_name`

### 6. `.github/workflows/deploy.yml`
**Changes:**
- Update `branches: [ main ]` to include test branch: `branches: [ main, template/phase2-sync ]`
- Or create separate workflow for test deployments

## Files to Create

### 1. `landing/infra/frontend/terraform.tfvars.example`
Copy from WebsiteUI-Template with template values and comments.

### 2. `landing/infra/bootstrap/terraform.tfvars.example`
Copy from WebsiteUI-Template with template values and comments.

## Implementation Steps

1. **Resolve merge conflict** (if any): `LICENSE` file conflict
2. **Create test branch**: `git checkout -b template/phase2-sync`
3. **Apply changes**: Modify files listed above
4. **Verify**: 
   - `cd landing && npm run build` (should succeed)
   - Terraform validate in both infra directories
5. **Update GitHub Actions**: Add test branch to workflow triggers
6. **Commit and push**: Test deployment from branch
7. **Verify deployment**: Check GitHub Actions and production site
8. **Merge to main**: After successful verification

## Reference Files in WebsiteUI-Template

All changes are based on files in:
- `/Users/bentonick/GitHub/WebsiteUI-Template/landing/infra/frontend/`
- `/Users/bentonick/GitHub/WebsiteUI-Template/landing/infra/bootstrap/`

## Verification Checklist

- [ ] All variable defaults removed
- [ ] `resource_name_prefix` variable added
- [ ] Resource names use variables
- [ ] `terraform.tfvars` includes `resource_name_prefix = "naval-nomad"`
- [ ] Example files created
- [ ] GitHub Actions updated for test branch
- [ ] Build succeeds
- [ ] Terraform validates
- [ ] Deployment works from test branch

## Notes

- The `resource_name_prefix` value should be `"naval-nomad"` for NavalNomadUI
- All existing `terraform.tfvars` values should be preserved
- Build output structure must remain unchanged
- Deployment process should work identically to main branch

## Related Documentation

For more information about NavalNomadUI's current state and architecture:

- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) - Current repository structure and architecture
- [`DECISIONS.md`](DECISIONS.md) - Architectural decisions and rationale
- [`TEMPLATE_RELATIONSHIP.md`](TEMPLATE_RELATIONSHIP.md) - How NavalNomadUI relates to WebsiteUI-Template
- [`CURRENT_STATE.md`](CURRENT_STATE.md) - Current deployment state and what's working

