import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getSourceMetadata,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function uploadSourceSchema(
  sourceSchemaFile: string,
  tag: string,
  apiId: string,
  apiKey: string,
  sourceMetadata: string,
  cloudUrl: string | null,
): Promise<void> {
  const args: string[] = [
    "fusion",
    "upload",
    "--tag",
    tag,
    "--api-id",
    apiId,
    "--source-schema-file",
    sourceSchemaFile,
    "--source-metadata",
    sourceMetadata,
  ];

  if (cloudUrl) {
    args.push("--cloud-url", cloudUrl);
  }

  const env = {
    ...process.env,
    NITRO_API_KEY: apiKey,
  };

  const exitCode = await exec.exec("nitro", args, { env });

  if (exitCode !== 0) {
    throw new Error(`Nitro CLI exited with code ${exitCode} for ${sourceSchemaFile}`);
  }
}

async function run(): Promise<void> {
  try {
    await installNitro(nitroVersion);

    const tag = core.getInput("tag", { required: true });
    const apiId = core.getInput("api-id", { required: true });
    const apiKey = core.getInput("api-key", { required: true });
    const jobId = core.getInput("job-id") || undefined;
    const sourceMetadata = JSON.stringify(getSourceMetadata(jobId));
    const cloudUrl = core.getInput("cloud-url") || null;

    const sourceSchemaFiles = core
      .getInput("source-schema-files", { required: true })
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    for (const sourceSchemaFile of sourceSchemaFiles) {
      await uploadSourceSchema(sourceSchemaFile, tag, apiId, apiKey, sourceMetadata, cloudUrl);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
