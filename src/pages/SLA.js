import React from 'react';
import '../styles/legal.css';

const SLA = () => {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1>Service Level Agreement (SLA)</h1>
        <p className="last-updated">Last Updated: May 2026</p>

        <h2>Introduction</h2>
        <p>This Service Level Agreement ("SLA") describes the support targets that COREPROCESS Corp. ("we", "us") provides for the T-CAFE — Test Management for Jira application ("the App") distributed through the Atlassian Marketplace. This SLA should be read together with our <a href="/terms-of-service">Terms of Service</a>, <a href="/privacy-policy">Privacy Policy</a>, <a href="/security-policy">Security Policy</a>, and <a href="/dpa">Data Processing Addendum</a>.</p>

        <h2>1. Support Severity Levels</h2>
        <p>Support requests are classified by severity. The severity is initially assigned by the customer when submitting the request and may be adjusted by COREPROCESS support after review.</p>

        <h3>1.1 Critical</h3>
        <ul>
          <li><strong>Definition</strong>: The App is fully unavailable, customer data is at risk of loss, or a security vulnerability is actively being exploited.</li>
          <li><strong>Initial Response</strong>: Within 4 hours (24/7)</li>
          <li><strong>Target Resolution</strong>: Within 30 days</li>
        </ul>

        <h3>1.2 High</h3>
        <ul>
          <li><strong>Definition</strong>: A major feature is broken with significant impact on the customer's workflow and no acceptable workaround is available.</li>
          <li><strong>Initial Response</strong>: Within 1 business day</li>
          <li><strong>Target Resolution</strong>: Within 90 days</li>
        </ul>

        <h3>1.3 Medium</h3>
        <ul>
          <li><strong>Definition</strong>: A minor feature issue or limitation. A workaround is available.</li>
          <li><strong>Initial Response</strong>: Within 3 business days</li>
          <li><strong>Target Resolution</strong>: Within 180 days</li>
        </ul>

        <h3>1.4 Low</h3>
        <ul>
          <li><strong>Definition</strong>: Cosmetic issues, documentation requests, or enhancement suggestions.</li>
          <li><strong>Initial Response</strong>: Best effort</li>
          <li><strong>Target Resolution</strong>: Best effort, typically considered for inclusion in a future release</li>
        </ul>

        <h2>2. Business Hours</h2>
        <ul>
          <li><strong>Operating Hours</strong>: 09:00 – 18:00 (Asia/Seoul, KST, UTC+9)</li>
          <li><strong>Operating Days</strong>: Monday through Friday</li>
          <li><strong>Exclusions</strong>: Korean public holidays</li>
        </ul>
        <p>Critical issues are handled 24/7 via the emergency contact below. All other severities are handled during business hours.</p>

        <h2>3. Contact Channels</h2>
        <ul>
          <li><strong>Primary Support</strong>: support@coreprocess.io</li>
          <li><strong>24/7 Emergency Contact (Critical only)</strong>: emergency@coreprocess.io</li>
          <li><strong>Marketplace Listing Support Request</strong>: Available from the App listing page on the Atlassian Marketplace</li>
        </ul>

        <h2>4. Marketplace Security Bug Fix Policy</h2>
        <p>For security vulnerabilities, COREPROCESS Corp. follows the Atlassian Marketplace Security Bug Fix Policy. Security severity timelines align with the targets in Section 1 of this SLA. Critical security vulnerabilities are remediated within 30 days; High severity within 90 days; Medium within 180 days; Low on a best-effort basis. Customers and Atlassian are notified of critical vulnerabilities in accordance with our security incident response process.</p>

        <h2>5. Exclusions</h2>
        <p>This SLA does not apply to:</p>
        <ul>
          <li>Issues caused by misuse, unauthorized modifications, or use outside the documented scope of the App</li>
          <li>Issues caused by the customer's network, Atlassian platform outages, or third-party service disruptions outside our control</li>
          <li>Beta features, preview features, or features explicitly labeled as not covered by this SLA</li>
          <li>Free trial or evaluation usage, which is provided on a best-effort basis</li>
        </ul>

        <h2>6. Updates to This SLA</h2>
        <p>COREPROCESS may update this SLA from time to time. Material changes will be reflected on this page with an updated "Last Updated" date. Customers may also be notified through the App listing or by email at the support contact on file.</p>

        <h2>7. Contact</h2>
        <p>Questions about this SLA can be directed to contact@coreprocess.co.kr</p>
      </div>
    </div>
  );
};

export default SLA;
