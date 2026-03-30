// routes/admin.users.routes.js
import express from 'express';
import { db } from '../database/db.js';
import { users } from '../database/schema.js';
import { desc, count, sql } from 'drizzle-orm';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

/**
 * GET /api/admin/users
 * მომხმარებლების სია (pagination + ძებნა)
 * ელფოსტა არ იწერება უსაფრთხოების მიზეზით
 */
router.get('/', ...adminAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(Math.max(10, parseInt(req.query.limit) || 20), 100);
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').toString().trim();

    // მომხმარებლების სია
    let userQuery = db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        created_at: users.created_at,
        isVerified: users.isVerified,
      })
      .from(users)
      .orderBy(desc(users.created_at));

    // ძებნა სახელით ან გვარით
    if (search) {
      userQuery = userQuery.where(
        sql`(
          ${users.firstName} ILIKE ${'%' + search + '%'} OR 
          ${users.lastName} ILIKE ${'%' + search + '%'}
        )`
      );
    }

    const userList = await userQuery.limit(limit).offset(offset);

    // საერთო რაოდენობა (pagination-ისთვის)
    let countQuery = db.select({ total: count() }).from(users);

    if (search) {
      countQuery = countQuery.where(
        sql`(
          ${users.firstName} ILIKE ${'%' + search + '%'} OR 
          ${users.lastName} ILIKE ${'%' + search + '%'}
        )`
      );
    }

    const [{ total }] = await countQuery;

    res.json({
      success: true,
      total: Number(total),
      page,
      limit,
      totalPages: Math.ceil(Number(total) / limit),
      users: userList,
    });
  } catch (err) {
    console.error('[ADMIN USERS LIST ERROR]', err);
    res.status(500).json({
      success: false,
      message: 'მომხმარებლების სიის წამოღება ვერ მოხერხდა',
    });
  }
});

/**
 * GET /api/admin/users/stats
 * სტატისტიკა: საერთო რაოდენობა, ბოლო 7 დღე, ბოლო 30 დღე
 */
router.get('/stats', ...adminAuth, async (req, res) => {
  try {
    const [stats] = await db
      .select({
        total: count(),
        last7Days: sql`COUNT(CASE WHEN ${users.created_at} >= NOW() - INTERVAL '7 days' THEN 1 END)`,
        last30Days: sql`COUNT(CASE WHEN ${users.created_at} >= NOW() - INTERVAL '30 days' THEN 1 END)`,
      })
      .from(users);

    res.json({
      success: true,
      stats: {
        total: Number(stats.total || 0),
        last7Days: Number(stats.last7Days || 0),
        last30Days: Number(stats.last30Days || 0),
      },
    });
  } catch (err) {
    console.error('[ADMIN USERS STATS ERROR]', err);
    res.status(500).json({
      success: false,
      message: 'სტატისტიკის წამოღება ვერ მოხერხდა',
    });
  }
});

export default router;