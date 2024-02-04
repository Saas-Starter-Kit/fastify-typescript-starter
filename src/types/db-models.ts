import { Type, Static } from '@sinclair/typebox';

// sinclairzx81.github.io/typebox-workbench/
// use above link to convert Prisma types to Typebox Types.
// *Note* Update the types here after running db migration

export type TodoT = Static<typeof TodoModel>;
export const TodoModel = Type.Object({
  id: Type.String(),
  title: Type.String(),
  description: Type.String()
});
