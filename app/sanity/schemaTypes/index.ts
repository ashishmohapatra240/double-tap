import type { SchemaTypeDefinition } from "sanity";

import { brand } from "./brand";
import { careers } from "./careers";
import { teamMember } from "./teamMember";
import { work } from "./work";

export const schemaTypes: SchemaTypeDefinition[] = [
  work,
  teamMember,
  brand,
  careers,
];
