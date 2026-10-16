import { createStrapi } from "@strapi/strapi";

const SOURCE_DOCUMENT_ID = "tdt2au0q39smpzc9mt0r4zey";
const PAGE_SIZE = 100;

console.log("RUNNING COPY SCRIPT VERSION 2")

async function main(): Promise<void> {
  const strapi = await createStrapi({
    appDir: process.cwd(),
    distDir: "./dist",
  }).load();

  try {
    const service = strapi.documents("api::industry.industry");

    console.log("Fetching source Industry...");

    // 1. Fetch the source Industry and its Dynamic Zone.
    const source = await service.findOne({
      documentId: SOURCE_DOCUMENT_ID,
      populate: {
        content: {
          populate: "*",
        },
      },
    });

    if (!source) {
      throw new Error(
        `Source Industry not found: ${SOURCE_DOCUMENT_ID}`
      );
    }

    if (!source.content) {
      throw new Error("Source Industry has no Dynamic Zone content.");
    }

    console.log("Source Industry:", source.title);
    console.log("Source components:", source.content.length);

    // 2. Remove component IDs so Strapi creates new component entries.
    const content = source.content.map((component: any) => {
      const { id, ...componentData } = component;
      return componentData;
    });

    // 3. Fetch all Industry documents using pagination.
    const allIndustries: any[] = [];
    let page = 1;

    while (true) {
      const batch = await service.findMany({
        fields: ["documentId", "title"],
        start: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      if (batch.length === 0) {
        break;
      }

      allIndustries.push(...batch);

      console.log(
        `Fetched page ${page}: ${batch.length} Industry entries`
      );

      if (batch.length < PAGE_SIZE) {
        break;
      }

      page++;
    }

    // 4. Exclude the source Industry.
    const targets = allIndustries.filter(
      (industry: any) =>
        industry.documentId !== SOURCE_DOCUMENT_ID
    );

    console.log("\nTotal Industries:", allIndustries.length);
    console.log("Destinations to update:", targets.length);

    let successCount = 0;
    let failureCount = 0;

    // 5. Copy content to every destination.
    for (const target of targets) {
      console.log(
        `\nUpdating: ${target.title} (${target.documentId})`
      );

      try {
        await service.update({
          documentId: target.documentId,
          data: {
            content: JSON.parse(JSON.stringify(content)),
          },
        });

        successCount++;

        console.log(
          `SUCCESS: ${target.title} (${target.documentId})`
        );
      } catch (error) {
        failureCount++;

        console.error(
          `FAILED: ${target.title} (${target.documentId})`,
          error
        );
      }
    }

    console.log("\n========== COPY SUMMARY ==========");
    console.log(`Total Industries found: ${allIndustries.length}`);
    console.log(`Source skipped: ${allIndustries.length > 0 ? 1 : 0}`);
    console.log(`Successfully updated: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log("==================================");
  } finally {
    // 6. Shut down Strapi and report any shutdown errors.
    try {
      await strapi.destroy();
      console.log("Strapi shut down successfully.");
    } catch (error) {
      console.warn(
        "Strapi shutdown warning:",
        error instanceof Error ? error.message : error
      );
    }
  }
}

main().catch((error: unknown) => {
  console.error(
    "Copy operation failed:",
    error instanceof Error ? error.message : error
  );

  process.exitCode = 1;
});