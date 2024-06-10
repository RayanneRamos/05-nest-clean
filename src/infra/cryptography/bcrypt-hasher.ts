import { compare, hash } from "bcryptjs";
import { HashComparer } from "src/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "src/domain/forum/application/cryptography/hash-generator";

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
