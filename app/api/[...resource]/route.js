
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin.js';
export const runtime = 'nodejs';

const json = (data, status = 200) =>
  NextResponse.json(data, { status });

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

async function isAdmin(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token || !process.env.ADMIN_EMAIL) return false;

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  return (
    !error &&
    data?.user?.email?.toLowerCase() ===
      process.env.ADMIN_EMAIL.toLowerCase()
  );
}

export async function GET(request, { params }) {
  try {
    const { resource = [] } = await params;
    const key = resource[0];

    if (key === 'health') {
      return json({ ok: true, restaurant: 'APNA DEERA RESTAURANT' });
    }

    if (!['orders', 'reservations', 'reviews'].includes(key)) {
      return json({ error: 'Not found' }, 404);
    }

    // Customer reviews are public. Orders and reservations are admin-only.
    if (key !== 'reviews' && !(await isAdmin(request))) {
      return json({ error: 'Admin login required.' }, 401);
    }

    const table = key;

    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return json(data || []);
  } catch (error) {
    console.error('GET API error:', error);
    return json({ error: error.message || 'Database request failed.' }, 500);
  }
}

export async function POST(request, { params }) {
  try {
    const { resource = [] } = await params;
    const key = resource[0];

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON request.' }, 400);
    }

    const now = new Date().toISOString();
    let table;
    let record;
    let message;

    if (key === 'orders') {
      const {
        customer, phone, address, items, total,
        payment, orderType, scheduledAt, notes, tableId
      } = body || {};

      if (
        !customer?.trim() ||
        !phone?.trim() ||
        !Array.isArray(items) ||
        !items.length ||
        !Number.isFinite(Number(total)) ||
        Number(total) <= 0 ||
        !payment
      ) {
        return json({
          error: 'Please complete customer, item, total and payment details.'
        }, 400);
      }

      table = 'orders';
      record = {
        id: makeId('AD'),
        customer,
        phone,
        address: address || '',
        items,
        total: Number(total),
        payment,
        orderType: orderType || 'Delivery',
        tableId: tableId || '',
        scheduledAt: scheduledAt || now,
        notes: notes || '',
        status: 'Pending',
        createdAt: now
      };
      message = 'Order placed successfully.';
    } else if (key === 'reservations') {
      const { name, phone, date, time, guests } = body || {};

      if (
        !name?.trim() ||
        !phone?.trim() ||
        !date ||
        !time ||
        !Number(guests)
      ) {
        return json({
          error: 'Please complete all reservation details.'
        }, 400);
      }

      table = 'reservations';
      record = {
        id: makeId('RSV'),
        name,
        phone,
        date,
        time,
        guests: Number(guests),
        notes: body.notes || '',
        status: 'Requested',
        createdAt: now
      };
      message = 'Reservation request received.';
    } else if (key === 'reviews') {
      const { name, rating, message: reviewMessage } = body || {};

      if (!name?.trim() || !Number(rating) || !reviewMessage?.trim()) {
        return json({
          error: 'Name, rating and review are required.'
        }, 400);
      }

      table = 'reviews';
      record = {
        id: makeId('REV'),
        name,
        rating: Math.min(5, Math.max(1, Number(rating))),
        message: reviewMessage,
        createdAt: now
      };
      message = 'Thank you for your review.';
    } else {
      return json({ error: 'Not found' }, 404);
    }

    const { data, error } = await supabaseAdmin
      .from(table)
      .insert(record)
      .select()
      .single();

    if (error) throw error;

    return json({ message, [key.slice(0, -1)]: data }, 201);
  } catch (error) {
    console.error('POST API error:', error);
    return json({ error: error.message || 'Database request failed.' }, 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { resource = [] } = await params;

    if (
      resource.length !== 3 ||
      resource[0] !== 'orders' ||
      resource[2] !== 'status'
    ) {
      return json({ error: 'Not found' }, 404);
    }

    if (!(await isAdmin(request))) {
      return json({ error: 'Admin login required.' }, 401);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON request.' }, 400);
    }

    const allowed = [
      'Pending',
      'Preparing',
      'Out for delivery',
      'Delivered',
      'Cancelled'
    ];

    if (!allowed.includes(body.status)) {
      return json({ error: 'Invalid order status.' }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        status: body.status,
        updatedAt: new Date().toISOString()
      })
      .eq('id', resource[1])
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return json({ error: 'Order not found.' }, 404);
      }
      throw error;
    }

    return json({ message: 'Order status updated.', order: data });
  } catch (error) {
    console.error('PATCH API error:', error);
    return json({ error: error.message || 'Database request failed.' }, 500);
  }
}
