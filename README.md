# Telecom Cart Experience API

## Overview
Thin Experience API over a simulated Salesforce cart.

## Features
- Cart expiry handling
- Retry logic after expiry
- In-memory session mapping

## Key Design
Handles backend expiry using error-driven recovery instead of only TTL checks.
