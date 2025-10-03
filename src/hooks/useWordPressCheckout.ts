'use client';

import { useState, useCallback } from 'react';
import type { WordPressCartItem } from '@/store/wordpress-cart';

interface WordPressCustomer {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

interface WordPressBillingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone?: string;
}

interface WordPressShippingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface WordPressOrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WordPressBillingAddress;
  shipping: WordPressShippingAddress;
  line_items: Array<{
    product_id: number;
    variation_id?: number;
    quantity: number;
  }>;
  shipping_lines: Array<{
    method_id: string;
    method_title: string;
    total: string;
  }>;
  coupon_lines?: Array<{
    code: string;
    discount: string;
  }>;
}

interface UseWordPressCheckoutResult {
  isProcessing: boolean;
  error: string | null;
  orderId: number | null;
  createOrder: (orderData: WordPressOrderData) => Promise<number | null>;
  validateOrder: (orderData: Partial<WordPressOrderData>) => boolean;
  getShippingMethods: () => Promise<Array<{ id: string; title: string; cost: number }>>;
  getPaymentMethods: () => Array<{ id: string; title: string; description: string }>;
}

export const useWordPressCheckout = (): UseWordPressCheckoutResult => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const WORDPRESS_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
  const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

  const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

  const createOrder = useCallback(
    async (orderData: WordPressOrderData): Promise<number | null> => {
      setIsProcessing(true);
      setError(null);

      try {
        if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
          throw new Error('WordPress API credentials are not configured.');
        }

        const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/orders`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to create order: ${errorData.message || response.statusText}`);
        }

        const order = await response.json();
        setOrderId(order.id);
        return order.id;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [WORDPRESS_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET, auth],
  );

  const validateOrder = useCallback((orderData: Partial<WordPressOrderData>): boolean => {
    if (!orderData.billing) return false;
    if (!orderData.shipping) return false;
    if (!orderData.line_items || orderData.line_items.length === 0) return false;

    const { billing, shipping } = orderData;

    // Validation des champs obligatoires
    const requiredBillingFields = [
      'first_name',
      'last_name',
      'address_1',
      'city',
      'state',
      'postcode',
      'country',
      'email',
    ];
    const requiredShippingFields = ['first_name', 'last_name', 'address_1', 'city', 'state', 'postcode', 'country'];

    for (const field of requiredBillingFields) {
      if (!billing[field as keyof WordPressBillingAddress]) return false;
    }

    for (const field of requiredShippingFields) {
      if (!shipping[field as keyof WordPressShippingAddress]) return false;
    }

    return true;
  }, []);

  const getShippingMethods = useCallback(async (): Promise<Array<{ id: string; title: string; cost: number }>> => {
    try {
      if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        throw new Error('WordPress API credentials are not configured.');
      }

      const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/shipping/zones`, {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch shipping methods: ${response.statusText}`);
      }

      const zones = await response.json();

      // Méthodes de livraison par défaut
      return [
        { id: 'free_shipping', title: 'Livraison gratuite', cost: 0 },
        { id: 'flat_rate', title: 'Livraison standard', cost: 5.99 },
        { id: 'express', title: 'Livraison express', cost: 12.99 },
      ];
    } catch (err: any) {
      console.error('Error fetching shipping methods:', err);
      // Retourner des méthodes par défaut en cas d'erreur
      return [
        { id: 'free_shipping', title: 'Livraison gratuite', cost: 0 },
        { id: 'flat_rate', title: 'Livraison standard', cost: 5.99 },
        { id: 'express', title: 'Livraison express', cost: 12.99 },
      ];
    }
  }, [WORDPRESS_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET, auth]);

  const getPaymentMethods = useCallback((): Array<{ id: string; title: string; description: string }> => {
    return [
      { id: 'bacs', title: 'Virement bancaire', description: 'Paiement par virement bancaire' },
      { id: 'cheque', title: 'Chèque', description: 'Paiement par chèque' },
      { id: 'cod', title: 'Paiement à la livraison', description: 'Paiement en espèces à la livraison' },
      { id: 'stripe', title: 'Carte bancaire', description: 'Paiement sécurisé par carte bancaire' },
    ];
  }, []);

  return {
    isProcessing,
    error,
    orderId,
    createOrder,
    validateOrder,
    getShippingMethods,
    getPaymentMethods,
  };
};
