import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password']);

export const TodoScalarFieldEnumSchema = z.enum(['id','title','description']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  password: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
})

export type Todo = z.infer<typeof TodoSchema>
