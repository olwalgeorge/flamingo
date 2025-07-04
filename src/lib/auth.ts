import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

interface TokenPayload {
  adminId: string;
  email: string;
  role: string;
  isTemporary?: boolean;
}

export async function verifyAdminToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, message: 'No token provided' };
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return { 
        success: true, 
        adminId: decoded.adminId,
        email: decoded.email,
        role: decoded.role,
        isTemporary: decoded.isTemporary || false
      };
    } catch {
      return { success: false, message: 'Invalid token' };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false, message: 'Token verification failed' };
  }
}

export function generateToken(payload: TokenPayload, expiresIn = '24h') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export function generateTemporaryToken(payload: Omit<TokenPayload, 'isTemporary'>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign({ ...payload, isTemporary: true }, JWT_SECRET, { expiresIn: '15m' } as any);
}
