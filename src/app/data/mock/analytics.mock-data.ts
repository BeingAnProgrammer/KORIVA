import { CategoryStat } from '../models/category-stat.model';

export const CATEGORY_STATS: readonly CategoryStat[] = [
  { name: 'Development', percentage: '32%', color: 'var(--ink-blue)' },
  { name: 'Sales', percentage: '24%', color: 'var(--accent)' },
  { name: 'Product', percentage: '18%', color: 'var(--rust)' },
  { name: 'Client', percentage: '15%', color: 'var(--ochre)' },
  { name: 'Other', percentage: '11%', color: 'var(--ink-4)' }
];
