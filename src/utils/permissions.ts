import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  users: ["create", "read", "update", "delete"],
  leads: ["create", "read", "update", "delete"],
  contacts: ["create", "read", "update", "delete"],
  companies: ["create", "read", "update", "delete"],
  pipelineStages: ["create", "read", "update", "delete"],
  tags: ["create", "read", "update", "delete"],
  tasks: ["create", "read", "update", "delete"],
  entityTags: ["create", "read", "update", "delete"],
  activities: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  users: ["create", "read", "update", "delete"],
  leads: ["create", "read", "update", "delete"],
  contacts: ["create", "read", "update", "delete"],
  companies: ["create", "read", "update", "delete"],
  pipelineStages: ["create", "read", "update", "delete"],
  tags: ["create", "read", "update", "delete"],
  tasks: ["create", "read", "update", "delete"],
  entityTags: ["create", "read", "update", "delete"],
  activities: ["create", "read", "update", "delete"],
});

export const manager = ac.newRole({
  users: ["read"],
  leads: ["create", "read", "update", "delete"],
  contacts: ["create", "read", "update", "delete"],
  companies: ["create", "read", "update", "delete"],
  pipelineStages: ["create", "read", "update", "delete"],
  tags: ["create", "read", "update", "delete"],
  tasks: ["create", "read", "update", "delete"],
  entityTags: ["create", "read", "update", "delete"],
  activities: ["create", "read", "update", "delete"],
});

export const sales = ac.newRole({
  users: ["read"],
  leads: ["create", "read", "update", "delete"],
  contacts: ["create", "read", "update", "delete"],
  companies: ["create", "read", "update", "delete"],
  pipelineStages: ["read"],
  tags: ["read"],
  tasks: ["create", "read", "update", "delete"],
  entityTags: ["read"],
  activities: ["create", "read", "update", "delete"],
});

export const roles = {
  admin,
  manager,
  sales,
} as const;

export type Role = keyof typeof roles;
