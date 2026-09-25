# DIDV-850 Postman test pack

This test pack verifies the Create Workflow and Workflow Runner changes delivered by DIDV-850 against the dev API.

## Run the automatic suite

1. Import `DIDV-850.postman_collection.json` into Postman.
2. Import `DIDV-850.dev.postman_environment.example.json`.
3. Duplicate the environment and set `api_key`. Do not commit or export the populated environment.
4. Select the environment and run the entire collection in its existing order.

The default run requires no workflow or session IDs. It generates a unique run ID, creates its own workflows and session, carries IDs between requests, and evaluates the expected responses with Postman tests.

The automatic folders cover:

- the 21 production Create Workflow steps that do not require organization-specific E-signature configuration;
- flat public configuration in create, retrieve, and update responses;
- duplicate, maximum-step, prerequisite, and hidden-step rejection;
- headless session creation, state retrieval, repeated start, ordered execution, and completion;
- invalid upload-slot, out-of-order, terminal restart, and terminal replay protection.

## Optional tests

### E-signature

Set `run_esignature_tests` to `true` and provide an existing `esign_template_id`. The collection creates the hosted workflow and confirms that the headless Runner rejects it.

### Phone verification

Run this only after the backend phone adapter is deployed. Set `run_phone_verification_tests` to `true` and replace `phone` with an approved test number that can answer the call and repeat the configured phrase.

This folder initiates a real external call. The collection reuses the phone workflow created by the automatic contract folder and polls the result up to `phone_poll_limit` times, waiting `phone_poll_interval_ms` between attempts.

## Test artifacts

Created workflow names begin with `DIDV-850 POSTMAN` and include the generated `run_id`. The collection stores workflow and session IDs as collection variables and prints retry information to the Postman console.

The public API does not currently expose workflow deletion. Record the generated IDs in the ticket test note if the workflows need later cleanup through Backoffice or the database.

## Regenerate the files

From the documentation repository root, run:

```bash
node scripts/generate-didv-850-postman.mjs
```

Commit the generator and both generated JSON files together.
