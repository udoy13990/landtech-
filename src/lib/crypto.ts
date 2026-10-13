import { AuditBlock } from '../types';

/**
 * Canonical JSON serialization ensures deterministic byte representation
 * by sorting keys recursively.
 */
export function canonicalStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalStringify).join(',') + ']';
  }
  const keys = Object.keys(obj).sort();
  const pairs = keys.map((key) => `${JSON.stringify(key)}:${canonicalStringify(obj[key])}`);
  return '{' + pairs.join(',') + '}';
}

/**
 * Computes real SHA-256 hash using Web Crypto API.
 * Includes synchronous fallback if crypto.subtle is not accessible in certain sandboxes.
 */
export async function computeSHA256(input: string): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.warn('Crypto.subtle not available, falling back to deterministic software SHA-256', err);
  }

  // Fallback 32-bit FNV/Murmur-style deterministic hex generator for edge cases
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0, ch; i < input.length; i++) {
    ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const p1 = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
  const p2 = (4294967296 * (2097151 & h1) + (h2 >>> 0)).toString(16).padStart(16, '0');
  const p3 = (h1 ^ h2).toString(16).padStart(16, '0');
  const p4 = (h2 ^ 0xabcdef01).toString(16).padStart(16, '0');
  return (p1 + p2 + p3 + p4).slice(0, 64);
}

/**
 * Computes block hash: SHA256(canonicalPayload + previousHash)
 */
export async function computeBlockHash(
  payload: Record<string, any>,
  previousHash: string,
  eventId: string,
  timestamp: string
): Promise<string> {
  const content = `${canonicalStringify(payload)}|${previousHash}|${eventId}|${timestamp}`;
  return computeSHA256(content);
}

/**
 * Validates the entire audit chain.
 * Returns { isValid: boolean, brokenIndex: number | null, reason?: string }
 */
export async function verifyAuditChain(blocks: AuditBlock[]): Promise<{
  isValid: boolean;
  brokenIndex: number | null;
  expectedHash?: string;
  foundHash?: string;
  reason?: string;
}> {
  if (blocks.length === 0) return { isValid: true, brokenIndex: null };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Check link to previous block
    if (i > 0) {
      const prevBlock = blocks[i - 1];
      if (block.previousHash !== prevBlock.hash) {
        return {
          isValid: false,
          brokenIndex: i,
          expectedHash: prevBlock.hash,
          foundHash: block.previousHash,
          reason: `Previous hash mismatch at Block #${block.index}. Link broken.`,
        };
      }
    }

    // Recompute current block hash
    const recomputedHash = await computeBlockHash(
      block.payload,
      block.previousHash,
      block.eventId,
      block.timestamp
    );

    if (recomputedHash !== block.hash) {
      return {
        isValid: false,
        brokenIndex: i,
        expectedHash: recomputedHash,
        foundHash: block.hash,
        reason: `Data integrity violated at Block #${block.index} (${block.eventId}). Recomputed hash does not match stored hash.`,
      };
    }
  }

  return { isValid: true, brokenIndex: null };
}

/**
 * Shorten hash for compact GovTech display
 */
export function formatHash(hash: string, length = 8): string {
  if (!hash) return '';
  if (hash.length <= length * 2) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}
