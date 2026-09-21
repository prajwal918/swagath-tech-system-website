const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

describe('Swagath Tech System Website - Automated Test Suite', () => {
    const rootDir = path.resolve(__dirname, '..');
    const htmlPath = path.join(rootDir, 'src', 'index.html');
    const nginxPath = path.join(rootDir, 'nginx.conf');
    const dockerfilePath = path.join(rootDir, 'Dockerfile');

    it('should have a valid and populated index.html', () => {
        assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
        const content = fs.readFileSync(htmlPath, 'utf8');
        assert.ok(content.includes('SWAGATH TECH SYSTEM'), 'Must contain company title');
        assert.ok(content.includes('nosniff'), 'Must contain X-Content-Type-Options meta tag');
        assert.ok(content.includes('strict-origin-when-cross-origin'), 'Must contain Referrer-Policy');
    });

    it('should have enterprise OWASP security headers in nginx.conf', () => {
        assert.ok(fs.existsSync(nginxPath), 'nginx.conf must exist');
        const nginxConfig = fs.readFileSync(nginxPath, 'utf8');
        assert.ok(nginxConfig.includes('server_tokens off;'), 'Nginx version must be hidden');
        assert.ok(nginxConfig.includes('X-Frame-Options "SAMEORIGIN"'), 'Must have X-Frame-Options');
        assert.ok(nginxConfig.includes('X-Content-Type-Options "nosniff"'), 'Must have X-Content-Type-Options');
        assert.ok(nginxConfig.includes('Content-Security-Policy'), 'Must have CSP header');
        assert.ok(nginxConfig.includes('limit_req_zone'), 'Must have rate limiting configured');
    });

    it('should have a security-hardened Dockerfile', () => {
        assert.ok(fs.existsSync(dockerfilePath), 'Dockerfile must exist');
        const dockerContent = fs.readFileSync(dockerfilePath, 'utf8');
        assert.ok(dockerContent.includes('HEALTHCHECK'), 'Dockerfile must contain a HEALTHCHECK');
        assert.ok(dockerContent.includes('nginx.conf'), 'Dockerfile must copy custom nginx.conf');
    });
});
