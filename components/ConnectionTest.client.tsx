'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function ConnectionTest() {
  const [supabaseStatus, setSupabaseStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const { products, loading: productsLoading, error: productsError } = useProducts({ first: 3 });

  // Test Supabase
  useEffect(() => {
    const testSupabase = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('profiles').select('count').limit(1);

        if (error) {
          setSupabaseError(error.message);
          setSupabaseStatus('error');
        } else {
          setSupabaseStatus('success');
        }
      } catch (err) {
        setSupabaseError(err instanceof Error ? err.message : 'Unknown error');
        setSupabaseStatus('error');
      }
    };

    testSupabase();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Test Supabase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {supabaseStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
            {supabaseStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
            {supabaseStatus === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
            Supabase Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {supabaseStatus === 'loading' && <p className="text-sm text-gray-600">Testing Supabase connection...</p>}
          {supabaseStatus === 'success' && (
            <div className="space-y-2">
              <Badge variant="outline" className="text-green-600">
                Connected
              </Badge>
              <p className="text-sm text-gray-600">Supabase is connected and accessible.</p>
            </div>
          )}
          {supabaseStatus === 'error' && (
            <div className="space-y-2">
              <Badge variant="destructive">Error</Badge>
              <p className="text-sm text-red-600">{supabaseError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test WordPress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {productsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {!productsLoading && !productsError && <CheckCircle className="h-4 w-4 text-green-500" />}
            {productsError && <XCircle className="h-4 w-4 text-red-500" />}
            WordPress Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {productsLoading && <p className="text-sm text-gray-600">Loading products from WordPress...</p>}
          {!productsLoading && !productsError && (
            <div className="space-y-2">
              <Badge variant="outline" className="text-green-600">
                Connected
              </Badge>
              <p className="text-sm text-gray-600">Found {products.length} products from WordPress.</p>
              {products.length > 0 && <div className="text-xs text-gray-500">First product: {products[0].name}</div>}
            </div>
          )}
          {productsError && (
            <div className="space-y-2">
              <Badge variant="destructive">Error</Badge>
              <p className="text-sm text-red-600">{productsError.message || 'Failed to connect to WordPress'}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
