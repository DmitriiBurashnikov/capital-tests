import { test, expect, request } from '@playwright/test';

test('GET users list returns 200', async () => {
  const context = await request.newContext();
  const response = await context.get('https://jsonplaceholder.typicode.com/users');
  
  expect(response.status()).toBe(200);
});

test('GET single user returns correct data', async () => {
  const context = await request.newContext();
  const response = await context.get('https://jsonplaceholder.typicode.com/users/1');
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.name).toBeTruthy();
});