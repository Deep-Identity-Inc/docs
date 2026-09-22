import fs from 'node:fs';

const contractSource = fs.readFileSync('snippets/workflow-builder/openapi-contract.mdx', 'utf8');
const catalogSource = fs.readFileSync('snippets/workflow-builder/generated/catalog.mdx', 'utf8');
const constantsSource = fs.readFileSync('snippets/workflow-builder/constants.mdx', 'utf8');
const saveDialogSource = fs.readFileSync('snippets/workflow-builder/save-dialog.mdx', 'utf8');
const openapiSource = fs.readFileSync('assets/openapi.yaml', 'utf8');

const contractEntries = [...contractSource.matchAll(/'([^']+)': \{ apiId: '([A-Z_]+)' \}/g)];
const builderIds = contractEntries.map((match) => match[1]);
const apiIds = contractEntries.map((match) => match[2]);
const exportedIdsSource = contractSource.match(/OPENAPI_WORKFLOW_STEP_IDS\s*=\s*\[([\s\S]*?)\];/)?.[1] || '';
const exportedIds = [...exportedIdsSource.matchAll(/'([A-Z][A-Z_]+)'/g)].map((match) => match[1]);
const runnerIdsSource = contractSource.match(/WORKFLOW_RUNNER_STEP_IDS\s*=\s*\[([\s\S]*?)\];/)?.[1] || '';
const runnerIds = [...runnerIdsSource.matchAll(/'([A-Z][A-Z_]+)'/g)].map((match) => match[1]);

if (apiIds.length !== 30) {
  throw new Error(`Expected 30 OpenAPI workflow steps, found ${apiIds.length}`);
}
if (new Set(builderIds).size !== builderIds.length || new Set(apiIds).size !== apiIds.length) {
  throw new Error('Workflow builder contract contains duplicate step IDs');
}
if (JSON.stringify(exportedIds) !== JSON.stringify(apiIds)) {
  throw new Error('OPENAPI_WORKFLOW_STEP_IDS must match the step registry IDs in order');
}

const missingCatalogSteps = builderIds.filter((id) => !catalogSource.includes(`"id": "${id}"`));
if (missingCatalogSteps.length) {
  throw new Error(`Contract steps missing from the builder catalog: ${missingCatalogSteps.join(', ')}`);
}

const catalogStart = catalogSource.indexOf('[', catalogSource.indexOf('WORKFLOW_STEPS_OPTIONS'));
const catalogEnd = catalogSource.indexOf('\n\nexport const WORKFLOW_STEPS_DISABLED');
const catalogSteps = JSON.parse(catalogSource.slice(catalogStart, catalogEnd).trim().replace(/;$/, ''));
const hiddenSource = constantsSource.match(/HIDDEN_STEP_IDS:\s*\[([\s\S]*?)\]/)?.[1] || '';
const hiddenIds = [...hiddenSource.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const visibleCatalogIds = catalogSteps.map((step) => step.id).filter((id) => !hiddenIds.includes(id));
const missingFromPalette = builderIds.filter((id) => !visibleCatalogIds.includes(id));
const unsupportedInPalette = visibleCatalogIds.filter((id) => !builderIds.includes(id));
if (missingFromPalette.length || unsupportedInPalette.length) {
  throw new Error(`Builder palette drift. Missing: ${missingFromPalette.join(', ') || 'none'}. Unsupported: ${unsupportedInPalette.join(', ') || 'none'}.`);
}

const serializerStart = saveDialogSource.indexOf('  const PUBLIC_STEP_IDS');
const serializerEnd = saveDialogSource.indexOf('  const json =', serializerStart);
if (serializerStart < 0 || serializerEnd < 0) throw new Error('Could not locate the Workflow Builder serializer');
const serializer = new Function(
  'WB',
  `${saveDialogSource.slice(serializerStart, serializerEnd)}\nreturn { buildStepConfig, buildPublicWorkflowPayload, PUBLIC_STEP_IDS };`,
)({
  OPENAPI_WORKFLOW_STEPS: Object.fromEntries(contractEntries.map((match) => [match[1], { apiId: match[2] }])),
  OPENAPI_WORKFLOW_STEP_IDS: apiIds,
  WORKFLOW_RUNNER_STEP_IDS: runnerIds,
  QUESTIONNAIRE_TEMPLATES: {},
  OPTION_MARKERS: {},
});
for (const step of catalogSteps.filter((candidate) => builderIds.includes(candidate.id) && candidate.id !== 'e-signature')) {
  const built = serializer.buildPublicWorkflowPayload('Contract smoke test', [step]);
  if (!built.valid || built.payload.steps.length !== 1 || built.payload.steps[0].id !== serializer.PUBLIC_STEP_IDS[step.id]) {
    throw new Error(`Could not serialize ${step.id} into a complete one-step OpenAPI workflow`);
  }
  JSON.stringify(built.payload);
}
const eSignatureStep = structuredClone(catalogSteps.find((candidate) => candidate.id === 'e-signature'));
const setESignatureValue = (groupId, propertyId, value) => {
  const group = eSignatureStep.propertyGroups.find((candidate) => candidate.groupId === groupId);
  const property = group?.properties.find((candidate) => candidate.id === propertyId);
  if (!property) throw new Error(`Could not configure E-signature fixture ${groupId}.${propertyId}`);
  property.value = value;
};
setESignatureValue('e-signature-settings', 'template-id', 'template-123');
setESignatureValue('e-signature-settings', 'template-name', 'Employment agreement');
setESignatureValue('e-signature-settings', 'template-signer-count', 2);
setESignatureValue('e-signature-settings', 'include-sender-as-signer', true);
setESignatureValue('e-signature-settings', 'sender-role', 'signer_2');
setESignatureValue('esign-template', 'template-id', 'template-123');
const eSignaturePayload = serializer.buildPublicWorkflowPayload('E-signature workflow', [eSignatureStep]);
if (!eSignaturePayload.valid || JSON.stringify(eSignaturePayload.payload.steps[0]) !== JSON.stringify({
  id: 'E_SIGNATURE',
  config: {
    template_id: 'template-123',
    template_name: 'Employment agreement',
    template_signer_count: 2,
    include_sender_as_signer: true,
    sender_role: 'signer_2',
    allow_typed_signature: true,
  },
})) {
  throw new Error('Could not serialize E-signature into the OpenAPI creation contract');
}
const supportedCatalogSteps = catalogSteps.filter((candidate) => builderIds.includes(candidate.id));
const repeated = serializer.buildPublicWorkflowPayload('Repeated step', [supportedCatalogSteps[0], supportedCatalogSteps[0]]);
if (repeated.valid || repeated.duplicates.length !== 1 || repeated.payload.steps.length !== 2) {
  throw new Error('Repeated steps must fail without silently changing the generated payload');
}
const oversized = serializer.buildPublicWorkflowPayload('Oversized workflow', supportedCatalogSteps.slice(0, 11));
if (oversized.valid || !oversized.tooMany || oversized.payload.steps.length !== 11) {
  throw new Error('Workflows over 10 steps must fail without silently truncating the generated payload');
}
const unsupported = serializer.buildPublicWorkflowPayload('Unsupported workflow', [{ id: 'passport-nfc-scanner' }]);
if (unsupported.valid || unsupported.unsupported.length !== 1 || unsupported.payload.steps.length !== 0) {
  throw new Error('Unsupported steps must block request generation');
}

const enumBlocks = [...openapiSource.matchAll(/enum:\r?\n((?:\s+- [A-Z][A-Z_]+\r?\n)+)/g)].map((match) =>
  [...match[1].matchAll(/- ([A-Z][A-Z_]+)/g)].map((entry) => entry[1]),
);
const runnerStepIds = enumBlocks.find((values) => values.includes('PHONE_VERIFICATION') && values.includes('PROOFCALL'));
if (!runnerStepIds) throw new Error('Could not find the Workflow Runner step enum in assets/openapi.yaml');

const createRequestStart = openapiSource.indexOf('    CreateWorkflowRequest:');
const createRequestEnd = openapiSource.indexOf('    UpdateWorkflowStepConfigRequest:', createRequestStart);
if (createRequestStart < 0 || createRequestEnd < 0) throw new Error('Could not find CreateWorkflowRequest in assets/openapi.yaml');
const createRequestSource = openapiSource.slice(createRequestStart, createRequestEnd);
const createStepIds = [...createRequestSource.matchAll(/- ([A-Z][A-Z_]+)/g)].map((match) => match[1]);
const missingCreateIds = apiIds.filter((id) => !createStepIds.includes(id));
const extraCreateIds = createStepIds.filter((id) => !apiIds.includes(id));
if (missingCreateIds.length || extraCreateIds.length) {
  throw new Error(`Builder/Create Workflow drift. Missing from spec: ${missingCreateIds.join(', ') || 'none'}. Extra in spec: ${extraCreateIds.join(', ') || 'none'}.`);
}

const missingRunnerIds = runnerIds.filter((id) => !runnerStepIds.includes(id));
const extraRunnerIds = runnerStepIds.filter((id) => !runnerIds.includes(id));
if (missingRunnerIds.length || extraRunnerIds.length) {
  throw new Error(`Builder/Runner drift. Missing from spec: ${missingRunnerIds.join(', ') || 'none'}. Extra in spec: ${extraRunnerIds.join(', ') || 'none'}.`);
}

for (const deferred of ['passport-nfc-scanner', 'crypto-wallet-screening']) {
  if (builderIds.includes(deferred)) throw new Error(`${deferred} must remain outside the OpenAPI workflow contract`);
}
if (runnerIds.includes('E_SIGNATURE')) throw new Error('E_SIGNATURE must remain outside the Workflow Runner contract');

console.log(`Workflow Builder contract matches ${apiIds.length} Create Workflow steps and ${runnerIds.length} Runner steps.`);
