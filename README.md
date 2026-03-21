# Optimus SBR Mavenlink PM Hub

Static proof-of-concept site for a Teams-friendly Mavenlink experience.

## Files

- `index.html`: page shell
- `styles.css`: Optimus-inspired visual treatment
- `data.js`: demo data grounded in the parquet sample you provided
- `app.js`: rendering and interaction logic
- `serve_https.py`: simple local HTTPS host
- `certs\localhost-cert.pem` and `certs\localhost-key.pem`: local certificate pair

## Notes

- The app now defaults the secure launch URL to the current host, so after deployment it will automatically show the Azure Static Web Apps HTTPS address.
- The page uses real workspace titles and portfolio distributions from your parquet files.
- Health signals, PM notes, and recommended actions are intentionally derived for demo purposes.
- The local HTTPS setup is for browser testing on your machine. Teams production use normally requires a publicly reachable HTTPS URL with a trusted certificate.

## Azure Static Web Apps

This project is ready for Azure Static Web Apps as a plain static site.

- `app_location`: `.`
- `output_location`: leave blank
- `api_location`: leave blank
- `staticwebapp.config.json` is already included at the app root

Recommended deployment path:

1. Put this folder in a GitHub repository
2. In Azure Portal, create a new Static Web App
3. Choose the GitHub repo and branch
4. Set build preset to `Custom`
5. Set `App location` to `.`
6. Leave `Api location` blank
7. Leave `Output location` blank
8. Finish creation and wait for the GitHub Action deployment

After deployment, Azure will assign a hostname like `https://<app-name>.azurestaticapps.net`.

## Access control

The `staticwebapp.config.json` file is configured to:

- require authentication for all app routes
- redirect unauthenticated users to Microsoft Entra login
- block GitHub login

Important:

- this protects the site from anonymous public access
- tenant-specific identity restrictions may still require additional Azure Static Web Apps authentication setup depending on your plan and Entra configuration

## Open locally over HTTPS

1. Run `.\run-local-https.ps1`
2. Open `https://localhost:8443`
3. If the browser warns about the certificate, trust the local certificate or continue for testing
