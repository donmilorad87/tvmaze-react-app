import { test, expect } from '@playwright/test';

test.describe('App End-to-End', () => {
    test('should display Homepage on root route', {
        tag: '@fast',
    }, async ({ page }) => {
        await page.goto('http://localhost:5173/');
        const locator = page.locator('h1');
        await expect(locator).toContainText('TV Maze');
        const listOfShows = page.locator('.episodeItem');
        await expect(listOfShows).toHaveCount(18);

        const listOfStars = page.locator('.episodeItem .ratingStars img');
        await expect(listOfStars).toHaveCount(90);

        /*      await expect(page.locator('text=Homepage')).toBeVisible(); */
    });

    /*  test('should display pagination page', async ({ page }) => {
         await page.goto('http://localhost:5173/pagination');
         await expect(page.locator('text=Pagination')).toBeVisible();
     });
 
     test('should display Show page with dynamic ID', async ({ page }) => {
         await page.goto('http://localhost:5173/show/123');
         await expect(page.locator('text=Show: 123')).toBeVisible();
     }); */
});