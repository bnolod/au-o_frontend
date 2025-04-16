import { test, expect } from '@playwright/test';

//imgur api miatt nem megfelelo a localhost
const link = 'http://172.20.0.1:5173';
const email = 'teszt@teszt.com';
const password = 'Teszt123!';
const username = 'tesztuser';
const nickname = 'tesztnick';
const birthDate = '2025-04-03';

async function login(page) {
  await page.goto(link + '/landing');
  await page.getByRole('button', { name: 'Log in to Online Platform' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).fill(email);
  await page.getByRole('textbox', { name: 'example@auo.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

test('has title', async ({ page }) => {
  await page.goto(link);
  await expect(page).toHaveTitle('Au-o');
});

test('redirects from / to /landing', async ({ page }) => {
  await page.goto(link);
  await page.waitForURL(link + '/landing');
  await expect(page).toHaveURL(link + '/landing');
});

test('Login modal opens', async ({ page }) => {
  await page.goto(link + '/landing');
  await page.getByRole('button', { name: 'Log in to Online Platform' }).click();
  await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
    - paragraph:
      - img
    - heading "Welcome back!" [level=1]
    - text: E-mail address
    - textbox "example@auo.com"
    - text: Password
    - textbox "Password"
    - button "Sign In"
    - paragraph: Don't have an account yet?
    - button "Create your Account!"
    `);
});

//ha letezik akkor failel
test('Register user Teszt', async ({ page }) => {
  await page.goto('http://172.20.0.1:5173/landing');
  await page.getByRole('button', { name: 'Log in to Online Platform' }).click();
  await page.getByRole('button', { name: 'Create your Account!' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).fill(email);
  await page.getByRole('textbox', { name: 'example@auo.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'auo-user' }).fill(username);
  await page.getByRole('textbox', { name: 'auo-user' }).press('Tab');
  await page.getByRole('textbox', { name: 'Nickname' }).fill(nickname);
  await page.getByRole('textbox', { name: 'Nickname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Password', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Confirm password' }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm password' }).press('Tab');
  await page.getByPlaceholder('-01-01').fill(birthDate);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Search Users" [level=1]
    - searchbox "Search..."
    - button:
      - img
    `);
});

test('login to user Teszt', async ({ page }) => {
  await page.goto(link + '/landing');
  await page.getByRole('button', { name: 'Log in to Online Platform' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).click();
  await page.getByRole('textbox', { name: 'example@auo.com' }).fill(email);
  await page.getByRole('textbox', { name: 'example@auo.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Search Users')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByText('Latest messages')).toBeVisible();
});

test('Logout', async ({ page }) => {
  await login(page);
  await page.getByRole('navigation').getByRole('button').click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
    - img "AUO logo"
    - list:
      - listitem:
        - link "Download our App"
      - listitem:
        - link "FAQ"
      - listitem:
        - link "About Us"
    `);
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading "The new best way to socialize for car enthusiasts" [level=1]
        - heading "Join any group that interests you, or create one to foster your own community" [level=3]
        - button "Log in to Online Platform"
        - paragraph: Access the platform anywhere on your mobile device
        - img "android link"
      `);
});

test("new post", async ({ page }) => {
  await login(page);
  await page.getByRole('navigation').getByRole('button').click();
  await page.getByRole('link', { name: 'New post' }).click();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByText('Upload photos').click();
  await page.locator('input[type="file"]').setInputFiles('tests/kapszulas.jpg');
  await page.getByRole('textbox', { name: 'Write something about your' }).click();
  await page.getByRole('textbox', { name: 'Write something about your' }).fill('Leírás');
  await page.getByRole('textbox', { name: 'Tell us where you took the' }).click();
  await page.getByRole('textbox', { name: 'Tell us where you took the' }).fill('Lokáció');
  await page.getByRole('button', { name: 'Post' }).click();
  await expect(page.getByRole('list')).toMatchAriaSnapshot(`- paragraph: Leírás`);


})

test("new group creation (and one group post)", async ({ page }) => {
  await login(page);
  await page.getByRole('link', { name: 'Groups' }).click();
  await page.getByRole('button', { name: 'Create Group' }).click();
  await page.getByRole('textbox', { name: 'Car Group' }).click();
  await page.getByRole('textbox', { name: 'Car Group' }).fill('Testgroup');
  await page.getByRole('textbox', { name: 'Car Group' }).press('Tab');
  await page.getByRole('textbox', { name: 'This group is about...' }).click();
  await page.getByRole('textbox', { name: 'This group is about...' }).fill('Test description!');
  await page.getByRole('button', { name: 'Public' }).click();
  await page.getByRole('button', { name: 'Create group' }).click();
  await expect(page.locator('section')).toMatchAriaSnapshot(`
    - img
    - heading "Testgroup" [level=2]
    `);
  await expect(page.locator('section')).toMatchAriaSnapshot(`
    - paragraph: Private Group
    - paragraph: Description Test description!
    - button "Posts":
      - img
      - paragraph: Posts
    - button "Members":
      - img
      - paragraph: Members
    - button "Chat":
      - img
      - paragraph: Chat
    - button "Applications":
      - img
      - paragraph: Applications
    - button "Options":
      - img
      - paragraph: Options
    `);
  await page.getByRole('link', { name: 'Create a post' }).click();
  await page.getByText('Fotók feltöltése').click();
  await page.locator('input[type="file"]').setInputFiles('tests/kapszulas.jpg');
  await page.getByRole('textbox', { name: 'Leírás' }).click();
  await page.getByRole('textbox', { name: 'Leírás' }).fill('Leiras');
  await page.locator('input[name="location"]').click();
  await page.locator('input[name="location"]').fill('Csoportszoba');
  await page.getByRole('button', { name: 'Post' }).click();
  await expect(page.getByRole('article')).toMatchAriaSnapshot(`
    - img
    - text: Csoportszoba
    `);

});