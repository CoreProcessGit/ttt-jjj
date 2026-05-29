import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const features = [
  { icon: 'document', color: 'indigo', title: 'Test Case Management', desc: 'Create and manage test cases with folders, steps, preconditions, and user-defined fields.',
    list: ['Single & Factor Combination types', 'Test steps with expected results', 'Import/Export (CSV, JSON, Excel)'] },
  { icon: 'clipboard', color: 'emerald', title: 'Test Plan & Execution', desc: 'Organize test cases into plans and track execution with real-time progress monitoring.',
    list: ['Pass / Fail / Block / Skip tracking', 'Milestone timeline view', 'Comments & Jira issue linking'] },
  { icon: 'chart', color: 'purple', title: 'Reports & Analytics', desc: 'Generate detailed test reports with execution statistics and exportable data.',
    list: ['Execution rate & pass/fail charts', 'Export reports (CSV, Excel)', 'Daily progress tracking'] },
  { icon: 'grid', color: 'sky', title: 'Factor Combination', desc: 'Generate optimized test combinations to maximize coverage with minimal test cases.',
    list: ['Full / Pairwise / Mixed algorithms', 'Constraint rules (If-Then, Mutual Exclusion)', 'Steps matrix with TC mapping'] },
  { icon: 'bug', color: 'rose', title: 'Jira Issue Integration', desc: 'Create and search Jira issues directly from test execution and link them to test cases.',
    list: ['Create issues with auto-filled details', 'Search and link existing issues', 'Retestable tracking on issue completion'] },
  { icon: 'attachment', color: 'teal', title: 'Attachment Management', desc: 'Upload and manage test artifacts with drag-and-drop support and secure storage.',
    list: ['Drag & drop file upload', 'Supported formats guide', 'Data encrypted & secured'] },
  { icon: 'settings', color: 'blue', title: 'Configuration', desc: 'Customize priorities, case types, components, plan statuses, and user-defined fields.',
    list: ['Custom priorities & case types', 'User-defined fields (9 types)', 'Plan status & component management'] },
  { icon: 'users', color: 'amber', title: 'User Permissions', desc: 'Flexible role-based access control with system roles and custom roles.',
    list: ['4 system roles + custom roles', 'Per-project permission control', 'User activate / deactivate'] },
  { icon: 'globe', color: 'cyan', title: 'Multi-Language', desc: 'Full internationalization support with automatic language detection from Jira settings.',
    list: ['English, Korean, Japanese', 'Auto-detect from Jira locale', 'Per-project language setting'] },
];

const iconMap = {
  dashboard: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  clipboard: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  grid: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  bug: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 116 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4M21 21c0-2.1-1.7-3.9-3.8-4"/></svg>,
  attachment: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
  settings: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  globe: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
};

const checkIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>;

const screenshotTabs = [
  { key: 'overview', label: 'Overview', icon: 'dashboard', title: 'Project Overview Dashboard', desc: 'Monitor project status at a glance with announcements board, test milestones timeline, and execution summary.' },
  { key: 'testcases', label: 'Test Cases', icon: 'document', title: 'Test Case Management', desc: 'Create, organize, and manage test cases with folders, filters, and bulk operations.' },
  { key: 'testplans', label: 'Test Plans', icon: 'clipboard', title: 'Test Plan Execution', desc: 'Track test execution progress with status updates, comments, and defect linking.' },
  { key: 'reports', label: 'Reports', icon: 'chart', title: 'Test Reports & Analytics', desc: 'Visualize test execution results with detailed pass/fail statistics and exportable reports.' },
  { key: 'config', label: 'Configuration', icon: 'settings', title: 'Configuration & Settings', desc: 'Customize priorities, case types, components, and user-defined fields to fit your workflow.' },
];

const folderIcon = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>;
const chevronIcon = <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6,9 12,15 18,9"/></svg>;

const OverviewMock = () => (
  <div className="ss-mock ov-mock">
    <div className="ss-tabs">
      <span className="ss-tab active">Overview</span>
      <span className="ss-tab">Test Cases</span>
      <span className="ss-tab">Test Plans</span>
      <span className="ss-tab">Test Reports</span>
      <span className="ss-tab">Configuration</span>
    </div>
    <div className="ov-board">
      <div className="ov-board-head"><span>#</span><span>Category</span><span>Title</span><span>Author</span><span>Posted</span></div>
      <div className="ov-board-row"><span>3</span><span className="tag">Notice</span><span>Release v2.8 QA Kickoff – Regression Scope</span><span className="muted">Sarah Kim</span><span className="muted">2026. 4. 12.</span></div>
      <div className="ov-board-row"><span>2</span><span className="tag">Notice</span><span>Sprint 23 Test Plan Ready for Review</span><span className="muted">John Park</span><span className="muted">2026. 4. 10.</span></div>
    </div>
    <div className="ov-body">
      <div className="ov-counts">
        <div className="ov-card"><div className="ov-card-num">2,847</div><div className="ov-card-label">Test Case</div></div>
        <div className="ov-card"><div className="ov-card-num">42</div><div className="ov-card-label">Test Plan</div></div>
        <div className="ov-card"><div className="ov-card-num">18</div><div className="ov-card-label">Total Users</div></div>
      </div>
      <div className="ov-milestone">
        <div className="ov-milestone-head">
          <strong>Test Milestone</strong>
          <span className="ov-pill">15 / 16 Plans</span>
          <div className="ov-ms-actions">
            <span className="ov-btn ov-btn-today">Today</span>
            <div className="ov-seg">
              <span className="ov-seg-item active">Month</span>
              <span className="ov-seg-item">Week</span>
            </div>
          </div>
        </div>
        <div className="ov-gantt">
          <div className="ov-gantt-months"><span>Dec</span><span>Jan</span><span>Feb</span><span className="cur">Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div>
          <div className="ov-gantt-grid">
            <div className="ov-gantt-line" style={{ left: '48%' }} />
            <div className="ov-gantt-bar skeleton" style={{ left: '4%', width: '14%', top: '8px' }} />
            <div className="ov-gantt-bar skeleton" style={{ left: '20%', width: '12%', top: '8px' }} />
            <div className="ov-gantt-bar skeleton blue" style={{ left: '34%', width: '42%', top: '8px' }} />
            <div className="ov-gantt-bar skeleton blue" style={{ left: '36%', width: '48%', top: '30px' }} />
            <div className="ov-gantt-bar skeleton blue" style={{ left: '38%', width: '44%', top: '52px' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestCasesMock = () => (
  <div className="ss-mock tc-mock">
    <div className="ss-tabs"><span className="ss-tab">Overview</span><span className="ss-tab active">Test Cases</span><span className="ss-tab">Test Plans</span><span className="ss-tab">Test Reports</span><span className="ss-tab">Configuration</span></div>
    <div className="tc-body">
      <div className="tc-side">
        <div className="tc-new">+ New Folder</div>
        <div className="tc-folder active">{chevronIcon} All Test Cases <span className="tc-cnt">2847</span></div>
        <div className="tc-folder sub">{folderIcon} Authentication <span className="tc-cnt">184</span></div>
        <div className="tc-folder sub">{folderIcon} User Management <span className="tc-cnt">312</span></div>
        <div className="tc-folder sub">{folderIcon} Payment Gateway <span className="tc-cnt">226</span></div>
        <div className="tc-folder sub">{folderIcon} Dashboard <span className="tc-cnt">148</span></div>
        <div className="tc-folder sub">{folderIcon} API Tests <span className="tc-cnt">487</span></div>
        <div className="tc-folder sub">{folderIcon} Mobile App <span className="tc-cnt">592</span></div>
        <div className="tc-folder sub">{folderIcon} Notifications <span className="tc-cnt">94</span></div>
        <div className="tc-folder sub">{folderIcon} Reporting <span className="tc-cnt">178</span></div>
      </div>
      <div className="tc-main">
        <div className="tc-toolbar">
          <span className="tc-btn primary">+ Create Test Case</span>
          <span className="tc-btn">Clone</span>
          <span className="tc-btn">Move</span>
          <span className="tc-btn">Delete</span>
          <span className="tc-sep" />
          <span className="tc-btn outline">Import</span>
          <span className="tc-btn outline">Export</span>
          <div className="tc-search">Search test cases...</div>
        </div>
        <div className="tc-count">1 – 50 of 2847</div>
        <div className="tc-table">
          <div className="tc-row tc-head"><span className="c-chk" /><span className="c-key">Key</span><span className="c-name">Name</span><span className="c-type">Type</span><span className="c-comp">Components</span><span className="c-label">Labels</span><span className="c-own">Owner</span><span className="c-prio">Priority</span></div>
          {[
            { k: 'QA-2847', n: 'Login with valid credentials', c: 'Auth', l: 'smoke', p: 'High', pc: 'chip-high', av: 'ava-1', ai: 'S' },
            { k: 'QA-2846', n: 'OAuth2 token refresh on expiration', c: 'Auth', l: 'critical', p: 'Critical', pc: 'chip-highest', av: 'ava-2', ai: 'J' },
            { k: 'QA-2845', n: 'Password reset email delivery', c: 'Auth', l: 'email', p: 'Medium', pc: 'chip-med', av: 'ava-3', ai: 'M' },
            { k: 'QA-2844', n: 'Credit card payment processing', c: 'Payment', l: 'critical', p: 'Critical', pc: 'chip-highest', av: 'ava-4', ai: 'E' },
            { k: 'QA-2843', n: 'Two-factor authentication setup', c: 'Auth', l: 'security', p: 'High', pc: 'chip-high', av: 'ava-1', ai: 'S' },
            { k: 'QA-2842', n: 'Dashboard widget drag & drop', c: 'Dashboard', l: 'ui', p: 'Low', pc: 'chip-low', av: 'ava-2', ai: 'J' },
            { k: 'QA-2841', n: 'GET /api/users – pagination', c: 'API', l: 'regression', p: 'Medium', pc: 'chip-med', av: 'ava-3', ai: 'M' },
          ].map((r, i) => (
            <div className="tc-row" key={i}>
              <span className="c-chk"><span className="chk" /></span>
              <span className="c-key">{r.k}</span>
              <span className="c-name">{r.n}</span>
              <span className="c-type"><span className="type-badge">S</span></span>
              <span className="c-comp"><span className="mini-tag">{r.c}</span></span>
              <span className="c-label"><span className="mini-tag gray">{r.l}</span></span>
              <span className="c-own"><span className={`avatar ${r.av}`}>{r.ai}</span></span>
              <span className="c-prio"><span className={`chip ${r.pc}`}>{r.p}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TestPlansMock = () => (
  <div className="ss-mock tp-mock">
    <div className="ss-tabs"><span className="ss-tab">Overview</span><span className="ss-tab">Test Cases</span><span className="ss-tab active">Test Plans</span><span className="ss-tab">Test Reports</span><span className="ss-tab">Configuration</span></div>
    <div className="tp-exec-head">
      <div>
        <strong>Test Plans - Sprint 23 – Payment Module Release</strong>
        <div className="tp-subtabs"><span className="sub">Details</span><span className="sub active">Test Cases</span></div>
      </div>
      <div><span className="tc-btn primary">TC Add</span><span className="tc-btn">Back</span></div>
    </div>
    <div className="tp-exec-body">
      <div className="tp-exec-side">
        <div className="tp-exec-search">Key, Name, TPTC ID…</div>
        <div className="tp-folder">{chevronIcon} {folderIcon} Authentication <span className="tc-cnt">3</span></div>
        <div className="tp-tc active"><span className="st-icon pass" />Login with valid credentials</div>
        <div className="tp-tc"><span className="st-icon fail" />OAuth2 token refresh</div>
        <div className="tp-tc"><span className="st-icon notyet" />Two-factor authentication</div>
        <div className="tp-folder">{chevronIcon} {folderIcon} Payment Gateway <span className="tc-cnt">2</span></div>
        <div className="tp-tc"><span className="st-icon notyet" />Credit card payment</div>
        <div className="tp-tc"><span className="st-icon notyet" />Refund processing</div>
      </div>
      <div className="tp-exec-main">
        <div className="tp-tctitle"><span className="tag tag-key">TPTC-8201</span><strong>Login with valid credentials</strong></div>
        <div className="tp-section"><div className="tp-label">▾ Description</div><div className="tp-text">Verify that registered users can log in successfully with correct credentials and are redirected to the dashboard.</div></div>
        <div className="tp-section"><div className="tp-label">▾ Precondition</div><div className="tp-text">A valid user account must exist and be in active status.</div></div>
        <div className="tp-section">
          <div className="tp-label">▾ Test Step</div>
          <div className="tp-steps">
            <div className="tp-step-head"><span>#</span><span>Step Summary</span><span>Test Data</span><span>Expected Result</span></div>
            <div className="tp-step"><span>1</span><span>Navigate to login page</span><span>-</span><span>Login page is displayed</span></div>
            <div className="tp-step"><span>2</span><span>Enter registered email</span><span>user@company.com</span><span>Email field accepts input</span></div>
            <div className="tp-step"><span>3</span><span>Enter valid password</span><span>********</span><span>Password field is populated</span></div>
            <div className="tp-step"><span>4</span><span>Click "Sign In" button</span><span>-</span><span>Redirected to dashboard</span></div>
          </div>
        </div>
        <div className="tp-exec-bar">
          <strong>Execution Status:</strong>
          <span className="exec-btn">Not yet</span>
          <span className="exec-btn pass active">Pass</span>
          <span className="exec-btn fail">Fail</span>
          <span className="exec-btn block">Block</span>
          <span className="exec-btn skip">Skip</span>
        </div>
      </div>
    </div>
  </div>
);

const ReportsMock = () => (
  <div className="ss-mock rp-mock">
    <div className="ss-tabs"><span className="ss-tab">Overview</span><span className="ss-tab">Test Cases</span><span className="ss-tab">Test Plans</span><span className="ss-tab active">Test Reports</span><span className="ss-tab">Configuration</span></div>
    <div className="rp-head">
      <div><strong>Test Reports - Sprint 23 – Payment Module Release</strong>
      <div className="rp-desc">End-to-end regression testing for the new payment gateway and authentication flow</div></div>
      <span className="tc-btn">Back</span>
    </div>
    <div className="rp-subtabs"><span className="sub active">Test Reports</span><span className="sub">Retestable TestCases</span></div>
    <div className="rp-view">
      <div className="rp-view-label">Select View Type</div>
      <div className="rp-radios">
        <label className="rp-radio active"><span className="dot" />Folder View <span className="rp-select">All Levels ▾</span></label>
        <label className="rp-radio"><span className="dot" />Component View</label>
        <label className="rp-radio"><span className="dot" />Tester View</label>
      </div>
    </div>
    <div className="rp-metrics-head">
      <strong>Test Execution Metrics – Folder View</strong>
      <span className="tc-btn export">Export to Excel</span>
    </div>
    <div className="rp-table">
      <div className="rp-row rp-head-row">
        <span className="rp-folder" rowSpan={2}>Folder Name</span>
        <span className="rp-total">TOTAL</span>
        <span className="rp-exec" style={{ gridColumn: 'span 4' }}>EXECUTION RESULTS</span>
        <span className="rp-weekly">WEEKLY PLANNED</span>
        <span className="rp-notexec">NOT EXECUTED</span>
        <span className="rp-rate">TOTAL EXECUTION RATE</span>
        <span className="rp-rate">PLANNED EXECUTION RATE</span>
      </div>
      <div className="rp-row rp-subhead">
        <span /><span />
        <span className="rp-pass">PASS</span>
        <span className="rp-fail">FAIL</span>
        <span className="rp-block">BLOCKED</span>
        <span className="rp-skip">SKIPPED</span>
        <span /><span /><span /><span />
      </div>
      <div className="rp-row total"><span>Total</span><span className="b">184</span><span className="b">142</span><span className="b">12</span><span className="b">6</span><span className="b">4</span><span className="b">160</span><span className="b">20</span><span className="b"><span className="bar"><span className="fill" style={{ width: '87%' }} /></span>87.0%</span><span className="b"><span className="bar"><span className="fill" style={{ width: '100%' }} /></span>100%</span></div>
      <div className="rp-row"><span>Authentication</span><span>68</span><span>60</span><span>3</span><span>2</span><span>1</span><span>60</span><span>2</span><span><span className="bar"><span className="fill" style={{ width: '97%' }} /></span>97.0%</span><span><span className="bar"><span className="fill" style={{ width: '100%' }} /></span>108%</span></div>
      <div className="rp-row"><span>Payment Gateway</span><span>52</span><span>40</span><span>5</span><span>3</span><span>2</span><span>44</span><span>2</span><span><span className="bar"><span className="fill red" style={{ width: '92%' }} /></span>92.0%</span><span><span className="bar"><span className="fill" style={{ width: '100%' }} /></span>109%</span></div>
      <div className="rp-row"><span>User Management</span><span>64</span><span>42</span><span>4</span><span>1</span><span>1</span><span>56</span><span>16</span><span><span className="bar"><span className="fill red" style={{ width: '74%' }} /></span>74.6%</span><span><span className="bar"><span className="fill" style={{ width: '83%' }} /></span>83.9%</span></div>
    </div>
  </div>
);

const ConfigMock = () => (
  <div className="ss-mock cf-mock">
    <div className="ss-tabs"><span className="ss-tab">Overview</span><span className="ss-tab">Test Cases</span><span className="ss-tab">Test Plans</span><span className="ss-tab">Test Reports</span><span className="ss-tab active">Configuration</span></div>
    <div className="cf-body">
      <div className="cf-side">
        <div className="cf-group">TEST CASE</div>
        <div className="cf-item active">User Defined</div>
        <div className="cf-item">Case Type</div>
        <div className="cf-item">Component</div>
        <div className="cf-item">Priorities</div>
        <div className="cf-group">TEST PLAN</div>
        <div className="cf-item">Plan Status</div>
        <div className="cf-group">RETESTABLE</div>
        <div className="cf-item">Issue Type</div>
        <div className="cf-group">ADMINISTRATOR SETTINGS</div>
        <div className="cf-item">User Permissions</div>
      </div>
      <div className="cf-main">
        <h4>User Defined Field</h4>
        <div className="cf-form">
          <div className="cf-input">Enter field name</div>
          <div className="cf-input">Enter field description</div>
          <div className="cf-input short">Text ▾</div>
          <div className="cf-check">☐ Required</div>
          <span className="tc-btn primary">Add</span>
        </div>
        <div className="cf-table">
          <div className="cf-row cf-head"><span /><span>Name</span><span>Description</span><span>Type</span><span>Required</span><span>Actions</span></div>
          {[
            { n: 'Requirement ID', d: 'Linked business requirement identifier', t: 'Text', r: true },
            { n: 'Release Version', d: 'Target release version number', t: 'Dropdown', r: true },
            { n: 'Test Environment', d: 'Dev / Staging / Production', t: 'Dropdown', r: true },
            { n: 'Automation Status', d: 'Manual, Automated, or Partial', t: 'Labels', r: false },
            { n: 'Est. Duration (min)', d: 'Expected execution time', t: 'Number', r: false },
            { n: 'Last Reviewed', d: 'Date of last peer review', t: 'Date', r: false },
          ].map((r, i) => (
            <div className="cf-row" key={i}>
              <span className="cf-drag">⋮⋮</span>
              <span>{r.n}</span>
              <span>{r.d}</span>
              <span className="cf-select">{r.t} ▾</span>
              <span><span className={`toggle ${r.r ? 'on' : ''}`} /></span>
              <span className="cf-act">✎ 🗑</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const el = document.querySelector('.fc-animated');
      if (el) el.classList.add('fc-playing');
      return;
    }
    const ENTER_MS = 3000;
    const HOLD_MS = 5000;
    const FADE_MS = 500;
    const CYCLE_MS = ENTER_MS + HOLD_MS + FADE_MS;

    let mounted = true;
    let restartTimer;
    let fadeTimer;

    const cycle = () => {
      if (!mounted) return;
      const el = document.querySelector('.fc-animated');
      if (!el) {
        restartTimer = setTimeout(cycle, 500);
        return;
      }
      el.classList.remove('fc-playing');
      void el.offsetWidth;
      el.classList.add('fc-playing');
      fadeTimer = setTimeout(() => {
        if (!mounted) return;
        const el2 = document.querySelector('.fc-animated');
        if (el2) el2.classList.remove('fc-playing');
      }, ENTER_MS + HOLD_MS);
      restartTimer = setTimeout(cycle, CYCLE_MS);
    };
    cycle();

    return () => {
      mounted = false;
      clearTimeout(restartTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const activeScreenshot = screenshotTabs.find(t => t.key === activeTab);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge animate">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Jira Cloud Plugin
            </div>
            <div className="animate hero-logo">
              <img src={require('../assets/logo-archive-white.svg').default || require('../assets/logo-archive-white.svg')} alt="T-CAFE jira" height={56} />
            </div>
            <p className="hero-tagline animate">Smarter Testing. Better Quality.</p>
            <p className="hero-description animate">
              Manage your entire testing lifecycle within Jira.
              From test case creation to execution reports,
              T-CAFE provides everything your QA team needs.
            </p>
            <div className="hero-actions animate">
              <a href="https://marketplace.atlassian.com/apps/348222537" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
              <a href="#features" className="btn btn-outline">
                Learn More
              </a>
            </div>
            <div className="hero-trust animate">
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg> Factor Combination</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg> Data Encrypted &amp; Secured</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg> Custom Roles &amp; Permissions</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg> Multi-Language (EN/KO/JA)</span>
            </div>
          </div>
          <div className="hero-image animate">
            <div className="browser-mockup">
              <div className="browser-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="browser-url">your-site.atlassian.net/jira/apps/t-cafe/factor-combination</span>
              </div>
              <div className="fc-mockup fc-animated">
                <div className="fc-header">
                  <div className="fc-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    Factor Combination
                  </div>
                  <span className="fc-mode-chip">Pairwise</span>
                </div>

                <div className="fc-body">
                  <div className="fc-factors">
                    <div className="fc-factor-row">
                      <span className="fc-factor-label">Browser</span>
                      <span className="fc-value-chip" style={{'--d': '0.10s'}}>Chrome</span>
                      <span className="fc-value-chip" style={{'--d': '0.18s'}}>Safari</span>
                      <span className="fc-value-chip" style={{'--d': '0.26s'}}>Firefox</span>
                    </div>
                    <div className="fc-factor-row">
                      <span className="fc-factor-label">Device</span>
                      <span className="fc-value-chip" style={{'--d': '0.34s'}}>Desktop</span>
                      <span className="fc-value-chip" style={{'--d': '0.42s'}}>Mobile</span>
                      <span className="fc-value-chip" style={{'--d': '0.50s'}}>Tablet</span>
                    </div>
                    <div className="fc-factor-row">
                      <span className="fc-factor-label">Locale</span>
                      <span className="fc-value-chip" style={{'--d': '0.58s'}}>EN</span>
                      <span className="fc-value-chip" style={{'--d': '0.66s'}}>KO</span>
                      <span className="fc-value-chip" style={{'--d': '0.74s'}}>JA</span>
                    </div>
                    <div className="fc-factor-row">
                      <span className="fc-factor-label">Plan</span>
                      <span className="fc-value-chip" style={{'--d': '0.82s'}}>Free</span>
                      <span className="fc-value-chip" style={{'--d': '0.90s'}}>Pro</span>
                      <span className="fc-value-chip" style={{'--d': '0.98s'}}>Enterprise</span>
                    </div>
                  </div>

                  <div className="fc-math">
                    <div className="fc-math-row fc-anim-formula">
                      <span className="fc-math-formula">3<sup>4</sup></span>
                      <span className="fc-math-eq">=</span>
                      <span className="fc-math-num-faded">81</span>
                    </div>
                    <div className="fc-math-label fc-anim-formula">Full Combination</div>
                    <div className="fc-math-arrow fc-anim-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                      <span>Pairwise</span>
                    </div>
                    <div className="fc-math-num fc-anim-hero">9</div>
                    <div className="fc-math-coverage fc-anim-coverage">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Every 2-factor pair covered
                    </div>
                    <div className="fc-math-savings fc-anim-savings">−89% effort · same coverage</div>
                  </div>
                </div>

                <div className="fc-output">
                  <div className="fc-output-header fc-anim-output-header">
                    Generated Test Cases
                    <span className="fc-output-count">9</span>
                  </div>
                  <div className="fc-output-table">
                    <div className="fc-output-row" style={{'--d': '2.0s'}}>
                      <span className="fc-output-key">TC-001</span>
                      <span className="fc-output-combo">
                        <span className="fc-combo-tag">Chrome</span>
                        <span className="fc-combo-tag">Desktop</span>
                        <span className="fc-combo-tag">EN</span>
                        <span className="fc-combo-tag">Pro</span>
                      </span>
                      <span className="fc-output-check">✓</span>
                    </div>
                    <div className="fc-output-row" style={{'--d': '2.2s'}}>
                      <span className="fc-output-key">TC-002</span>
                      <span className="fc-output-combo">
                        <span className="fc-combo-tag">Safari</span>
                        <span className="fc-combo-tag">Mobile</span>
                        <span className="fc-combo-tag">KO</span>
                        <span className="fc-combo-tag">Free</span>
                      </span>
                      <span className="fc-output-check">✓</span>
                    </div>
                    <div className="fc-output-row" style={{'--d': '2.5s'}}>
                      <span className="fc-output-key">TC-003</span>
                      <span className="fc-output-combo">
                        <span className="fc-combo-tag">Firefox</span>
                        <span className="fc-combo-tag">Tablet</span>
                        <span className="fc-combo-tag">JA</span>
                        <span className="fc-combo-tag">Enterprise</span>
                      </span>
                      <span className="fc-output-check">✓</span>
                    </div>
                  </div>
                </div>

                <div className="fc-captions">
                  <span className="fc-cap fc-cap-1">① Define your factors and values</span>
                  <span className="fc-cap fc-cap-2">② Pairwise covers every 2-factor value pair</span>
                  <span className="fc-cap fc-cap-3">③ 9 cases instead of 81 — same defect detection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <div className="section-header animate">
            <span className="section-badge">Core Features</span>
            <h2>Everything you need for<br/>test management in Jira</h2>
            <p>T-CAFE integrates seamlessly with Jira Cloud to provide<br/>a complete test management solution for your team.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card animate`} style={{ animationDelay: `${(i % 3) * 0.15}s` }}>
                <div className={`feature-icon icon-${f.color}`}>{iconMap[f.icon]}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul className="feature-list">
                  {f.list.map((item, j) => (
                    <li key={j}>{checkIcon} {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="screenshots" className="screenshots">
        <div className="container">
          <div className="section-header animate">
            <span className="section-badge">Screenshots</span>
            <h2>See T-CAFE in action</h2>
            <p>Clean, intuitive interface designed for productivity.<br/>Get started in minutes, not hours.</p>
          </div>
          <div className="screenshot-tabs animate">
            {screenshotTabs.map(tab => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {iconMap[tab.icon]} {tab.label}
              </button>
            ))}
          </div>
          <div className="screenshot-display animate">
            <div className="screenshot-info">
              <h3>{activeScreenshot?.title}</h3>
              <p>{activeScreenshot?.desc}</p>
            </div>
            <div className="screenshot-frame">
              {activeTab === 'overview' && <OverviewMock />}
              {activeTab === 'testcases' && <TestCasesMock />}
              {activeTab === 'testplans' && <TestPlansMock />}
              {activeTab === 'reports' && <ReportsMock />}
              {activeTab === 'config' && <ConfigMock />}
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-bg">
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
        <div className="cta-content animate">
          <span className="section-badge badge-light">Get Started</span>
          <h2>Ready to streamline<br/>your testing?</h2>
          <p>Install T-CAFE and start managing test cases in Jira today.</p>
          <div className="cta-actions">
            <a href="https://marketplace.atlassian.com/apps/348222537" className="btn btn-white" target="_blank" rel="noopener noreferrer">Get it on Marketplace</a>
            <Link to="/support" className="btn btn-outline-light">View Documentation</Link>
          </div>
          <div className="cta-trust">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg> Free to try</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg> Jira Cloud native</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg> Dedicated support</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
