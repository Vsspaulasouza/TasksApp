import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function isDuplicate(error: unknown) {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
  );
}

export function notFound(error: unknown) {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
  );
}
