import fs from 'node:fs';
import path from 'node:path';

const outputDirectory = path.join('testing', 'didv-850');
const collectionPath = path.join(outputDirectory, 'DIDV-850.postman_collection.json');
const environmentPath = path.join(outputDirectory, 'DIDV-850.dev.postman_environment.example.json');

const jsonBody = (value) => ({
  mode: 'raw',
  raw: JSON.stringify(value, null, 2),
  options: { raw: { language: 'json' } },
});

const scriptEvent = (listen, lines) => ({
  listen,
  script: { type: 'text/javascript', exec: lines },
});

const request = ({
  name,
  method = 'GET',
  url,
  body,
  tests = [],
  preRequest = [],
  description,
  noAuth = false,
}) => ({
  name,
  event: [
    ...(preRequest.length ? [scriptEvent('prerequest', preRequest)] : []),
    ...(tests.length ? [scriptEvent('test', tests)] : []),
  ],
  request: {
    ...(noAuth ? { auth: { type: 'noauth' } } : {}),
    method,
    header: body ? [{ key: 'Content-Type', value: 'application/json' }] : [],
    ...(body ? { body: jsonBody(body) } : {}),
    url: `{{base_url}}${url}`,
    ...(description ? { description } : {}),
  },
});

const folder = (name, description, item) => ({ name, description, item });

const requireFlag = (flag, extraCheck) => [
  `if (String(pm.variables.get('${flag}')).toLowerCase() !== 'true') {`,
  `  console.log('Skipping optional request because ${flag} is not true');`,
  '  pm.execution.skipRequest();',
  '}',
  ...(extraCheck ?? []),
];

const assertStatus = (status) => [
  `pm.test('returns ${status}', () => pm.response.to.have.status(${status}));`,
];

const createWorkflowTests = (variable, expectedIds) => [
  ...assertStatus(201),
  'const json = pm.response.json();',
  "pm.test('returns a workflow id', () => pm.expect(json.workflow && json.workflow.id).to.be.a('string').and.not.empty);",
  `const expectedIds = ${JSON.stringify(expectedIds)};`,
  "pm.test('returns the requested public step ids in order', () => pm.expect(json.workflow.steps.map((step) => step.id)).to.eql(expectedIds));",
  "pm.test('does not expose database property-group names', () => pm.expect(JSON.stringify(json.workflow.steps)).not.to.match(/(?:phone-verification-settings|age-restriction-settings|consent-settings|document-upload-instructions|document-analysis-settings|data-extraction-settings)/));",
  `if (json.workflow && json.workflow.id) pm.collectionVariables.set('${variable}', json.workflow.id);`,
];

const retrieveWorkflowTests = (expectedIds) => [
  ...assertStatus(200),
  'const json = pm.response.json();',
  `const expectedIds = ${JSON.stringify(expectedIds)};`,
  "pm.test('round-trips public step ids', () => pm.expect(json.workflow.steps.map((step) => step.id)).to.eql(expectedIds));",
  "pm.test('round-trips public config without database property groups', () => pm.expect(JSON.stringify(json.workflow.steps)).not.to.match(/(?:phone-verification-settings|age-restriction-settings|consent-settings|document-upload-instructions|document-analysis-settings|data-extraction-settings)/));",
];

const coreStepIds = [
  'ID_VERIFICATION',
  'FACE_LIVENESS',
  'FACE_LIVENESS_CONSENT_SETTINGS',
  'AGE_ESTIMATION',
  'DEEPFAKE_DETECTION',
  'DEEP_AGE',
  'ADDRESS_VERIFICATION',
  'BACKGROUND_CHECK',
  'TITLE_SEARCH',
  'PEP_SANCTIONS',
];

const extendedStepIds = [
  'ADVERSE_MEDIA',
  'CUSTOM_PROMPT',
  'CONSENT',
  'BANK_STATEMENT_UPLOAD',
  'AI_BANK_STATEMENT_ANALYSIS',
  'DOCUMENT_UPLOAD',
  'WHITE_LABEL',
  'PHONE_TRUST_CHECK',
  'CARRIER_AGE_GATE',
  'PHONE_OWNERSHIP_MATCH',
];

const hiddenStepIds = [
  'CREDIT_CHECK',
  'KYB',
  'CUSTOM_FORM',
  'PROOFCALL',
  'IP_JURISDICTION',
  'VPN_DETECTION',
  'INJECTION_DETECTION',
  'ANTI_CHEAT',
];

if (new Set([...coreStepIds, ...extendedStepIds, 'PHONE_VERIFICATION']).size !== 21) {
  throw new Error('Automatic Create Workflow coverage must contain 21 unique steps');
}
if (hiddenStepIds.length !== 8 || new Set(hiddenStepIds).size !== hiddenStepIds.length) {
  throw new Error('Hidden-step coverage must contain eight unique steps');
}

const collection = {
  info: {
    _postman_id: 'c9574401-56b9-4acd-b9b7-9ef3eaf302a4',
    name: 'DIDV-850 — Workflow creation and Runner regression',
    description: [
      'Repeatable dev verification for DIDV-850.',
      '',
      'The default run creates uniquely named workflows, validates the 21 non-E-signature Create Workflow steps, exercises a safe Workflow Runner flow end to end, and covers contract rejection cases. E-signature creation and real phone verification are opt-in.',
      '',
      'Import the example environment, add only `api_key`, select the environment, and run the collection in order. Test workflows are prefixed with `DIDV-850 POSTMAN` because the public API has no workflow deletion endpoint.',
    ].join('\n'),
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  },
  auth: {
    type: 'apikey',
    apikey: [
      { key: 'key', value: 'x-api-key', type: 'string' },
      { key: 'value', value: '{{api_key}}', type: 'string' },
      { key: 'in', value: 'header', type: 'string' },
    ],
  },
  variable: [
    { key: 'base_url', value: 'https://v5ba6yg9s6.execute-api.us-east-1.amazonaws.com/dev' },
    { key: 'api_key', value: '' },
    { key: 'run_id', value: '' },
    { key: 'test_email', value: '' },
    { key: 'core_workflow_id', value: '' },
    { key: 'extended_workflow_id', value: '' },
    { key: 'phone_workflow_id', value: '' },
    { key: 'runner_workflow_id', value: '' },
    { key: 'runner_session_id', value: '' },
    { key: 'esign_workflow_id', value: '' },
    { key: 'phone_session_id', value: '' },
    { key: 'phone_poll_attempt', value: '0' },
  ],
  item: [
    folder('00 — Setup', 'Initializes a unique run and verifies the selected dev environment.', [
      request({
        name: 'Initialize test run',
        url: '/health',
        noAuth: true,
        preRequest: [
          "const apiKey = pm.variables.get('api_key');",
          "if (!apiKey) throw new Error('Set api_key in the selected Postman environment before running the collection');",
          "const baseUrl = String(pm.variables.get('base_url') || '').replace(/\\/$/, '');",
          "if (!baseUrl) throw new Error('Set base_url in the selected Postman environment');",
          "pm.collectionVariables.set('base_url', baseUrl);",
          "const suffix = pm.variables.replaceIn('{{$randomUUID}}').slice(0, 8);",
          "const runId = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-' + suffix;",
          "pm.collectionVariables.set('run_id', runId);",
          "const configuredEmail = pm.environment.get('applicant_email');",
          "pm.collectionVariables.set('test_email', configuredEmail || `didv850+${runId}@example.com`);",
          "['core_workflow_id','extended_workflow_id','phone_workflow_id','runner_workflow_id','runner_session_id','esign_workflow_id','phone_session_id'].forEach((key) => pm.collectionVariables.unset(key));",
          "pm.collectionVariables.set('phone_poll_attempt', '0');",
        ],
        tests: [
          ...assertStatus(200),
          "pm.test('created a unique run id', () => pm.expect(pm.collectionVariables.get('run_id')).to.match(/^\\d{14}-[a-f0-9]{8}$/i));",
        ],
        description: 'Run this first. It resets runtime IDs without modifying environment secrets.',
      }),
      request({
        name: 'Verify API key',
        url: '/v1/workflows',
        tests: [
          ...assertStatus(200),
          "pm.test('returns a workflow list', () => pm.expect(pm.response.json().workflows).to.be.an('array'));",
        ],
      }),
    ]),

    folder('01 — Create Workflow contract', 'Covers every production Create Workflow step except opt-in E-signature.', [
      request({
        name: 'Create core workflow (10 steps)',
        method: 'POST',
        url: '/v1/workflows',
        body: {
          name: 'DIDV-850 POSTMAN {{run_id}} CORE',
          steps: [
            { id: 'ID_VERIFICATION', config: { minimum_age: 21, maximum_age: 75 } },
            { id: 'FACE_LIVENESS', config: { confidence_threshold: 80 } },
            { id: 'FACE_LIVENESS_CONSENT_SETTINGS', config: { face_liveness: false } },
            { id: 'AGE_ESTIMATION', config: { minimum_age: 18, maximum_age: 100 } },
            { id: 'DEEPFAKE_DETECTION' },
            { id: 'DEEP_AGE' },
            { id: 'ADDRESS_VERIFICATION' },
            { id: 'BACKGROUND_CHECK' },
            { id: 'TITLE_SEARCH' },
            { id: 'PEP_SANCTIONS' },
          ],
        },
        tests: createWorkflowTests('core_workflow_id', coreStepIds),
      }),
      request({
        name: 'Retrieve core workflow',
        url: '/v1/workflows/{{core_workflow_id}}',
        tests: retrieveWorkflowTests(coreStepIds),
      }),
      request({
        name: 'Create extended workflow (10 steps)',
        method: 'POST',
        url: '/v1/workflows',
        body: {
          name: 'DIDV-850 POSTMAN {{run_id}} EXTENDED',
          steps: [
            { id: 'ADVERSE_MEDIA' },
            { id: 'CUSTOM_PROMPT', config: { prompts: [{ text: 'Capture a verification image' }] } },
            { id: 'CONSENT', config: { consent_text: 'I agree to this verification test.', require_signature: false } },
            { id: 'BANK_STATEMENT_UPLOAD' },
            { id: 'AI_BANK_STATEMENT_ANALYSIS' },
            { id: 'DOCUMENT_UPLOAD', config: { documents: [{ id: 'supporting_document', description: 'Supporting document' }] } },
            { id: 'WHITE_LABEL' },
            { id: 'PHONE_TRUST_CHECK' },
            { id: 'CARRIER_AGE_GATE' },
            { id: 'PHONE_OWNERSHIP_MATCH' },
          ],
        },
        tests: createWorkflowTests('extended_workflow_id', extendedStepIds),
      }),
      request({
        name: 'Retrieve extended workflow',
        url: '/v1/workflows/{{extended_workflow_id}}',
        tests: retrieveWorkflowTests(extendedStepIds),
      }),
      request({
        name: 'Create phone verification workflow',
        method: 'POST',
        url: '/v1/workflows',
        body: {
          name: 'DIDV-850 POSTMAN {{run_id}} PHONE',
          steps: [{ id: 'PHONE_VERIFICATION', config: { verification_prompt: 'My voice confirms my identity' } }],
        },
        tests: createWorkflowTests('phone_workflow_id', ['PHONE_VERIFICATION']),
      }),
      request({
        name: 'Update phone verification config',
        method: 'PATCH',
        url: '/v1/workflows/{{phone_workflow_id}}/steps/PHONE_VERIFICATION/config',
        body: { config: { verification_prompt: 'DIDV 850 automated phrase' } },
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "const step = json.workflow.steps.find((candidate) => candidate.id === 'PHONE_VERIFICATION');",
          "pm.test('returns the updated flat public config', () => pm.expect(step.config).to.eql({ verification_prompt: 'DIDV 850 automated phrase' }));",
        ],
      }),
      request({
        name: 'Retrieve updated phone workflow',
        url: '/v1/workflows/{{phone_workflow_id}}',
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "pm.test('persists the updated flat public config', () => pm.expect(json.workflow.steps).to.eql([{ id: 'PHONE_VERIFICATION', config: { verification_prompt: 'DIDV 850 automated phrase' } }]));",
        ],
      }),
    ]),

    folder('02 — Contract rejection cases', 'Verifies validation without starting billable provider operations.', [
      request({
        name: 'Reject duplicate steps',
        method: 'POST',
        url: '/v1/workflows',
        body: { name: 'DIDV-850 POSTMAN {{run_id}} DUPLICATE', steps: [{ id: 'ID_VERIFICATION' }, { id: 'ID_VERIFICATION' }] },
        tests: [...assertStatus(400), "pm.test('mentions duplicate steps', () => pm.expect(pm.response.text().toLowerCase()).to.include('duplicate'));"],
      }),
      request({
        name: 'Reject more than 10 steps',
        method: 'POST',
        url: '/v1/workflows',
        body: { name: 'DIDV-850 POSTMAN {{run_id}} TOO MANY', steps: [...coreStepIds.map((id) => ({ id })), { id: 'ADVERSE_MEDIA' }] },
        tests: assertStatus(400),
      }),
      request({
        name: 'Reject missing prerequisite',
        method: 'POST',
        url: '/v1/workflows',
        body: { name: 'DIDV-850 POSTMAN {{run_id}} PREREQUISITE', steps: [{ id: 'BACKGROUND_CHECK' }] },
        tests: [...assertStatus(400), "pm.test('identifies ID verification prerequisite', () => pm.expect(pm.response.text()).to.include('ID_VERIFICATION'));"],
      }),
      ...hiddenStepIds.map((stepId) => request({
        name: `Reject hidden step — ${stepId}`,
        method: 'POST',
        url: '/v1/workflows',
        body: { name: `DIDV-850 POSTMAN {{run_id}} HIDDEN ${stepId}`, steps: [{ id: stepId }] },
        tests: [...assertStatus(400), "pm.test('returns validation details', () => pm.expect(pm.response.json().hints).to.be.an('array').and.not.empty);"],
      })),
    ]),

    folder('03 — Workflow Runner automatic flow', 'Runs a non-provider workflow with no manual uploads or external calls.', [
      request({
        name: 'Create safe Runner workflow',
        method: 'POST',
        url: '/v1/workflows',
        body: {
          name: 'DIDV-850 POSTMAN {{run_id}} RUNNER',
          steps: [
            { id: 'FACE_LIVENESS_CONSENT_SETTINGS', config: { face_liveness: false } },
            { id: 'CONSENT', config: { consent_text: 'I agree to this automated dev verification.', require_signature: false } },
            { id: 'WHITE_LABEL' },
          ],
        },
        tests: createWorkflowTests('runner_workflow_id', ['FACE_LIVENESS_CONSENT_SETTINGS', 'CONSENT', 'WHITE_LABEL']),
      }),
      request({
        name: 'Create headless session',
        method: 'POST',
        url: '/v1/workflows/{{runner_workflow_id}}/sessions',
        body: {
          first_name: '{{first_name}}',
          last_name: '{{last_name}}',
          email: '{{test_email}}',
          phone: '{{phone}}',
          external_id: 'didv-850-postman-{{run_id}}',
        },
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "pm.test('starts at the first step', () => pm.expect(json.current_step).to.eql(0));",
          "pm.test('returns three ordered Runner steps', () => pm.expect(json.steps.map((step) => step.step_id)).to.eql(['FACE_LIVENESS_CONSENT_SETTINGS','CONSENT','WHITE_LABEL']));",
          "if (json.session_id) pm.collectionVariables.set('runner_session_id', json.session_id);",
        ],
      }),
      request({
        name: 'Get initial workflow state',
        url: '/v1/sessions/{{runner_session_id}}/workflow',
        tests: [...assertStatus(200), "pm.test('current step is zero', () => pm.expect(pm.response.json().current_step).to.eql(0));"],
      }),
      request({
        name: 'Start workflow',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/workflow/start',
        body: {},
        tests: [...assertStatus(200), "pm.test('start preserves the first step', () => pm.expect(pm.response.json().current_step).to.eql(0));"],
      }),
      request({
        name: 'Start workflow again (idempotent)',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/workflow/start',
        body: {},
        tests: [...assertStatus(200), "pm.test('repeated start remains on the first step', () => pm.expect(pm.response.json().current_step).to.eql(0));"],
      }),
      request({
        name: 'Reject out-of-order step',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/steps/WHITE_LABEL',
        body: { acknowledged: true },
        tests: [...assertStatus(409), "pm.test('reports the expected current step', () => pm.expect(pm.response.json().current_step).to.eql(0));"],
      }),
      request({
        name: 'Reject invalid dynamic upload slot',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/uploads',
        body: { files: [{ file_name: 'unexpected.png', content_type: 'image/png', slot: 'unexpected_slot' }] },
        tests: [...assertStatus(400), "pm.test('returns invalid_slots', () => pm.expect(pm.response.json().invalid_slots).to.include('unexpected_slot'));"],
      }),
      request({
        name: 'Complete disabled face-consent settings',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/steps/FACE_LIVENESS_CONSENT_SETTINGS',
        body: {},
        tests: [...assertStatus(200), "pm.test('advances to consent', () => pm.expect(pm.response.json().current_step).to.eql(1));"],
      }),
      request({
        name: 'Accept consent',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/steps/CONSENT',
        body: { accepted: true, legal_name: '{{legal_name}}' },
        tests: [...assertStatus(200), "pm.test('advances to white label', () => pm.expect(pm.response.json().current_step).to.eql(2));"],
      }),
      request({
        name: 'Acknowledge white label',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/steps/WHITE_LABEL',
        body: { acknowledged: true },
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "pm.test('completes the workflow', () => { pm.expect(json.current_step).to.eql(null); pm.expect(json.session_progress).to.eql('COMPLETED'); });",
        ],
      }),
      request({
        name: 'Get completed workflow state',
        url: '/v1/sessions/{{runner_session_id}}/workflow',
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "pm.test('all steps completed', () => pm.expect(json.steps.every((step) => step.status === 'COMPLETED')).to.eql(true));",
          "pm.test('session is terminal', () => { pm.expect(json.current_step).to.eql(null); pm.expect(json.session_progress).to.eql('COMPLETED'); });",
        ],
      }),
      request({
        name: 'Reject restart after completion',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/workflow/start',
        body: {},
        tests: assertStatus(409),
      }),
      request({
        name: 'Reject replay after completion',
        method: 'POST',
        url: '/v1/sessions/{{runner_session_id}}/steps/WHITE_LABEL',
        body: { acknowledged: true },
        tests: assertStatus(409),
      }),
    ]),

    folder('04 — Optional E-signature boundary', 'Set run_esignature_tests=true and provide an existing DeepSign template before running.', [
      request({
        name: 'Create hosted E-signature workflow',
        method: 'POST',
        url: '/v1/workflows',
        preRequest: requireFlag('run_esignature_tests', [
          "if (!pm.variables.get('esign_template_id')) throw new Error('Set esign_template_id before enabling E-signature tests');",
        ]),
        body: {
          name: 'DIDV-850 POSTMAN {{run_id}} ESIGN',
          steps: [{
            id: 'E_SIGNATURE',
            config: {
              template_id: '{{esign_template_id}}',
              template_name: '{{esign_template_name}}',
              template_signer_count: 1,
              include_sender_as_signer: false,
              allow_typed_signature: true,
            },
          }],
        },
        tests: createWorkflowTests('esign_workflow_id', ['E_SIGNATURE']),
      }),
      request({
        name: 'Reject E-signature in headless Runner',
        method: 'POST',
        url: '/v1/workflows/{{esign_workflow_id}}/sessions',
        preRequest: requireFlag('run_esignature_tests'),
        body: {
          first_name: '{{first_name}}',
          last_name: '{{last_name}}',
          email: '{{test_email}}',
          phone: '{{phone}}',
        },
        tests: [...assertStatus(400), "pm.test('identifies E-signature as invalid for Runner', () => pm.expect(pm.response.text().toLowerCase()).to.include('e-signature'));"],
      }),
    ]),

    folder('05 — Optional real phone verification', 'Enable only after the backend adapter is deployed. This places a real call to the configured phone number.', [
      request({
        name: 'Create phone verification session',
        method: 'POST',
        url: '/v1/workflows/{{phone_workflow_id}}/sessions',
        preRequest: requireFlag('run_phone_verification_tests'),
        body: {
          first_name: '{{first_name}}',
          last_name: '{{last_name}}',
          email: '{{test_email}}',
          phone: '{{phone}}',
          external_id: 'didv-850-phone-{{run_id}}',
        },
        tests: [
          ...assertStatus(200),
          'const json = pm.response.json();',
          "if (json.session_id) pm.collectionVariables.set('phone_session_id', json.session_id);",
          "pm.collectionVariables.set('phone_poll_attempt', '0');",
        ],
      }),
      request({
        name: 'Start phone verification call',
        method: 'POST',
        url: '/v1/sessions/{{phone_session_id}}/steps/PHONE_VERIFICATION',
        preRequest: requireFlag('run_phone_verification_tests'),
        body: { action: 'start' },
        tests: [
          ...assertStatus(200),
          "pm.test('call enters progress or completes', () => pm.expect(['IN_PROGRESS','COMPLETED']).to.include(pm.response.json().step_status));",
        ],
      }),
      request({
        name: 'Poll phone verification result',
        method: 'POST',
        url: '/v1/sessions/{{phone_session_id}}/steps/PHONE_VERIFICATION',
        preRequest: requireFlag('run_phone_verification_tests'),
        body: { action: 'complete' },
        tests: [
          "const attempt = Number(pm.collectionVariables.get('phone_poll_attempt') || 0) + 1;",
          "pm.collectionVariables.set('phone_poll_attempt', String(attempt));",
          "const limit = Number(pm.variables.get('phone_poll_limit') || 12);",
          "if (pm.response.code === 409 && pm.response.text().includes('PHONE_VERIFICATION_RESULT_NOT_READY') && attempt < limit) {",
          "  console.log(`Phone result not ready; retry ${attempt}/${limit}`);",
          "  const delay = Number(pm.variables.get('phone_poll_interval_ms') || 5000);",
          "  setTimeout(() => pm.execution.setNextRequest(pm.info.requestName), delay);",
          '} else {',
          "  pm.test('phone verification reaches a final response', () => pm.response.to.have.status(200));",
          "  pm.test('phone verification is no longer in progress', () => pm.expect(pm.response.json().step_status).not.to.eql('IN_PROGRESS'));",
          '}',
        ],
      }),
    ]),
  ],
};

const environment = {
  id: 'e8e84a45-af88-4f2b-91b5-94659b449851',
  name: 'DIDV-850 — Dev (example)',
  values: [
    { key: 'base_url', value: 'https://v5ba6yg9s6.execute-api.us-east-1.amazonaws.com/dev', enabled: true },
    { key: 'api_key', value: '', type: 'secret', enabled: true },
    { key: 'first_name', value: 'Ada', enabled: true },
    { key: 'last_name', value: 'Lovelace', enabled: true },
    { key: 'legal_name', value: 'Ada Lovelace', enabled: true },
    { key: 'applicant_email', value: '', enabled: true },
    { key: 'phone', value: '+12025550123', enabled: true },
    { key: 'run_esignature_tests', value: 'false', enabled: true },
    { key: 'esign_template_id', value: '', enabled: true },
    { key: 'esign_template_name', value: 'DIDV-850 test template', enabled: true },
    { key: 'run_phone_verification_tests', value: 'false', enabled: true },
    { key: 'phone_poll_limit', value: '12', enabled: true },
    { key: 'phone_poll_interval_ms', value: '5000', enabled: true },
  ],
  _postman_variable_scope: 'environment',
  _postman_exported_at: '2026-09-25T00:00:00.000Z',
  _postman_exported_using: 'DIDV-850 generator',
};

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(collectionPath, `${JSON.stringify(collection, null, 2)}\n`);
fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`);

console.log(`Generated ${collectionPath}`);
console.log(`Generated ${environmentPath}`);
