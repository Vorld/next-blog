import { defineConfig } from "sanity";
import { structureTool } from 'sanity/structure'
import { latexInput } from "sanity-plugin-latex-input";

import schemas from './schemas/schema'

export default defineConfig({
  title: "Venu's Website",
  projectId: "qjy3hvt5",
  dataset: "production",
  plugins: [structureTool(), latexInput()],
  schema: {
    types: schemas,
  },
});